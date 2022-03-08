"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeUpgradeRunners = void 0;

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _git = require("../git");

var _pipelines = require("../pipelines");

const COMMIT_MSG_PREFIX = 'Jutro CLI update - ';
const executeUpgradeRunners = (0, _pipelines.Pipeline)().setup(async ({
  toVersion,
  snapshots
}) => {
  const incrementalSnapshotsToRun = (0, _cliSnapshotTools.filterSnapshotsByVersion)(snapshots, toVersion);
  return {
    incrementalSnapshotsToRun
  };
}).afterEach(async ({
  incrementalSnapshotsToRun,
  canMakeVcsChange = false,
  consoleCapture,
  ...runnerParams
}, runner) => {
  if (runner && (0, _isFunction.default)(runner)) {
    for await (const snapshot of incrementalSnapshotsToRun) {
      await runner({ ...runnerParams,
        snapshot,
        templatePackage: snapshot ? snapshot.template : null
      });
      await (0, _git.stageAndCommit)(canMakeVcsChange, './*', `${COMMIT_MSG_PREFIX}${snapshot.version} - ${runner.name}`);
    }
  }
});
exports.executeUpgradeRunners = executeUpgradeRunners;
//# sourceMappingURL=executeUpgradeRunners.js.map