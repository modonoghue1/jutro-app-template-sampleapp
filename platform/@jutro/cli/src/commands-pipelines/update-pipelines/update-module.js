"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateModule = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _path = require("path");

var _fsExtra = require("fs-extra");

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _clearDeprecated = require("./clear-deprecated");

var _appPackage = require("../../entities/app-package");

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

const incrementalUpdateModule = ({
  currentVersion,
  applicationPackagePath,
  snapshots
}) => {
  let updatedAppPackage = (0, _appPackage.getConsumerApplicationPackage)(applicationPackagePath);
  snapshots.forEach(snapshot => {
    updatedAppPackage = (0, _appPackage.updateModulePackage)({
      applicationPackage: updatedAppPackage,
      currentVersion,
      snapshot,
      packagePath: applicationPackagePath
    });
  });
  (0, _fsExtra.outputJSONSync)(applicationPackagePath, updatedAppPackage, {
    spaces: 2
  });
};

const updateModule = (0, _pipelines.PipelineWithLogs)({
  startLogMessage: 'Initializing module package update...',
  logFileName: 'jutro-update-module-cli'
}).setup(async ({
  currentVersion,
  doNpmInstall = null,
  logFileName,
  snapshots,
  toVersion = null,
  packageFiles
}) => {
  const availableVersions = snapshots.map(snapshot => snapshot.version);
  const numAvailableVersions = (0, _get.default)(availableVersions, 'length', 0);

  if (!numAvailableVersions) {
    (0, _logging.logUpToDate)(currentVersion);
    return null;
  }

  if (!toVersion) {
    throw new Error({
      message: `We could not find an appropriate version to update to from current version: ${currentVersion}.`,
      errorLogFileName: `${logFileName}-${currentVersion}`
    });
  }

  const filteredSnapshots = (0, _cliSnapshotTools.filterSnapshotsByVersion)(snapshots, toVersion);
  return {
    packageFiles,
    doNpmInstall,
    toVersion,
    currentVersion,
    snapshots: filteredSnapshots
  };
}).addStep({
  action: async ({
    packageFiles,
    currentVersion,
    snapshots
  }) => {
    packageFiles.forEach(applicationPackagePath => incrementalUpdateModule({
      currentVersion,
      snapshots,
      applicationPackagePath
    }));
  }
}).addStep({
  action: async ({
    packageFiles,
    snapshots,
    fromCi,
    verbose,
    consoleCapture
  }) => {
    if (packageFiles.length === 1) {
      const unusedDependencies = await (0, _appPackage.getUnusedDependencies)((0, _path.resolve)((0, _path.dirname)(packageFiles[0])));
      await (0, _appPackage.handleUnusedDependencies)({
        snapshots,
        consoleCapture,
        fromCi,
        packagePath: packageFiles[0],
        unusedDependencies,
        verbose
      });
    }
  }
}).addStep({
  action: async ({
    fromCi,
    basePath,
    currentVersion
  }) => {
    await (0, _clearDeprecated.clearDeprecated)({
      currentVersion,
      fromCi,
      isLogCaptured: false,
      basePath
    });
  }
}).addStep({
  action: async ({
    fromCi,
    doNpmInstall,
    dependencyInstallScript,
    logFileName,
    currentVersion,
    toVersion,
    verbose,
    consoleCapture
  }) => {
    if (!fromCi || doNpmInstall) {
      await (0, _appPackage.handleDependencyInstallation)(doNpmInstall, dependencyInstallScript, verbose, consoleCapture);
    }

    return {
      successLogFileName: `${logFileName}-${currentVersion}-${toVersion}`
    };
  },
  props: {
    title: 'Finishing the Update'
  }
});
exports.updateModule = updateModule;
//# sourceMappingURL=update-module.js.map