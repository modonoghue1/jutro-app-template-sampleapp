"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

var _default = [{
  filter: (0, _cliSnapshotTools.createElementFilter)('DateTimeField'),
  actions: [{
    type: _actions.DATE_TIME_RENAME_PROPS
  }]
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map