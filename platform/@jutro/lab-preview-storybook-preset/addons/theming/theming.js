"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTheme = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _theme = require("@jutro/theme");

var _Story = require("../utils/Story");

var _constants = require("./constants");

var _useQueryParam3 = require("../utils/useQueryParam");

const withTheme = (0, _addons.makeDecorator)({
  name: _constants.DECORATOR_NAME,
  parameterName: _constants.PARAM_KEY,
  wrapper: (storyFn, context) => {
    const globals = context.globals,
          viewMode = context.viewMode;

    const _useQueryParam = (0, _useQueryParam3.useQueryParam)(_constants.GLOBAL_PARAM_KEY),
          _useQueryParam2 = (0, _slicedToArray2.default)(_useQueryParam, 1),
          queryParam = _useQueryParam2[0];

    const name = globals[_constants.GLOBAL_PARAM_KEY] || queryParam;
    return _react.default.createElement(_theme.ThemeProvider, {
      initialConfig: name ? {
        name,
        baseTheme: name
      } : undefined,
      applyLocally: viewMode === 'docs'
    }, _react.default.createElement(_Story.Story, {
      storyFn: storyFn,
      context: context
    }));
  }
});
exports.withTheme = withTheme;
//# sourceMappingURL=theming.js.map