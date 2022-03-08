"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runSnapshotCodemods = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _logging = require("../logging");

var _runCodemodsOnFiles = require("./runCodemodsOnFiles");

(0, _cliSnapshotTools.registerCodemodActions)();

const runSnapshotCodemods = async ({
  filesToApplyCodemods: filesToMigrate,
  snapshot
}) => {
  const codemodsToRun = (0, _get.default)(snapshot, 'codemods');
  const hasCodesModsToRun = (0, _isArray.default)(codemodsToRun) ? codemodsToRun.some(({
    migration
  }) => !(0, _isEmpty.default)(migration)) : codemodsToRun && codemodsToRun.migration;

  if (!hasCodesModsToRun || !filesToMigrate) {
    return;
  }

  (0, _logging.logGreen)(`Codemods migration beginning for snapshot version ${snapshot.version}.`);
  await (0, _runCodemodsOnFiles.runCodemodsOnFiles)(codemodsToRun, filesToMigrate);
  (0, _logging.logGreen)(`Codemods migration complete for snapshot version ${snapshot.version}.`);
};

exports.runSnapshotCodemods = runSnapshotCodemods;
//# sourceMappingURL=runSnapshotCodemods.js.map