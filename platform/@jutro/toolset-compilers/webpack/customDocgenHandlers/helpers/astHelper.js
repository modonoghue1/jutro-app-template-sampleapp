const {
    parse,
    types: { visit, namedTypes: types },
} = require('recast');
const {
    getPropType: getPropTypeUtil,
    resolveToValue,
} = require('react-docgen').utils;

/**
 * @typedef {object} NodePath
 * @prop {any} key property of node
 */

/**
 * parses file source and creates Abstract Syntax Tree of the file
 *
 * @param {string} src file source
 * @returns {NodePath} Abstract Syntax Tree from file
 */
function getAST(src) {
    try {
        const ast = parse(src, {
            parser: require('recast/parsers/babel'),
        });
        // eslint-disable-next-line no-underscore-dangle
        ast.__src = src;
        return ast;
    } catch {
        return null;
    }
}

/**
 * finds global scope node of Abstract Syntax Tree
 *
 * @param {NodePath} ast Abstract Syntax Tree
 * @returns {NodePath} global scope's node
 */
function getGlobalScope(ast) {
    return ast.scope.getGlobalScope().node;
}

const isPropType = object =>
    (types.Identifier.name === object.type && object.name === 'PropTypes') ||
    (types.CallExpression.name === object.type &&
        object.callee.object.name === 'PropTypes');

/**
 * resolves variable path to prop type value
 *
 * @param {NodePath} path variable path
 * @returns {object|string|undefined} resolved value of prop type or undefined
 */
function getPropType(path) {
    const { node } = path;
    const { type } = node;
    if (types.CallExpression.name === type) {
        if (node.callee.object.name === 'PropTypes') {
            return getPropTypeUtil(path);
        }
    } else if (types.ArrayExpression.name === type) {
        return node.elements.map(el => ({
            value: el.extra.raw,
            computed: false,
        }));
    } else if (types.MemberExpression.name === type) {
        const { object } = node;
        if (isPropType(object)) {
            return getPropTypeUtil(path);
        }
    } else if (type.match(/.+Literal/)) {
        return node.extra.raw;
    }
    return undefined;
}

function getSpecifiersOfNode(specifiers) {
    return specifiers.reduce((allSpecifiers, node) => {
        allSpecifiers.push(node.local.name);
        return allSpecifiers;
    }, []);
}

function getExportAllDeclarationVisitor(exports) {
    return function visitExportAllDeclaration(path) {
        const source = path.node.source.value;
        // eslint-disable-next-line no-param-reassign
        exports[source] = null;
        this.traverse(path);
    };
}

function getExportNamedDeclarationVisitor(exports) {
    return function visitExportNamedDeclaration(path) {
        if (path.node.source) {
            const source = path.node.source.value;
            const specifier = getSpecifiersOfNode(path.node.specifiers);
            if (!exports[source]) {
                // eslint-disable-next-line no-param-reassign
                exports[source] = specifier;
            } else {
                exports[source].push(...specifier);
            }
        }
        this.traverse(path);
    };
}

function getImportDeclarationVisitor(imports) {
    return function visitImportDeclaration(path) {
        const source = path.node.source.value;
        const specifier = getSpecifiersOfNode(path.node.specifiers);
        if (!imports[source]) {
            // eslint-disable-next-line no-param-reassign
            imports[source] = specifier;
        } else {
            imports[source].push(...specifier);
        }
        this.traverse(path);
    };
}

function getVariableDeclaratorVisitor(variables) {
    return function visitVariableDeclarator(path) {
        // eslint-disable-next-line no-param-reassign
        variables[path.value.id.name] = resolveToValue(path);
        this.traverse(path);
    };
}

/**
 * finds all imports in Abstract Syntax Tree
 *
 * @param {NodePath} ast Abstract Syntax Tree
 * @returns {{source: string[]}} object with sources as keys and specifiers array as values
 */
function getImports(ast) {
    const imports = {};

    const visitImportDeclaration = getImportDeclarationVisitor(imports);

    visit(ast, {
        visitImportDeclaration,
    });
    return imports;
}

/**
 * finds all variables' declarations and exports in Abstract Syntax Tree
 *
 * @param {NodePath} ast Abstract Syntax Tree
 * @returns {{variables: {name: NodePath}, exports: {source: string[]|null}}} object with all variables paths and exports sources
 */
function getIdentifiers(ast) {
    const identifiers = {
        variables: {},
        exports: {},
    };

    const visitors = {
        visitVariableDeclarator: getVariableDeclaratorVisitor(
            identifiers.variables
        ),
        visitExportAllDeclaration: getExportAllDeclarationVisitor(
            identifiers.exports
        ),
        visitExportNamedDeclaration: getExportNamedDeclarationVisitor(
            identifiers.exports
        ),
    };

    visit(ast, visitors);

    return identifiers;
}

module.exports = {
    getAST,
    getGlobalScope,
    getIdentifiers,
    getImports,
    getPropType,
};
