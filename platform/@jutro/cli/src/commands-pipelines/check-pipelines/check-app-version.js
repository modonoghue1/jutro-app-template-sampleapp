"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAppVersion = void 0;

var _child_process = require("child_process");

var _compareVersions = _interopRequireDefault(require("compare-versions"));

var _logging = require("../../entities/logging");

var _appPackage = require("../../entities/app-package");

var _pipelines = require("../../entities/pipelines");

const runCommand = (command, options) => (0, _child_process.execSync)(command, options, (error, stdout) => {
  if (error) {
    (0, _logging.logRed)(`Could not execute command -> ${command}\nError message : ${error}`);
  } else {
    return stdout;
  }

  return undefined;
}).toString();

const checkAppVersion = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Checking @jutro/app version...',
  logFileName: 'jutro-check-version-cli.log'
}).addStep(async () => {
  let appVersion;

  try {
    appVersion = (0, _appPackage.getConsumerApplicationPackage)().dependencies['@jutro/app'];
  } catch (error) {
    throw new Error('Could not determine current Jutro version');
  }

  try {
    const cliVersion = runCommand('npm show @jutro/cli version', {
      timeout: 15000
    }).trim();
    const versionDiff = (0, _compareVersions.default)(cliVersion, appVersion);

    if (versionDiff > 0) {
      (0, _logging.logInverse)(`Latest @jutro-app version(${cliVersion}) is available`);
    } else if (versionDiff === 0) {
      (0, _logging.logGreen)(`@jutro-app is on the latest version(${cliVersion})`);
    }
  } catch (err) {
    (0, _logging.logRed)('Could not compare local version with @jutro/app from npm registry');
    throw new Error(err);
  }
});
exports.checkAppVersion = checkAppVersion;
//# sourceMappingURL=check-app-version.js.map