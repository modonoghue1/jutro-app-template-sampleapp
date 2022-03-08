const ReactDocgen = require('react-docgen');
const { join, basename } = require('path');
const fs = require('fs');
const ts = require('typescript');
const { get, flowRight } = require('lodash/fp');

const {
    getNameOrValue,
    getMemberValuePath,
    resolveToValue,
} = ReactDocgen.utils;
const { namedTypes: types } = require('ast-types');

const {
    deprecatedPropsHandler,
} = require('./customDocgenHandlers/deprecatedPropsHandler');
const {
    importedPropTypesHandler,
} = require('./customDocgenHandlers/importedPropTypesHandler');
const {
    descriptionFilterHandler,
} = require('./customDocgenHandlers/descriptionFilterHandler');
const {
    metadataTypePropsHandler,
} = require('./customDocgenHandlers/metadataTypePropsHandler');

const { defaultHandlers, resolver } = ReactDocgen;
const { findAllComponentDefinitions } = resolver;
const paramName = '__docgenInfo';
const packagesBaseDir = 'packages/';
const packagesBaseDirRegex = /packages(\\|\/)/;

const handlers = filePath => [
    ...defaultHandlers,
    actualNameHandler,
    deprecatedPropsHandler,
    metadataTypePropsHandler,
    descriptionFilterHandler,
    importedPropTypesHandler(filePath),
];

const tsCompilerOptions = {
    jsx: 'react',
    target: ts.ScriptTarget.Latest,
    module: ts.ModuleKind.ESNext,
};

const packageDirsCache = {};
/**
 * get package name by providing path to package directory
 * @param {string} packageDir
 */
function getPackageName(packageDir) {
    if (packageDirsCache[packageDir]) {
        return packageDirsCache[packageDir];
    }
    const packageConfig = join(packageDir, 'package.json');
    if (!fs.existsSync(packageConfig)) return basename(packageDir);
    const packageName = JSON.parse(fs.readFileSync(packageConfig, 'utf8')).name;
    packageDirsCache[packageDir] = packageName;
    return packageName;
}

/**
 * returns object with docgen info
 * @param {object} param0
 */
function generateDocgenInfo({ types: importTypes }) {
    return {
        visitor: {
            Program: {
                exit(path, state) {
                    injectReactDocgenInfo(
                        path,
                        state,
                        this.file,
                        this.file.code,
                        importTypes
                    );
                },
            },
        },
    };
}

function injectReactDocgenInfo(path, state, file, code, importTypes) {
    const { filename } = state.file.opts;
    if (
        (state.filename && state.filename.includes('node_modules')) ||
        !filename.match(packagesBaseDirRegex)
    ) {
        return;
    }

    const program = path.scope.getProgramParent().path;
    let docgenResults = [];
    try {
        const data = filename.includes('.ts')
            ? flowRight([
                  get('outputText'),
                  () =>
                      ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
                          compilerOptions: tsCompilerOptions,
                      }),
              ])()
            : fs.readFileSync(filename, 'utf8');
        docgenResults = ReactDocgen.parse(
            data,
            findAllComponentDefinitions,
            handlers(filename),
            { filename: 'example.js' }
        );
    } catch (e) {
        // this is for debugging the error only, do not ship this console log or else it pollutes the webpack output
        // if (e.message !== 'No suitable component definition found.') {
        //     console.log(`Error processing ${filename}: ${e}`);
        // }
        return;
    }

    docgenResults
        .filter(result => result.actualName)
        .forEach(docgenResult => {
            const exportName = docgenResult.actualName;
            const componentName =
                docgenResult.displayName || docgenResult.actualName;

            const packageDir = getPackageDir(filename);
            const packageName = getPackageName(packageDir);

            const docNode = importTypes.valueToNode({
                componentName,
                packageName,
                ...docgenResult,
            });
            const docgenInfo = importTypes.expressionStatement(
                importTypes.assignmentExpression(
                    '=',
                    importTypes.memberExpression(
                        importTypes.identifier(exportName),
                        importTypes.identifier(paramName)
                    ),
                    docNode
                )
            );
            program.pushContainer('body', docgenInfo);
        });
}

/**
 * Returns package directory
 * @param {string} fileName
 */
function getPackageDir(fileName) {
    const packageDirIndex =
        fileName.search(packagesBaseDirRegex) + packagesBaseDir.length;
    return fileName.substring(
        0,
        packageDirIndex + fileName.slice(packageDirIndex).search(/(\\|\/)/) + 1
    );
}

// copy non exported function from https://github.com/storybooks/babel-plugin-react-docgen
function actualNameHandler(documentation, path) {
    // Function and class declarations need special treatment. The name of the
    // function / class is the displayName
    let actualName = '';
    if (
        types.ClassDeclaration.check(path.node) ||
        types.FunctionDeclaration.check(path.node)
    ) {
        actualName = getNameOrValue(path.get('id'));
    } else if (
        types.ArrowFunctionExpression.check(path.node) ||
        types.FunctionExpression.check(path.node)
    ) {
        if (types.VariableDeclarator.check(path.parentPath.node)) {
            actualName = getNameOrValue(path.parentPath.get('id'));
        } else if (types.AssignmentExpression.check(path.parentPath.node)) {
            try {
                actualName = getNameOrValue(path.parentPath.get('left'));
            } catch {
                // Ignore unresolved name
            }
        }
    } else if (
        // React.createClass() or createReactClass()
        types.CallExpression.check(path.parentPath.node) &&
        types.VariableDeclarator.check(
            path.parentPath.parentPath.parentPath.node
        )
    ) {
        actualName = getNameOrValue(
            path.parentPath.parentPath.parentPath.get('id')
        );
    }

    if (!actualName) {
        // in case when we can only derive name from displayName (needed for forwardRef)
        let displayNamePath = getMemberValuePath(path, 'displayName');
        if (displayNamePath) {
            displayNamePath = resolveToValue(displayNamePath);
            actualName = displayNamePath.node.value;
        }
    }

    documentation.set('actualName', actualName);
}

module.exports = {
    generateDocgenInfo,
    getPackageDir,
    getPackageName,
    tsCompilerOptions,
};
