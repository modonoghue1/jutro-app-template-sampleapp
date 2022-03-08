"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptEnableCliAnalytics = void 0;

const _require = require('fs-extra'),
      writeJsonSync = _require.writeJsonSync;

const _require2 = require('../logging'),
      logYellow = _require2.logYellow;

const _require3 = require('./promptsWrapper'),
      prompt = _require3.prompt;

const _require4 = require('../../../bin/check-for-cli-update'),
      loadConfig = _require4.loadConfig,
      JUTRO_CLI_CONFIG_PATH = _require4.JUTRO_CLI_CONFIG_PATH;

const updateConfig = config => {
  try {
    const newConfig = { ...loadConfig(),
      ...config
    };
    writeJsonSync(JUTRO_CLI_CONFIG_PATH, newConfig);
  } catch (error) {
    logYellow('jutro-cli usage data sharing is not enabled because of some error. It will not impact the jutro-cli usage', error);
  }

  return config;
};

const promptEnableCliAnalytics = async fromCi => {
  const cliConfig = loadConfig();

  if (!cliConfig.cliAnalyticsEnableCheck) {
    const options = [{
      title: 'yes',
      value: true
    }, {
      title: 'no',
      value: false
    }];
    const questions = {
      type: 'select',
      name: 'cliAnalytics',
      message: `Would you like to share jutro-cli usage data with Jutro team at Guidewire?`,
      choices: options,
      defaultChoice: true
    };
    const response = await prompt(questions, fromCi);
    updateConfig({
      cliAnalyticsEnableCheck: response.cliAnalytics
    });
  }
};

exports.promptEnableCliAnalytics = promptEnableCliAnalytics;
//# sourceMappingURL=promptEnableCliAnalytics.js.map