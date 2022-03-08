"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _MetadataPanel = require("./components/MetadataPanel");

var _constants = require("./constants");

_addons.addons.register(_constants.ADDON_ID, () => {
  _addons.addons.addPanel(_constants.ADDON_PANEL, {
    title: 'Metadata',
    paramKey: 'metadata',
    render: ({
      active
    }) => _react.default.createElement(_MetadataPanel.MetadataPanel, {
      key: _constants.ADDON_PANEL,
      active: !!active
    })
  });
});
//# sourceMappingURL=register.js.map