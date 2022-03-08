"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

var _default = [{
  filter: (0, _cliSnapshotTools.createElementFilter)('Chevron'),
  actions: [{
    type: _actions.CHEVRON_REMOVE_ALIGN_PROP
  }]
}, {
  filter: (0, _cliSnapshotTools.createElementFilter)('DateTimeZoneField'),
  actions: [{
    type: _actions.DATE_TIME_ZONE_RENAME_PROPS
  }]
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map