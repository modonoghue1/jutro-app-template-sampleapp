"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _get = _interopRequireDefault(require("lodash/get"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _jscodeshift = _interopRequireDefault(require("jscodeshift"));

const validationExports = ['useValidation', 'RuleCallbackType', 'RulesType', 'UseValidationInterface', 'RegisterValidationType', 'NotifyParentFormType', 'UseValidationReturnInterface', 'FormContextType', 'FormMessagesType'];
const validationMigrations = validationExports.map(exportName => ({
  description: `update import for ${exportName} to be from @jutro/validation rather than @jutro/lab-preview-validation`,
  execute: source => source.migrateImportSpecifier(exportName, '@jutro/validation', '@jutro/lab-preview-validation')
}));
var _default = [{
  description: 'replace usages of renderContentFromMetadata with MetadataContent component',
  execute: source => source.replaceImportSpecifier('renderContentFromMetadata', 'MetadataContent', '@jutro/uiconfig').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.name') === 'renderContentFromMetadata', 'renderContent').replaceCallExpressionWithJSX({
    replaceMatch: call => (0, _get.default)(call, 'callee.name') === 'renderContentFromMetadata',
    elementName: 'MetadataContent',
    transformArgsToJSXAttributes: (args, index, callExpressions) => {
      const path = callExpressions.length > 1 ? `renderContent.${index}` : 'renderContent';
      const currentArgs = (0, _get.default)(args, path, {});
      const jsxAttributes = [];

      if (!(0, _isEmpty.default)(currentArgs)) {
        const _currentArgs = (0, _slicedToArray2.default)(currentArgs, 4),
              uiProps = _currentArgs[0],
              overrideProps = _currentArgs[1],
              resolvers = _currentArgs[2],
              showHidden = _currentArgs[3];

        [['uiProps', uiProps], ['overrideProps', overrideProps], ['showHidden', showHidden]].filter(([, arg]) => !(0, _isUndefined.default)(arg)).forEach(([prop, node]) => {
          jsxAttributes.push(_jscodeshift.default.jsxAttribute(_jscodeshift.default.jsxIdentifier(prop), _jscodeshift.default.jsxExpressionContainer(node)));
        });

        if ((resolvers === null || resolvers === void 0 ? void 0 : resolvers.type) === 'Identifier') {
          jsxAttributes.push(_jscodeshift.default.jsxSpreadAttribute(_jscodeshift.default.identifier(resolvers.name)));
        } else if ((resolvers === null || resolvers === void 0 ? void 0 : resolvers.type) === 'ObjectExpression') {
          resolvers.properties.forEach(property => {
            jsxAttributes.push(_jscodeshift.default.jsxAttribute(_jscodeshift.default.jsxIdentifier(property.key.name), _jscodeshift.default.jsxExpressionContainer(property.value)));
          });
        }
      }

      return jsxAttributes;
    }
  })
}, {
  description: 'Move namespaced micro-app props to the jutro prop',
  execute: source => {
    const MicroAppJSXTagNames = [];
    const lazyInstances = source.find(_jscodeshift.default.VariableDeclarator, ({
      init
    }) => {
      var _init$callee, _init$arguments;

      return ((_init$callee = init.callee) === null || _init$callee === void 0 ? void 0 : _init$callee.name) === 'lazy' && ((_init$arguments = init.arguments) === null || _init$arguments === void 0 ? void 0 : _init$arguments.some(arg => arg.callee.name === 'importMicroApp'));
    });
    lazyInstances.forEach(instance => {
      const name = (0, _get.default)(instance, 'node.id.name');
      if (!MicroAppJSXTagNames.includes(name)) MicroAppJSXTagNames.push(name);
    });
    const instances = source.find(_jscodeshift.default.JSXOpeningElement, node => MicroAppJSXTagNames.includes((0, _get.default)(node, 'name.name')));
    instances.forEach(instance => {
      const jutro = instance.value.attributes.find(attribute => (0, _get.default)(attribute, 'name.name') === 'jutro');
      const launchPropOverrides = instance.value.attributes.find(attribute => (0, _get.default)(attribute, 'name.name') === 'launchPropOverrides');
      const configOverrides = instance.value.attributes.find(attribute => (0, _get.default)(attribute, 'name.name') === 'configOverrides');
      const componentMapExtensions = instance.value.attributes.find(attribute => (0, _get.default)(attribute, 'name.name') === 'componentMapExtensions');
      const definedProps = [launchPropOverrides, configOverrides, componentMapExtensions].filter(n => !(0, _isUndefined.default)(n));

      if ((0, _get.default)(jutro, 'value.expression.type') === 'ObjectExpression') {
        definedProps.forEach(prop => {
          jutro.value.expression.properties.push(_jscodeshift.default.objectProperty(_jscodeshift.default.identifier((0, _get.default)(prop, 'name.name')), (0, _get.default)(prop, 'value.expression')));
        });
      } else {
        instance.value.attributes.push(_jscodeshift.default.jsxAttribute(_jscodeshift.default.jsxIdentifier('jutro'), _jscodeshift.default.jsxExpressionContainer(_jscodeshift.default.objectExpression(definedProps.map(prop => _jscodeshift.default.objectProperty(_jscodeshift.default.identifier((0, _get.default)(prop, 'name.name')), (0, _get.default)(prop, 'value.expression')))))));
      }
    });
    return source.removeComponentProp(null, 'configOverrides', node => MicroAppJSXTagNames.includes((0, _get.default)(node, 'name.name'))).removeComponentProp(null, 'launchPropOverrides', node => MicroAppJSXTagNames.includes((0, _get.default)(node, 'name.name'))).removeComponentProp(null, 'componentMapExtensions', node => MicroAppJSXTagNames.includes((0, _get.default)(node, 'name.name')));
  }
}, ...validationMigrations, {
  description: 'Move date helpers from @jutro/components to @jutro/locale',
  execute: source => source.migrateImportSpecifier('formatDateToDataType', '@jutro/platform', '@jutro/components').migrateImportSpecifier('parseDateShapeToDate', '@jutro/platform', '@jutro/components').migrateImportSpecifier('isDateShapeInRange', '@jutro/platform', '@jutro/components')
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map