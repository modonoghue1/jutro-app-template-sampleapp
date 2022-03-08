"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateScripts = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _ora = _interopRequireDefault(require("ora"));

var _fsExtra = require("fs-extra");

var _appPackage = require("../../entities/app-package");

var _git = require("../../entities/git");

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

var _prompts = require("../../entities/prompts");

var _snapshots = require("../../entities/snapshots");

const COMMIT_MSG_PREFIX = 'Jutro CLI updateScripts - ';
const FIELDS_TO_UPDATE = ['scripts'];

const updateApplicationPackageRunner = ({
  applicationPackage,
  currentVersion,
  fieldsToUpdate,
  packagePath,
  templatePackage
}) => {
  const updatedAppPackage = (0, _appPackage.updateApplicationPackage)({
    applicationPackage,
    fieldsToUpdate,
    currentVersion,
    packagePath,
    templatePackage
  });
  (0, _fsExtra.outputJSONSync)(packagePath, updatedAppPackage, {
    spaces: 2
  });
};

const updateScripts = (0, _pipelines.PipelineWithLogs)({
  startLogMessage: 'Initializing scripts update...',
  logFileName: 'jutro-update-scripts'
}).setup(async ({
  currentVersion,
  packagePath = 'package.json',
  toVersion = null,
  doNpmInstall = null,
  logFileName,
  snapshots,
  fromCi,
  skipVcs,
  branchName = `jutro-cli-update-scripts-${Date.now()}`
}) => {
  const canMakeVcsChange = await (0, _git.checkCanMakeVcsChange)(skipVcs, branchName);
  const doMigration = fromCi || (await (0, _prompts.promptBackupWarning)());

  if (!doMigration) {
    (0, _logging.logYellow)(`Upgrade has not been started.`);
    return null;
  }

  const availableVersions = snapshots.map(snapshot => snapshot.version);
  const numAvailableVersions = (0, _get.default)(availableVersions, 'length', 0);

  if (!numAvailableVersions) {
    (0, _logging.logUpToDate)(currentVersion);
    return null;
  }

  const applicationPackage = (0, _appPackage.getConsumerApplicationPackage)(packagePath);

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
    packagePath,
    subPipelines: [updateApplicationPackageRunner]
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
    subPipelines,
    ...config
  }, previousValue, beforeEachOutput) => _snapshots.executeUpgradeRunners.addStep(...subPipelines.map(pipeline => () => pipeline))(config, previousValue, beforeEachOutput),
  props: {
    title: 'Executing Scripts Upgrade Runner'
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
    title: 'Finishing the Scripts Update'
  }
});
exports.updateScripts = updateScripts;
//# sourceMappingURL=update-scripts.js.map