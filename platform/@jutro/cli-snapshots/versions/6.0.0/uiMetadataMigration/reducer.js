"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

const changeMetadataTypeToContainerInDropdownMenuAvatar = metadata => ({ ...metadata,
  type: 'container'
});

const handlers = {
  [_actions.actionTypes.changeMetadataTypeToContainerInDropdownMenuAvatar]: changeMetadataTypeToContainerInDropdownMenuAvatar
};
const reducer = (0, _cliSnapshotTools.createReducer)(handlers);
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map