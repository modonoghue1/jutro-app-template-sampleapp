"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDependencies = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _ora = _interopRequireDefault(require("ora"));

var _fsExtra = require("fs-extra");

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _appPackage = require("../../entities/app-package");

var _git = require("../../entities/git");

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

var _prompts = require("../../entities/prompts");

const COMMIT_MSG_PREFIX = 'Jutro CLI updateDependencies - ';
const FIELDS_TO_UPDATE = ['dependencies', 'devDependencies', 'peerDependencies', 'engines'];

const incrementalUpdateDependencies = ({
  currentVersion,
  fieldsToUpdate,
  packagePath,
  snapshots,
  toVersion
}) => {
  const incrementalSnapshotsToRun = (0, _cliSnapshotTools.filterSnapshotsByVersion)(snapshots, toVersion);
  let updatedAppPackage = (0, _appPackage.getConsumerApplicationPackage)(packagePath);
  incrementalSnapshotsToRun.forEach(snapshot => {
    updatedAppPackage = (0, _appPackage.updateApplicationPackage)({
      applicationPackage: updatedAppPackage,
      currentVersion,
      templatePackage: (0, _get.default)(snapshot, 'template'),
      fieldsToUpdate,
      packagePath
    });
  });
  (0, _fsExtra.outputJSONSync)(packagePath, updatedAppPackage, {
    spaces: 2
  });
};

const updateDependencies = (0, _pipelines.PipelineWithLogs)({
  startLogMessage: 'Initializing dependency update...',
  logFileName: 'jutro-update-dependencies'
}).setup(async ({
  branchName = `jutro-cli-update-dependencies-${Date.now()}`,
  currentVersion,
  doNpmInstall = null,
  fromCi,
  logFileName,
  packagePath = 'package.json',
  skipVcs,
  snapshots,
  toVersion = null
}) => {
  const canMakeVcsChange = await (0, _git.checkCanMakeVcsChange)(skipVcs, branchName);
  const doMigration = fromCi || (await (0, _prompts.promptBackupWarning)());

  if (!doMigration) {
    (0, _logging.logYellow)(`Upgrade has not been started.`);
    return null;
  }

  const applicationPackage = (0, _appPackage.getConsumerApplicationPackage)(packagePath);
  const availableVersions = snapshots.map(snapshot => snapshot.version);
  const numAvailableVersions = (0, _get.default)(availableVersions, 'length', 0);

  if (!numAvailableVersions) {
    (0, _logging.logUpToDate)(currentVersion);
    return null;
  }

  if (!toVersion) {
    throw new Error(`We could not find an appropriate version to update to from current version: ${currentVersion}.`, `${logFileName}-${currentVersion}`);
  }

  return {
    snapshots,
    applicationPackage,
    canMakeVcsChange,
    toVersion,
    currentVersion,
    doNpmInstall,
    fieldsToUpdate: FIELDS_TO_UPDATE,
    packagePath
  };
}).beforeEach(({
  consoleCapture,
  spinner,
  verbose
}, lastValue, {
  title
}) => {
  if (!verbose) {
    consoleCapture.stopIntercept();
    spinner = spinner ? spinner.stop() : (0, _ora.default)({
      text: title,
      color: 'yellow',
      spinner: 'dots',
      discardStdin: true
    });
    spinner.start();
    consoleCapture.startIntercept();
  }

  return {
    spinner
  };
}).afterEach(async ({
  canMakeVcsChange
}, {
  commitMessageSuffix
} = {}, {
  spinner
} = {}) => {
  if (commitMessageSuffix) {
    await (0, _git.stageAndCommit)(canMakeVcsChange, './*', `${COMMIT_MSG_PREFIX}${commitMessageSuffix}`);
  }

  if (spinner) {
    spinner.succeed();
  }
}).addStep({
  action: async ({
    currentVersion,
    fieldsToUpdate,
    packagePath,
    snapshots,
    toVersion
  }) => {
    incrementalUpdateDependencies({
      currentVersion,
      fieldsToUpdate,
      packagePath,
      snapshots,
      toVersion
    });
  },
  props: {
    title: 'Executing Dependency Upgrade Runner'
  }
}).addStep({
  action: async ({
    doNpmInstall,
    dependencyInstallScript,
    logFileName,
    currentVersion,
    toVersion,
    verbose,
    consoleCapture
  }) => {
    if (doNpmInstall) {
      await (0, _appPackage.handleDependencyInstallation)(doNpmInstall, dependencyInstallScript, verbose, consoleCapture);
    }

    return {
      successLogFileName: `${logFileName}-${currentVersion}-${toVersion}`
    };
  },
  props: {
    title: 'Finishing the Dependencies Update'
  }
});
exports.updateDependencies = updateDependencies;
//# sourceMappingURL=update-dependencies.js.map