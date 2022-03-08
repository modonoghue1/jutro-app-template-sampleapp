"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

var _default = [{
  filter: (0, _cliSnapshotTools.createActionFilter)('DropdownMenuAvatar'),
  actions: [(0, _actions.changeMetadataTypeToContainerInDropdownMenuAvatar)()]
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map