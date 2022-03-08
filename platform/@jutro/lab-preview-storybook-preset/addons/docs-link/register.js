"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _DocsLink = require("./DocsLink");

var _constants = require("./constants");

_addons.default.register(_constants.ADDON_ID, () => {
  _addons.default.add(_constants.ADDON_ID, {
    title: _constants.ADDON_TITLE,
    type: _addons.types.TOOL,
    render: () => _react.default.createElement(_DocsLink.DocsLink, null)
  });
});
//# sourceMappingURL=register.js.map