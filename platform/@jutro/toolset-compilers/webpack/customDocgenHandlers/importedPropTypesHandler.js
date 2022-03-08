const {
    getAST,
    getGlobalScope,
    getIdentifiers,
    getImports,
    getPropType,
} = require('./helpers/astHelper');

const { getSrc, resolveRelativePath } = require('./helpers/fileHelper');

function amendRequired(type) {
    if (type.raw && type.raw.endsWith('.isRequired')) {
        // eslint-disable-next-line no-param-reassign
        type.raw = type.raw.replace('.isRequired', '');
    }
}

const isImported = type =>
    (type.name && type.name === 'custom' && type.raw) ||
    (type.value && type.computed === true);

function findImportedTypes(propType) {
    const importedTypes = [];

    function findImportedType(type) {
        if (!type) {
            return null;
        }

        if (isImported(type)) {
            amendRequired(type);
            importedTypes.push(type);
        } else if (type.name && type.value) {
            if (Array.isArray(type.value)) {
                type.value.forEach(findImportedType);
            } else {
                findImportedType(type.value);
            }
        } else if (typeof type === 'object') {
            Object.values(type).forEach(findImportedType);
        }
        return undefined;
    }

    findImportedType(propType);
    return importedTypes;
}

function amendRequiredPropTypes(propTypes) {
    Object.keys(propTypes).forEach(name => {
        if (
            propTypes[name].type &&
            propTypes[name].type.raw &&
            propTypes[name].type.raw.endsWith('.isRequired')
        ) {
            // eslint-disable-next-line no-param-reassign
            propTypes[name].required = true;
        }
    });
}

function getAllImportedTypes(documentation) {
    const propTypes = documentation.toObject().props;

    if (!propTypes || !Object.keys(propTypes).length) {
        return null;
    }

    amendRequiredPropTypes(propTypes);

    const getPropDescriptor = documentation.getPropDescriptor.bind(
        documentation
    );

    return Object.keys(propTypes).reduce((importedTypes, propTypeKey) => {
        const propDescriptor = getPropDescriptor(propTypeKey);
        if (propDescriptor.type) {
            importedTypes.push(
                ...findImportedTypes(propDescriptor.type),
                ...findImportedTypes(propDescriptor.defaultValue)
            );
        }
        return importedTypes;
    }, []);
}

function getImportsToResolve(importedTypes) {
    return importedTypes.reduce((obj, type) => {
        if (type.raw) {
            // eslint-disable-next-line no-param-reassign
            obj[type.raw] = {};
        } else if (type.computed === true) {
            // eslint-disable-next-line no-param-reassign
            obj[type.value] = {};
        }
        return obj;
    }, {});
}

function getImportRelativePath(importedValueName, imports) {
    const filteredImports = Object.keys(imports).filter(key =>
        imports[key].some(value => value === importedValueName)
    );

    if (filteredImports.length === 1) {
        return filteredImports[0];
    }
    return undefined;
}

function mapImportsToFilePaths(importsToMap, importsFromAst, filepath) {
    return Object.keys(importsToMap).reduce((importsWithPaths, imp) => {
        const relativePath = getImportRelativePath(imp, importsFromAst);
        const absolutePath = resolveRelativePath(filepath, relativePath);
        // eslint-disable-next-line no-param-reassign
        importsWithPaths[imp] = {
            path: relativePath,
            absolutePath,
        };
        return importsWithPaths;
    }, {});
}

function getAstFromFilepath(filePath) {
    const src = getSrc(filePath);
    if (src) {
        const ast = getAST(src);
        return ast;
    }
    return undefined;
}

function getExport(name, exports) {
    const regEx = `./${name}($|(.(js|ts)x?))`;

    return Object.keys(exports).find(source => {
        if (!exports[source]) {
            return source.match(regEx);
        }
        return exports[source].some(specifier => specifier === name);
    });
}

function getValue(absolutePath, name) {
    const ast = getAstFromFilepath(absolutePath);

    if (!ast) {
        return null;
    }

    const identifiers = getIdentifiers(ast);

    if (identifiers.variables[name]) {
        return getPropType(identifiers.variables[name]);
    }
    const exp = getExport(name, identifiers.exports);
    return getValue(resolveRelativePath(absolutePath, exp), name);
}

function mapImportsToValues(imports) {
    return Object.keys(imports).reduce((importsWithValues, key) => {
        // eslint-disable-next-line no-param-reassign
        importsWithValues[key] = {
            ...imports[key],
            value: getValue(imports[key].absolutePath, key),
        };
        return importsWithValues;
    }, {});
}

function amendComputedType(type, value) {
    if (!value) {
        return null;
    }
    // eslint-disable-next-line no-param-reassign
    type.value = value;
    // eslint-disable-next-line no-param-reassign
    type.computed = false;
    return undefined;
}

function amendCustomType(type, value) {
    if (!value) {
        return null;
    }
    // eslint-disable-next-line no-param-reassign
    delete type.raw;
    Object.entries(value).forEach(([key, val]) => {
        // eslint-disable-next-line no-param-reassign
        type[key] = val;
    });
    return undefined;
}

function amendTypes(importedTypes, resolvedImports) {
    importedTypes.forEach(type => {
        if (type.raw) {
            amendCustomType(type, resolvedImports[type.raw].value);
        } else if (type.computed === true) {
            amendComputedType(type, resolvedImports[type.value].value);
        }
    });
}

/**
 * @typedef {object} NodePath
 * @prop {any} key property of node
 */

/**
 * react-docgen Documentation stub
 *
 * @typedef {object} Documentation
 * @prop {any} key property of documentation
 */

/**
 * creates closure for imported PropTypes handler to be able to use component file path
 *
 * @param {string} filepath file path to component
 * @returns {(documentation:Documentation, propTypesPath:NodePath) => void} function that amends imported prop types
 */
function importedPropTypesHandler(filepath) {
    return (documentation, propTypesPath) => {
        const importedTypes = getAllImportedTypes(documentation);

        if (!importedTypes || !importedTypes.length) {
            return false;
        }

        let importsToResolve = getImportsToResolve(importedTypes);
        const importsFromAst = getImports(getGlobalScope(propTypesPath));

        if (
            !Object.keys(importsToResolve).length ||
            !Object.keys(importsFromAst).length
        ) {
            return false;
        }

        importsToResolve = mapImportsToFilePaths(
            importsToResolve,
            importsFromAst,
            filepath
        );

        const resolvedImportes = mapImportsToValues(importsToResolve);
        amendTypes(importedTypes, resolvedImportes);
        return undefined;
    };
}

module.exports = {
    importedPropTypesHandler,
};
