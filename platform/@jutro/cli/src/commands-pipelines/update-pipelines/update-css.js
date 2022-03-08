"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCss = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _glob = require("glob");

var _path = require("path");

var _fsExtra = require("fs-extra");

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _glob2 = require("../../entities/glob");

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

var _cssmods = require("../../entities/cssmods");

const incrementalUpdate = async ({
  snapshot,
  cssFileNamePattern,
  customGlobIgnorePattern
}) => {
  if (!snapshot || !snapshot.cssMods) {
    return;
  }

  const filesToUpdate = (0, _glob.sync)(cssFileNamePattern, {
    ignore: customGlobIgnorePattern || _glob2.globIgnorePatterns
  });
  filesToUpdate.forEach(file => {
    const namePatterns = Object.keys(snapshot.cssMods);

    for (const namePattern of namePatterns) {
      if (new RegExp(namePattern).test((0, _path.basename)(file))) {
        const css = (0, _fsExtra.readFileSync)(file, 'utf8');
        return (0, _cssmods.applyCssSnapshot)({
          css,
          snapshot: {
            atRules: snapshot.cssMods[namePattern].atRules
          },
          from: file
        }).then(result => {
          (0, _fsExtra.writeFileSync)(file, result.css);
        });
      }
    }

    return undefined;
  });
};

const updateCss = (0, _pipelines.PipelineWithLogs)({
  startLogMessage: 'Initializing css files update...',
  logFileName: 'jutro-update-css-files',
  name: 'runUpdateCss'
}).setup(async ({
  currentVersion,
  cssFileNamePattern = '**/*.scss',
  customGlobIgnorePattern,
  doNpmInstall = null,
  packagePath = 'package.json',
  parentCapture,
  snapshots,
  toVersion = null
}) => {
  const availableVersions = snapshots.map(snapshot => snapshot.version);
  const numAvailableVersions = (0, _get.default)(availableVersions, 'length', 0);

  if (!numAvailableVersions) {
    (0, _logging.logUpToDate)(currentVersion);
    return null;
  }

  return {
    snapshots,
    toVersion,
    cssFileNamePattern,
    currentVersion,
    customGlobIgnorePattern,
    doNpmInstall,
    packagePath,
    parentCapture
  };
}).addStep({
  action: async ({
    snapshots,
    toVersion,
    cssFileNamePattern,
    currentVersion,
    customGlobIgnorePattern,
    logFileName,
    snapshot
  }) => {
    if (snapshot) {
      await incrementalUpdate({
        snapshot,
        cssFileNamePattern
      });
    } else {
      const incrementalSnapshotsToRun = (0, _cliSnapshotTools.filterSnapshotsByVersion)(snapshots, toVersion);

      for await (const incrementalSnapshot of incrementalSnapshotsToRun) {
        await incrementalUpdate({
          cssFileNamePattern,
          customGlobIgnorePattern,
          snapshot: incrementalSnapshot
        });
      }
    }

    return {
      successLogFileName: `${logFileName}-${currentVersion}-${toVersion}`
    };
  }
});
exports.updateCss = updateCss;
//# sourceMappingURL=update-css.js.map