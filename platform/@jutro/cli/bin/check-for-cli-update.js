"use strict";

const semver = require('semver');

const _require = require('child_process'),
      execSync = _require.execSync;

const _require2 = require('fs-extra'),
      readJsonSync = _require2.readJsonSync,
      writeJsonSync = _require2.writeJsonSync;

const _require3 = require('path'),
      join = _require3.join;

const _require4 = require('os'),
      tmpdir = _require4.tmpdir;

const _require5 = require('../package.json'),
      version = _require5.version;

const JUTRO_CLI_CONFIG_PATH = join(tmpdir(), '.jutro-cli-config.json');
const FLAGS = ['--from-ci'];

const loadConfig = (configFilePath = JUTRO_CLI_CONFIG_PATH) => {
  let config;

  try {
    config = readJsonSync(configFilePath);
  } catch {
    config = {
      latestVersion: undefined,
      lastCheckAttempt: undefined,
      disableUpdateCheck: false
    };
  }

  return config;
};

const shouldExecuteDailyCheck = lastCheck => {
  if (!lastCheck) {
    return true;
  }

  const today = new Date();
  const lastCheckDate = new Date(lastCheck);
  return today.getFullYear() > lastCheckDate.getFullYear() || today.getMonth() > lastCheckDate.getMonth() || today.getDate() > lastCheckDate.getDate();
};

const promptUpdate = (latestVersion, currentVersion) => {
  const checkVersion = currentVersion || version;

  if (/-next/.test(checkVersion)) {
    return;
  }

  if (semver.valid(latestVersion) && semver.valid(checkVersion) && semver.gt(latestVersion, checkVersion)) {
    console.log(`You are running @jutro/cli on version: ${checkVersion}.\nThere is a newer version available: @jutro/cli@${latestVersion}.\nRun npm install @jutro/cli@latest to get it.`);
  }
};

const getLatestVersion = () => {
  var _latestVersion;

  let latestVersion;

  try {
    latestVersion = execSync(`npm show @jutro/cli version`, {
      stdio: 'pipe',
      timeout: 30000
    }).toString();
  } catch (err) {}

  return (_latestVersion = latestVersion) === null || _latestVersion === void 0 ? void 0 : _latestVersion.replace('\n', '');
};

const checkForCLIUpdate = (args, configFilePath) => {
  const cliConfig = loadConfig(configFilePath);

  if (shouldExecuteDailyCheck(cliConfig.lastCheckAttempt)) {
    const latestVersion = getLatestVersion();
    cliConfig.lastCheckAttempt = new Date();
    cliConfig.latestVersion = latestVersion || cliConfig.latestVersion;
    writeJsonSync(configFilePath, cliConfig);
  }

  const params = args.slice(2);

  if (cliConfig.disableUpdateCheck || params.some(param => FLAGS.some(flag => flag === param))) {
    return;
  }

  promptUpdate(cliConfig.latestVersion);
};

module.exports = {
  checkForCLIUpdate,
  getLatestVersion,
  promptUpdate,
  shouldExecuteDailyCheck,
  loadConfig,
  JUTRO_CLI_CONFIG_PATH
};
//# sourceMappingURL=check-for-cli-update.js.map