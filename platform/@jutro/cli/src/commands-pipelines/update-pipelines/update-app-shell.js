"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAppShell = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _get = _interopRequireDefault(require("lodash/get"));

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

var _git = require("../../entities/git");

const incrementalUpdate = async ({
  packagePath,
  resolveRejects,
  snapshot
}) => {
  const patches = (0, _get.default)(snapshot, 'diff');
  const snapshotVersion = (0, _get.default)(snapshot, 'version');

  if (!patches) {
    (0, _logging.log)(`No contents to apply for patch version ${snapshotVersion}`);
    return;
  }

  (0, _logging.log)(`Applying patch for version ${snapshotVersion}`);
  const patchesArray = Array.isArray(patches) ? patches : [patches];

  for await (const patchContent of patchesArray) {
    if ((0, _get.default)(patchContent, 'diff')) {
      const patchPath = (0, _cliSnapshotTools.buildTempPatch)((0, _get.default)(patchContent, 'diff'));
      (0, _git.applyPatch)(patchPath, packagePath);
      if (resolveRejects) await (0, _git.applyRejects)();
    }
  }
};

const updateAppShell = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Updating app shell...',
  logFileName: 'jutro-update-app-shell-cli.log',
  name: 'runUpdateShell'
}).setup(async ({
  currentVersion,
  packagePath = 'package.json',
  parentCapture,
  resolveRejects,
  snapshots,
  toVersion = null
}) => {
  if (!toVersion) {
    (0, _logging.logYellow)('Unable to determine Jutro version.');
    return undefined;
  }

  const filteredSnapshots = (0, _cliSnapshotTools.filterSnapshotsByVersion)(snapshots, toVersion);
  return {
    snapshots,
    toVersion,
    currentVersion,
    filteredSnapshots,
    packagePath,
    parentCapture,
    resolveRejects
  };
}).addStep(async ({
  filteredSnapshots = [],
  packagePath,
  resolveRejects,
  snapshot
}) => {
  if (snapshot) {
    await incrementalUpdate({
      packagePath,
      resolveRejects,
      snapshot
    });
  } else {
    for await (const incrementalSnapshot of filteredSnapshots) {
      await incrementalUpdate({
        packagePath,
        resolveRejects,
        snapshot: incrementalSnapshot
      });
    }
  }
}).addStep({
  action: async ({
    logFileName,
    currentVersion,
    toVersion
  }) => ({
    successLogFileName: `${logFileName}-${currentVersion}-${toVersion}`
  }),
  props: {
    title: 'Finishing app shell update'
  }
});
exports.updateAppShell = updateAppShell;
//# sourceMappingURL=update-app-shell.js.map