"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

const program = require('commander');

const _require = require('path'),
      resolve = _require.resolve;

const pkg = require('../package.json');

const _require2 = require('../src'),
      outputLogo = _require2.outputLogo;

const _require3 = require('../analytics'),
      setUpErrorHandlerForJutroCliAnalytics = _require3.setUpErrorHandlerForJutroCliAnalytics,
      sendCLIUsageData = _require3.sendCLIUsageData,
      getCLICommandNameAndArguments = _require3.getCLICommandNameAndArguments;

const _require4 = require('./check-for-cli-update'),
      checkForCLIUpdate = _require4.checkForCLIUpdate,
      JUTRO_CLI_CONFIG_PATH = _require4.JUTRO_CLI_CONFIG_PATH;

const cli = args => {
  program.version(pkg.version);

  const _getCLICommandNameAnd = getCLICommandNameAndArguments(args),
        _getCLICommandNameAnd2 = (0, _slicedToArray2.default)(_getCLICommandNameAnd, 1),
        commandName = _getCLICommandNameAnd2[0];

  setUpErrorHandlerForJutroCliAnalytics(commandName);
  program.command('add-ons', 'add features to your Jutro application', {
    executableFile: resolve(__dirname, './add-ons/index.js')
  }).command('check', 'validate versions and dependencies for your Jutro application', {
    executableFile: resolve(__dirname, './check/index.js')
  }).command('generate', 'generate components files for your Jutro application', {
    executableFile: resolve(__dirname, './generate/index.js')
  }).command('i18n', 'merge translations or extract messages', {
    executableFile: resolve(__dirname, './i18n/index.js')
  }).command('update', 'update app and associated files', {
    executableFile: resolve(__dirname, './update/index.js')
  });
  outputLogo();
  checkForCLIUpdate(args, JUTRO_CLI_CONFIG_PATH);
  sendCLIUsageData(args);
  program.parse(args);

  if (!args.slice(2).length) {
    program.outputHelp();
  }
};

module.exports = {
  cli
};
//# sourceMappingURL=cli.js.map