"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeTool = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _useQueryParam3 = require("../../utils/useQueryParam");

var _constants = require("../constants");

var _defaults = require("../defaults");

const toLinks = (list, clickCallback, closeCallback) => list.map(name => ({
  id: name,
  title: name,
  onClick: () => {
    clickCallback(name);
    closeCallback();
  }
}));

const IconButtonWithLabel = (0, _theming.styled)(_components.IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center'
}));

const IconButtonLabel = _theming.styled.div(({
  theme: storybookTheme
}) => ({
  fontSize: storybookTheme.typography.size.s1,
  marginLeft: 10
}));

const ThemeTool = (0, _react.memo)((0, _theming.withTheme)(() => {
  const _useGlobals = (0, _api.useGlobals)(),
        _useGlobals2 = (0, _slicedToArray2.default)(_useGlobals, 2),
        globals = _useGlobals2[0],
        updateGlobals = _useGlobals2[1];

  const _useParameter = (0, _api.useParameter)(_constants.PARAM_KEY, _defaults.defaultThemes),
        themes = _useParameter.themes,
        defaultTheme = _useParameter.defaultTheme,
        disable = _useParameter.disable;

  if (disable) {
    return null;
  }

  const _useQueryParam = (0, _useQueryParam3.useQueryParam)(_constants.GLOBAL_PARAM_KEY),
        _useQueryParam2 = (0, _slicedToArray2.default)(_useQueryParam, 2),
        queryParam = _useQueryParam2[0],
        setQueryParam = _useQueryParam2[1];

  if (queryParam) {
    updateGlobals({
      [_constants.GLOBAL_PARAM_KEY]: queryParam
    });
  }

  if (!globals[_constants.GLOBAL_PARAM_KEY]) {
    updateGlobals({
      [_constants.GLOBAL_PARAM_KEY]: defaultTheme
    });
  }

  const onAdd = name => {
    updateGlobals({
      [_constants.GLOBAL_PARAM_KEY]: name
    });
    setQueryParam(name);
  };

  const tooltipList = ({
    onHide
  }) => _react.default.createElement(_components.TooltipLinkList, {
    links: toLinks(themes, onAdd, onHide)
  });

  const selectedThemeLabel = globals[_constants.GLOBAL_PARAM_KEY] || '';
  return _react.default.createElement(_react.default.Fragment, {
    key: "theming"
  }, _react.default.createElement(_components.WithTooltip, {
    tooltip: tooltipList,
    placement: "top",
    trigger: "click",
    closeOnClick: true
  }, _react.default.createElement(IconButtonWithLabel, {
    title: "Change the current theme"
  }, _react.default.createElement(_components.Icons, {
    icon: "photo"
  }), _react.default.createElement(IconButtonLabel, null, selectedThemeLabel))), _react.default.createElement(_components.Separator, null));
}));
exports.ThemeTool = ThemeTool;
//# sourceMappingURL=ThemeTool.js.map