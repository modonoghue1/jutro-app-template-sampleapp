"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _constants = require("./constants");

var _Properties = require("./Properties");

_addons.default.register(_constants.ADDON_ID, () => {
  _addons.default.add(_constants.ADDON_ID, {
    title: _constants.ADDON_ID,
    type: _addons.types.TOOL,
    match: ({
      viewMode
    }) => viewMode === 'story' || viewMode === 'docs',
    render: () => _react.default.createElement(_Properties.Properties, null)
  });
});
//# sourceMappingURL=register.js.map