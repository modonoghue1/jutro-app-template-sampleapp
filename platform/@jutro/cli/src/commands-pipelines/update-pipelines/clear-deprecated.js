"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearDeprecated = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _cliSnapshots = require("@jutro/cli-snapshots");

var _pipelines = require("../../entities/pipelines");

var _prompts = require("../../entities/prompts");

var _appPackage = require("../../entities/app-package");

var _logging = require("../../entities/logging");

const getPackages = (applicationPackage, packagePrefix) => {
  if (!applicationPackage.dependencies) {
    return [];
  }

  return Object.keys(applicationPackage.dependencies).filter(key => key.includes(packagePrefix || ''));
};

const compareAgainstSnapshot = (packages, version, snapshots) => {
  const availableSnapshots = (0, _cliSnapshotTools.getAvailableSnapshots)({
    currentVersion: version,
    snapshots,
    filter: _cliSnapshotTools.filterSnapshotsLessThanOrEqual
  });
  const deprecatedInSnapshots = availableSnapshots.flatMap(({
    template: {
      deprecatedPackages = []
    }
  }) => deprecatedPackages);
  return deprecatedInSnapshots.filter(({
    packageName
  }) => packages.includes(packageName));
};

const clearDeprecated = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Checking deprecated...',
  logFileName: 'jutro-check-deprecated-cli.log'
}).setup(async ({
  currentVersion,
  packagePath = 'package.json',
  packagePrefix = '@jutro'
}) => {
  const applicationPackage = (0, _appPackage.getConsumerApplicationPackage)(packagePath);

  if (!applicationPackage) {
    throw new Error('Unable to find package.json - cannot determine deprecated dependencies.');
  }

  const currentAppVersion = currentVersion || (0, _appPackage.getConsumerApplicationVersion)(packagePath);
  const packages = getPackages(applicationPackage, packagePrefix);
  const deprecatedPackages = await compareAgainstSnapshot(packages, currentAppVersion, _cliSnapshots.versionSnapshots);
  return {
    applicationPackage,
    deprecatedPackages
  };
}).addStep(async ({
  deprecatedPackages
}) => {
  if (!deprecatedPackages.length) {
    (0, _logging.logBlueBrightAnnouncement)(`No deprecated Jutro dependencies found.`);
    return;
  }

  (0, _logging.logBlueBrightAnnouncement)(`deprecated packages`);
  deprecatedPackages.forEach(item => {
    (0, _logging.logRed)(item.packageName);
  });
}).addStep(async ({
  fromCi = false,
  deprecatedPackages,
  applicationPackage,
  consoleCapture,
  verbose
}) => {
  (0, _logging.logBlueBrightAnnouncement)(`processing deprecated packages`);

  for await (const pkg of deprecatedPackages) {
    if (await (0, _prompts.promptRemoveDeprecatedPackage)(pkg.packageName, fromCi, consoleCapture, verbose)) {
      delete applicationPackage.dependencies[pkg.packageName];
      (0, _logging.logGreen)(`Removed deprecated dependency '${pkg.packageName}'.`);
      const recommendation = (0, _prompts.getDeprecatedPackageRecommendation)(pkg.message);

      if (recommendation) {
        (0, _logging.logBlueBright)(`'${pkg.packageName}' functionality has been replace by ${recommendation} - please update your dependencies.`);
      }
    }
  }
}).addStep(async ({
  packagePath = 'package.json',
  applicationPackage
}) => {
  await _fsExtra.default.outputJSONSync(packagePath, applicationPackage, {
    spaces: 2
  });
  return {
    successLogMessage: 'finished processing deprecated packages.'
  };
});
exports.clearDeprecated = clearDeprecated;
//# sourceMappingURL=clear-deprecated.js.map