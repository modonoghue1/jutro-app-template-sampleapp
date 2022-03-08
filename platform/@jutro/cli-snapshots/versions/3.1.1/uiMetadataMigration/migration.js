"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _flatten = _interopRequireDefault(require("lodash/flatten"));

const allFieldsFilter = () => {
  const type = 'field';
  return (0, _cliSnapshotTools.createFilter)({
    type
  });
};

const _require = require('./actions'),
      convertPathArrayToString = _require.convertPathArrayToString;

const previousVersionMigrations = {
  '2.0.3': [{
    filter: (0, _cliSnapshotTools.createElementFilter)('dropdownmenuavatar'),
    actions: [(0, _cliSnapshotTools.removeComponentPropAction)('onClick')]
  }],
  '2.0.6': [{
    filter: allFieldsFilter(),
    actions: [convertPathArrayToString()]
  }]
};
const allPreviousVersionMigrations = (0, _flatten.default)(Object.values(previousVersionMigrations));
var _default = allPreviousVersionMigrations;
exports.default = _default;
//# sourceMappingURL=migration.js.map