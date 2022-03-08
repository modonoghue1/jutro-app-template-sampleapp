"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCodemodActions = void 0;

var _jscodeshift = _interopRequireDefault(require("jscodeshift"));

var _get = _interopRequireDefault(require("lodash/get"));

var _set = _interopRequireDefault(require("lodash/set"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

const statement = _jscodeshift.default.template.statement;

const lastPath = c => c.at(-1).paths()[0];

const registerCodemodActions = () => _jscodeshift.default.registerMethods({
  addComponentProp,
  copyCallExpressionArguments,
  insertArrowFunctionDeclaration,
  insertCallExpression,
  insertDefaultImportSpecifier,
  insertFunctionDeclaration,
  insertImportDeclaration,
  insertImportSpecifier,
  insertVariableDeclaration,
  migrateImportSpecifier,
  removeCallExpression,
  replaceCallExpression,
  replaceCallExpressionWithJSX,
  removeComponentProp,
  removeComponentUsage,
  removeIdentifier,
  removeImportDeclaration,
  renameImportDeclaration,
  removeImportSpecifier,
  renameLocalSpecifier,
  removeVariableDeclaration,
  renameCallExpression,
  renameComponent,
  renameComponentProp,
  renameIdentifier,
  replaceImportSpecifier,
  replaceImportSpecifierAndUsages
});

exports.registerCodemodActions = registerCodemodActions;

function insertFunctionDeclaration(functionToInsert, functionParams) {
  const functionString = functionToInsert.toString();
  const functionBody = functionString.slice(functionString.indexOf('{'), functionString.lastIndexOf('}') + 1);
  const allFunctionDeclarations = this.find(_jscodeshift.default.FunctionDeclaration);
  const newFunctionDeclaration = `function ${functionToInsert.name}(${functionParams.join(', ')}) ${functionBody}`;

  if (allFunctionDeclarations.size()) {
    lastPath(allFunctionDeclarations).insertAfter(newFunctionDeclaration);
  } else {
    insertAfterImports(this, newFunctionDeclaration);
  }

  return this;
}

function insertArrowFunctionDeclaration(functionToInsert, functionParams) {
  const functionString = functionToInsert.toString();
  const functionBody = functionString.slice(functionString.indexOf('{'), functionString.lastIndexOf('}') + 1);
  const functionParamsString = functionParams.length === 1 ? `${functionParams.toString()}` : `(${functionParams.join(', ')})`;
  const allFunctionDeclarations = this.find(_jscodeshift.default.FunctionDeclaration);
  const newFunctionDeclaration = `const ${functionToInsert.name} = ${functionParamsString} => ${functionBody};`;

  if (allFunctionDeclarations.size()) {
    lastPath(allFunctionDeclarations).insertAfter(newFunctionDeclaration);
  } else {
    insertAfterImports(this, newFunctionDeclaration);
  }

  return this;
}

function insertImportDeclaration(importSpecifiers, source, defaultSpecifier, importKind = 'value') {
  const specifierArray = importSpecifiers.map(specifier => _jscodeshift.default.importSpecifier(_jscodeshift.default.identifier(specifier)));

  if (defaultSpecifier) {
    specifierArray.unshift(_jscodeshift.default.importDefaultSpecifier(_jscodeshift.default.identifier(defaultSpecifier)));
  }

  const newImport = _jscodeshift.default.importDeclaration(specifierArray, _jscodeshift.default.literal(source), importKind);

  insertAfterImports(this, newImport);
  return this;
}

function insertImportSpecifier(newImportSpecifier, source, importKind = 'value', localSpecifier) {
  const importDeclaration = this.find(_jscodeshift.default.ImportDeclaration, n => n.source.value === source);
  const specifierArgs = localSpecifier ? [_jscodeshift.default.identifier(newImportSpecifier), _jscodeshift.default.identifier(localSpecifier)] : [_jscodeshift.default.identifier(newImportSpecifier)];

  const specifier = _jscodeshift.default.importSpecifier(...specifierArgs);

  if (importDeclaration.size()) {
    if (this.find(_jscodeshift.default.ImportSpecifier, n => n.imported.name === newImportSpecifier).size()) {
      return this;
    }

    const ImportSpecifiers = importDeclaration.find(_jscodeshift.default.ImportSpecifier);

    if (lastPath(ImportSpecifiers)) {
      lastPath(ImportSpecifiers).insertAfter(specifier);
    } else {
      importDeclaration.get(0).node.specifiers.push(specifier);
    }
  } else {
    const newStatement = _jscodeshift.default.importDeclaration([specifier], _jscodeshift.default.literal(source), importKind);

    insertAfterImports(this, newStatement);
  }

  return this;
}

function renameLocalSpecifier(local, imported, source) {
  this.removeImportSpecifier(imported, source);
  const removedSpecifier = (0, _get.default)(this, `removedImportSpecifiers.${imported}`);
  const removedSource = (0, _get.default)(removedSpecifier, 'source');

  if (removedSource) {
    this.insertImportSpecifier(imported, removedSource, 'value', local);
  }

  return this;
}

function insertDefaultImportSpecifier(newImportSpecifier, source, importKind = 'value') {
  if (this.find(_jscodeshift.default.ImportDefaultSpecifier, n => n.local.name === newImportSpecifier).size()) {
    return this;
  }

  const importDeclaration = this.find(_jscodeshift.default.ImportDeclaration, n => n.source.value === source);

  if (importDeclaration.size()) {
    const ImportSpecifiers = importDeclaration.find(_jscodeshift.default.ImportDefaultSpecifier);

    const newDefaultSpecifier = _jscodeshift.default.importDefaultSpecifier(_jscodeshift.default.identifier(newImportSpecifier));

    if (ImportSpecifiers.size()) {
      lastPath(ImportSpecifiers).replace(newDefaultSpecifier);
    } else {
      lastPath(importDeclaration).value.specifiers.push(newDefaultSpecifier);
    }
  } else {
    const newStatement = _jscodeshift.default.importDeclaration([_jscodeshift.default.importDefaultSpecifier(_jscodeshift.default.identifier(newImportSpecifier))], _jscodeshift.default.literal(source), importKind);

    insertAfterImports(this, newStatement);
  }

  return this;
}

function insertVariableDeclaration(variableName, variableValue, declarationKind = 'const') {
  const variableDeclaration = `${declarationKind} ${variableName} = ${variableValue};`;
  insertAfterImports(this, variableDeclaration);
  return this;
}

function addComponentProp(componentName, propName, propValue) {
  const newProp = `${propName}={${propValue}}`;
  this.find(_jscodeshift.default.JSXOpeningElement, n => n.name.name === componentName).forEach(n => {
    n.node.attributes.push(newProp);
  });
  return this;
}

function renameComponentProp(componentName, oldProp, newProp, componentNameRegex) {
  this.find(_jscodeshift.default.JSXOpeningElement, n => n.name.name === componentName || (componentNameRegex === null || componentNameRegex === void 0 ? void 0 : componentNameRegex.test(n.name.name))).find(_jscodeshift.default.JSXAttribute, n => n.name.name === oldProp).forEach(nodePath => {
    nodePath.node.name = newProp;
  });
  return this;
}

function removeComponentProp(componentName, propName, matchComponent) {
  this.find(_jscodeshift.default.JSXOpeningElement, n => n.name.name === componentName || (matchComponent === null || matchComponent === void 0 ? void 0 : matchComponent(n))).find(_jscodeshift.default.JSXAttribute, n => n.name.name === propName).remove();
  return this;
}

function removeComponentUsage(componentName) {
  this.find(_jscodeshift.default.JSXElement, n => n.openingElement.name.name === componentName).remove();
  this.removeImportSpecifier(componentName);
  return this;
}

function renameComponent(componentName, newComponentName) {
  this.find(_jscodeshift.default.JSXElement, n => n.openingElement.name.name === componentName).forEach(({
    value: element
  }) => {
    element.openingElement.name.name = newComponentName;

    if (element.closingElement) {
      element.closingElement.name.name = newComponentName;
    }
  });
  this.find(_jscodeshift.default.ImportSpecifier, n => n.imported.name === componentName).forEach(({
    value: i
  }) => {
    i.imported.name = newComponentName;
  });
  return this;
}

function removeImportDeclaration(fromModuleName, fromModuleRegex) {
  this.find(_jscodeshift.default.ImportDeclaration, n => n.source.value === fromModuleName || (fromModuleRegex === null || fromModuleRegex === void 0 ? void 0 : fromModuleRegex.test(n.source.value))).remove();
  return this;
}

function renameImportDeclaration(fromModuleName, toModuleName) {
  this.find(_jscodeshift.default.ImportDeclaration, n => n.source.value === fromModuleName).forEach(({
    value: i
  }) => {
    i.source.value = toModuleName;
  });
  return this;
}

function removeImportSpecifier(specifierName, source) {
  const specifiers = this.find(_jscodeshift.default.ImportSpecifier, n => n.imported.name === specifierName);

  if (specifiers.size()) {
    specifiers.forEach(specifier => {
      const declaration = specifier.parent;
      const declarationSource = declaration.node.source.value;
      const localName = (0, _get.default)(specifier, 'node.local.name');

      if (!source || source === declarationSource) {
        this.find(_jscodeshift.default.ImportSpecifier, n => n.start === specifier.node.start).remove();
        (0, _set.default)(this, `removedImportSpecifiers.${specifierName}`, {
          source: declarationSource,
          localName
        });

        if (!declaration.node.specifiers.length) {
          declaration.prune();
        }
      }
    });
  }

  return this;
}

function migrateImportSpecifier(specifierName, toSource, fromSource, importKind = 'value') {
  this.removeImportSpecifier(specifierName, fromSource);

  if ((0, _get.default)(this, `removedImportSpecifiers.${specifierName}`)) {
    this.insertImportSpecifier(specifierName, toSource, importKind);
  }

  return this;
}

function removeIdentifier(identifierName) {
  this.find(_jscodeshift.default.Identifier, i => i.name === identifierName).remove();
  return this;
}

function renameIdentifier(identifierName, newIdentifierName, shouldRename) {
  this.find(_jscodeshift.default.Identifier, i => i.name === identifierName).forEach(n => {
    if (shouldRename) {
      if (shouldRename(n)) {
        n.value.name = newIdentifierName;
      }
    } else {
      n.value.name = newIdentifierName;
    }
  });
  return this;
}

function removeVariableDeclaration(variableName) {
  const declarators = this.find(_jscodeshift.default.VariableDeclarator, n => n.id.name === variableName);
  const declarations = [];
  declarators.forEach(n => {
    declarations.push(n.parentPath.parentPath.value);
  });
  declarators.remove();
  declarations.forEach(n => {
    if (!n.declarations.length) {
      n = {};
    }
  });
  return this;
}

function removeCallExpression(CallExpressionName, match) {
  const getCallExpressions = () => this.find(_jscodeshift.default.CallExpression, call => match ? match(call) : call.callee.name === CallExpressionName);

  const expressions = getCallExpressions();
  const size = expressions.size();
  expressions.remove();

  if (size && getCallExpressions().size() === 0) {
    (0, _set.default)(this, `removedCallExpressions.${CallExpressionName}`, true);
  }

  return this;
}

function renameCallExpression(CallExpressionName, newCallExpressionName, match) {
  this.find(_jscodeshift.default.CallExpression, call => match ? match(call, CallExpressionName) : call.callee.name === CallExpressionName).forEach(n => {
    if (n.value.callee.property) {
      n.value.callee.property.name = newCallExpressionName;
    } else {
      n.value.callee.name = newCallExpressionName;
    }
  });
  return this;
}

function appendToBody(root, newStatement) {
  const program = root.find(_jscodeshift.default.Program).at(0).nodes()[0];
  program.body.push(newStatement);
}

function createCallExpression({
  CallExpressionName,
  rawArguments,
  copiedArguments,
  transformArgs = args => (0, _flatten.default)(Object.entries(args).map(([, val]) => val))
}) {
  const astArguments = rawArguments || transformArgs(copiedArguments || {});

  const call = _jscodeshift.default.callExpression(_jscodeshift.default.identifier(CallExpressionName), []);

  call.arguments = astArguments;
  return _jscodeshift.default.expressionStatement(call);
}

function insertCallExpression(CallExpressionName, rawArguments, transformArgs, shouldInsert = () => true) {
  if (shouldInsert(this)) {
    const call = createCallExpression({
      CallExpressionName,
      rawArguments,
      copiedArguments: this.arguments,
      transformArgs
    });
    appendToBody(this, call);
  }

  return this;
}

function replaceCallExpression({
  replaceMatch,
  rawArguments,
  transformArgs,
  newCallExpressionName
}) {
  const expressionToReplace = this.find(_jscodeshift.default.CallExpression, n => replaceMatch(n));

  if (expressionToReplace.size()) {
    const newStatement = createCallExpression({
      CallExpressionName: newCallExpressionName,
      rawArguments,
      copiedArguments: this.arguments,
      transformArgs
    });
    expressionToReplace.get(0).parent.replace(newStatement);
  }

  return this;
}

function replaceCallExpressionWithJSX({
  replaceMatch,
  rawAttributes,
  transformArgsToJSXAttributes,
  elementName
}) {
  const expressionToReplace = this.find(_jscodeshift.default.CallExpression, n => replaceMatch(n));
  expressionToReplace.forEach((expression, index) => {
    const attributes = rawAttributes || transformArgsToJSXAttributes(this.arguments, index, expressionToReplace);

    const newStatement = _jscodeshift.default.jsxElement(_jscodeshift.default.jsxOpeningElement(_jscodeshift.default.jsxIdentifier(elementName), attributes, true));

    if (expression.parent.value.type === 'JSXExpressionContainer') {
      expression.parent.replace(newStatement);
    } else {
      expression.replace(newStatement);
    }
  });
  return this;
}

function copyCallExpressionArguments(match, key) {
  const callExpressions = this.find(_jscodeshift.default.CallExpression, match);

  if (callExpressions.length > 1) {
    callExpressions.forEach((expression, index) => {
      (0, _set.default)(this, `arguments.${key}.${index}`, expression.value.arguments);
    });
  } else {
    const callExpression = callExpressions.at(0).nodes()[0];

    if (callExpression) {
      (0, _set.default)(this, `arguments.${key}`, callExpression.arguments);
    }
  }

  return this;
}

function replaceImportSpecifier(specifierName, newSpecifierName, source) {
  this.find(_jscodeshift.default.ImportSpecifier, n => n.imported.name === specifierName).filter(n => n.parent.node.source.value === source).forEach(n => {
    n.value.imported.name = newSpecifierName;
  });
  return this;
}

function replaceImportSpecifierAndUsages(specifierName, newSpecifierName, source) {
  const specifiers = this.find(_jscodeshift.default.ImportSpecifier, n => n.imported.name === specifierName).filter(n => n.parent.node.source.value === source);

  if (specifiers.size()) {
    this.find(_jscodeshift.default.Identifier, i => i.name === specifierName).forEach(n => {
      n.value.name = newSpecifierName;
    });
    specifiers.forEach(n => {
      n.value.imported.name = newSpecifierName;
    });
  }

  return this;
}

function insertProgramStatement(root, ...statements) {
  const program = root.find(_jscodeshift.default.Program).at(0).nodes()[0];
  const firstProgramStatement = program.body[0];

  if (firstProgramStatement) {
    for (const field of ['comments', 'leadingComments']) {
      const comments = firstProgramStatement[field];

      if (comments) {
        comments.forEach(c => {
          delete c.loc;
          delete c.start;
          delete c.end;
          delete c.extra;
        });
        statements[0] = { ...statements[0],
          [field]: comments
        };
        delete firstProgramStatement[field];
        delete program[field];
      }
    }
  }

  program.body.unshift(...statements);
}

function insertAfterImports(root, newStatement) {
  const allImports = root.find(_jscodeshift.default.ImportDeclaration);

  if (allImports.size()) {
    lastPath(allImports).insertAfter(newStatement);
  } else {
    insertProgramStatement(root, newStatement);
  }
}
//# sourceMappingURL=actions.js.map