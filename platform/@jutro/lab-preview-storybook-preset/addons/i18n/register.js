"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _constants = require("./constants");

var _I18nTool = require("./components/I18nTool");

_addons.default.register(_constants.ADDON_ID, () => {
  _addons.default.add(_constants.PANEL_ID, {
    type: _addons.types.TOOL,
    title: '',
    render: () => _react.default.createElement(_I18nTool.I18nTool, null)
  });
});
//# sourceMappingURL=register.js.map