"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _jscodeshift = _interopRequireDefault(require("jscodeshift"));

var _get = _interopRequireDefault(require("lodash/get"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

const transformArgs = args => {
  if ((0, _isEmpty.default)(args)) return [];
  const launchArgs = args.launchArgs,
        _args$loading = args.loading,
        loading = _args$loading === void 0 ? [] : _args$loading,
        _args$theme = args.theme,
        theme = _args$theme === void 0 ? [] : _args$theme,
        propsArgs = (0, _objectWithoutProperties2.default)(args, ["launchArgs", "loading", "theme"]);

  const _launchArgs = (0, _slicedToArray2.default)(launchArgs, 2),
        App = _launchArgs[0],
        props = _launchArgs[1];

  const _theme = (0, _slicedToArray2.default)(theme, 1),
        themeProps = _theme[0];

  const themeProperties = [];

  if (themeProps) {
    const themeConfig = themeProps.properties.find(prop => prop.key.name === 'themeConfig');

    const themeValue = _jscodeshift.default.objectExpression([]);

    themeValue.properties = themeProps.properties.filter(prop => prop.key.name !== 'themeConfig');

    if (themeConfig) {
      if (themeConfig.value.type === 'ObjectExpression') {
        themeConfig.value.properties.forEach(property => themeValue.properties.push(property));
      } else {
        themeValue.properties.push(_jscodeshift.default.spreadElement(_jscodeshift.default.identifier(themeConfig.value.name || 'themeConfig')));
      }
    }

    const themeProperty = _jscodeshift.default.objectProperty(_jscodeshift.default.identifier('themeConfig'), themeValue);

    themeProperties.push(themeProperty);
  }

  const _loading = (0, _slicedToArray2.default)(loading, 2),
        LoadingComponent = _loading[0],
        ErrorLoadingComponent = _loading[1];

  const loadingProperties = [];

  if (LoadingComponent) {
    loadingProperties.push(_jscodeshift.default.objectProperty(_jscodeshift.default.identifier('LoadingComponent'), LoadingComponent));
  }

  if (ErrorLoadingComponent) {
    loadingProperties.push(_jscodeshift.default.objectProperty(_jscodeshift.default.identifier('ErrorLoadingComponent'), ErrorLoadingComponent));
  }

  const launchProperties = Object.entries(propsArgs).map(([key, val]) => {
    const astValue = val.length > 1 ? _jscodeshift.default.arrayExpression(val) : val[0];
    return _jscodeshift.default.objectProperty(_jscodeshift.default.identifier(key), astValue);
  });
  return [App, { ...props,
    properties: [...launchProperties, ...themeProperties, ...loadingProperties, ...props.properties]
  }];
};

var _default = [{
  description: 'Move defineMessages import from react-intl to @jutro/locale',
  execute: source => source.migrateImportSpecifier('defineMessages', '@jutro/locale', 'react-intl')
}, {
  description: 'Move Table and TableColumn imports to @jutro/datable',
  execute: source => source.migrateImportSpecifier('Table', '@jutro/datatable', '@jutro/layout').migrateImportSpecifier('TableColumn', '@jutro/datatable', '@jutro/layout')
}, {
  description: 'rename config to appConfig',
  include: 'src/index.js',
  execute: source => source.renameIdentifier('config', 'appConfig', n => (0, _get.default)(n, 'parent.parent.parent.node.callee.name') !== 'start' && (0, _get.default)(n, 'parent.node.type') !== 'ImportSpecifier').renameLocalSpecifier('appConfig', 'config')
}, {
  description: 'Move App Launcher chaining to launch properties',
  include: 'src/index.js',
  execute: source => source.removeImportSpecifier('Launcher').insertImportSpecifier('start', '@jutro/app').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.property.name') === 'launch', 'launchArgs').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.property.name') === 'withConfiguration', 'config').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.property.name') === 'withRootId', 'rootId').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.property.name') === 'withTheme', 'theme').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.property.name') === 'withInitialization', 'onInit').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.property.name') === 'withPostRender', 'onRender').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.property.name') === 'withDefaultAnalytics', 'trackingConfig').copyCallExpressionArguments(call => (0, _get.default)(call, 'callee.property.name') === 'withLoading', 'loading').replaceCallExpression({
    replaceMatch: call => (0, _get.default)(call, 'callee.property.name') === 'launch',
    transformArgs,
    newCallExpressionName: 'start'
  })
}, {
  description: 'Remove usages of validateRoutes and replace with validateMetadata',
  execute: source => source.renameIdentifier('validateRoutes', 'validateMetadata')
}, {
  description: 'Replace usages of jutro/visual-tests with jutro/e2e-tests',
  include: 'tests/**/*.js',
  execute: source => source.renameImportDeclaration('@jutro/visual-tests', '@jutro/e2e-tests')
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map