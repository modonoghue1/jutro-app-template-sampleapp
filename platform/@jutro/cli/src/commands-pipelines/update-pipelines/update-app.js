"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateApp = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _ora = _interopRequireDefault(require("ora"));

var _fsExtra = require("fs-extra");

var _path = require("path");

var _clearDeprecated = require("./clear-deprecated");

var _appPackage = require("../../entities/app-package");

var _configFiles = require("../../entities/config-files");

var _git = require("../../entities/git");

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

var _prompts = require("../../entities/prompts");

var _snapshots = require("../../entities/snapshots");

var _uiMetadataPipelines = require("../ui-metadata-pipelines");

var _applyCodemods = require("./apply-codemods");

var _updateAppShell = require("./update-app-shell");

var _updateCss = require("./update-css");

var _checkPipelines = require("../check-pipelines");

const COMMIT_MSG_PREFIX = 'Jutro CLI updateApp - ';

const updateApplicationPackageRunner = ({
  currentVersion,
  templatePackage,
  packagePath
}) => {
  let updatedAppPackage = (0, _appPackage.getConsumerApplicationPackage)(packagePath);
  updatedAppPackage = (0, _appPackage.updateApplicationPackage)({
    applicationPackage: updatedAppPackage,
    currentVersion,
    templatePackage,
    packagePath
  });
  (0, _fsExtra.outputJSONSync)(packagePath, updatedAppPackage, {
    spaces: 2
  });
};

const updateApp = (0, _pipelines.PipelineWithLogs)({
  startLogMessage: 'Initializing update...',
  logFileName: 'jutro-migration-cli'
}).setup(async ({
  branchName = `jutro-cli-update-app-${Date.now()}`,
  codemodFileNamePattern = '**/*.js',
  cssFileNamePattern,
  doNpmInstall = null,
  fromCi,
  metadataFileNamePattern = '**/*.metadata.json5',
  packagePath = 'package.json',
  subPipelines = [_uiMetadataPipelines.migrateMetadata, updateApplicationPackageRunner, _applyCodemods.applyCodemods, _updateCss.updateCss, _configFiles.updateConfigFiles],
  schemaFileNamePattern = '**/*.schema.json',
  skipUpdateAppShell,
  skipVcs,
  snapshots,
  currentVersion,
  toVersion = null,
  errorLevel,
  consoleCapture
}) => {
  const canMakeVcsChange = await (0, _git.checkCanMakeVcsChange)(skipVcs, branchName);
  const doMigration = await (0, _prompts.promptBackupWarning)(fromCi);

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

  const applicationPackage = await (0, _appPackage.getConsumerApplicationPackage)(packagePath);
  return {
    snapshots,
    applicationPackage,
    canMakeVcsChange,
    toVersion,
    currentVersion,
    doNpmInstall,
    metadataFileNamePattern,
    schemaFileNamePattern,
    cssFileNamePattern,
    codemodFileNamePattern,
    packagePath,
    subPipelines: subPipelines.concat(...(skipUpdateAppShell ? [] : [_updateAppShell.updateAppShell])),
    snapshotPath: (0, _path.join)(__dirname, 'node_modules/@jutro/cli-snapshots/versions/'),
    errorLevel,
    consoleCapture
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
  commitMessageSuffix,
  error
} = {}, {
  spinner
} = {}) => {
  if (commitMessageSuffix) {
    await (0, _git.stageAndCommit)(canMakeVcsChange, './*', `${COMMIT_MSG_PREFIX}${commitMessageSuffix}`);
  }

  if (spinner) {
    if (error) {
      spinner.warn(error);
    } else {
      spinner.succeed();
    }
  }
}).addStep({
  action: async ({
    subPipelines,
    consoleCapture,
    ...config
  }, previousValue, beforeEachOutput) => _snapshots.executeUpgradeRunners.addStep(...subPipelines.map(pipeline => () => pipeline))({
    parentCapture: consoleCapture,
    ...config
  }, previousValue, beforeEachOutput),
  props: {
    title: 'Executing Upgrade Runners'
  }
}).addStep({
  action: async ({
    packagePath,
    snapshots,
    fromCi,
    verbose,
    consoleCapture
  }) => {
    const unusedDependencies = await (0, _appPackage.getUnusedDependencies)((0, _path.resolve)((0, _path.dirname)(packagePath)));
    await (0, _appPackage.handleUnusedDependencies)({
      snapshots,
      consoleCapture,
      fromCi,
      packagePath,
      unusedDependencies,
      verbose
    });
    return {
      commitMessageSuffix: 'remove unused dependencies'
    };
  },
  props: {
    title: 'Handling unused dependencies'
  }
}).addStep({
  action: async ({
    fromCi,
    packagePath,
    consoleCapture,
    verbose
  }) => {
    await (0, _clearDeprecated.clearDeprecated)({
      fromCi,
      packagePath,
      parentCapture: consoleCapture,
      verbose
    });
    return {
      commitMessageSuffix: 'remove deprecated dependencies'
    };
  },
  props: {
    title: 'Removing deprecated dependencies'
  }
}).addStep({
  action: async ({
    toVersion,
    snapshots,
    packagePath,
    consoleCapture,
    errorLevel,
    verbose
  }) => {
    const _await$checkFolderStr = await (0, _checkPipelines.checkFolderStructure)({
      currentVersion: toVersion,
      snapshots,
      packagePath,
      parentCapture: consoleCapture,
      errorLevel,
      verbose
    }),
          errors = _await$checkFolderStr.errors;

    return {
      error: !(0, _isEmpty.default)(errors) && 'Folder structure validation failed, run "jutro-cli check folder-structure" for details'
    };
  },
  props: {
    title: 'Checking Folder Structure'
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
exports.updateApp = updateApp;
//# sourceMappingURL=update-app.js.map