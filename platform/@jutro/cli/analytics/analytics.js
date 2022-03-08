"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toArray"));

const ua = require('universal-analytics');

const _require = require('../src/entities/logging'),
      logYellow = _require.logYellow;

const _require2 = require('../bin/check-for-cli-update'),
      loadConfig = _require2.loadConfig;

const GA_TRACKING_ID_JUTRO_CLI = 'UA-144178987-5';
const eventType = Object.freeze({
  ARGUMENTS: 'arguments',
  INVOKE: 'invoke',
  ERROR: 'error',
  CODE: 'code'
});
const eventLabel = 'Process exited with code';

const sendGAEvent = ({
  eventCategory,
  action,
  label,
  value,
  callback
}) => {
  const uaConfig = {
    http: true
  };
  const analytics = ua(GA_TRACKING_ID_JUTRO_CLI, uaConfig);
  return analytics.event({
    ec: eventCategory,
    ea: action,
    el: JSON.stringify(label),
    ev: value
  }, callback);
};

const eventSender = ({
  eventCategory,
  action,
  label,
  value,
  callback
}) => {
  const cliConfig = loadConfig();

  if (cliConfig.cliAnalyticsEnableCheck) {
    try {
      sendGAEvent({
        eventCategory,
        action,
        label,
        value,
        callback
      }).send();
    } catch (error) {
      logYellow(`Error occured while sending jutro-cli usage data : ${error}`);
    }
  }
};

const setUpErrorHandlerForJutroCliAnalytics = commandName => {
  if (process.env.isCLIErrorAnalyticsEnabled) {
    return;
  }

  const UNCAUGHT_EXCEPTION = 'Uncaught Exception';
  const UNHANDLED_EXCEPtION = 'Unhandled Rejection';
  process.on('uncaughtException', err => {
    console.log(err);
    eventSender({
      eventCategory: commandName,
      action: eventType.CODE,
      label: eventLabel,
      value: 1,
      callback: () => eventSender({
        eventCategory: eventType.ERROR,
        action: UNCAUGHT_EXCEPTION,
        label: err,
        callback: () => process.exit(1)
      })
    });
  });
  process.on('unhandledRejection', (reason, promise) => {
    eventSender({
      eventCategory: commandName,
      action: eventType.CODE,
      label: eventLabel,
      value: 1,
      callback: () => eventSender({
        eventCategory: eventType.ERROR,
        action: UNHANDLED_EXCEPtION,
        label: {
          promise,
          reason
        },
        callback: () => process.exit(1)
      })
    });
  });
  process.env.isCLIErrorAnalyticsEnabled = true;
};

const processExitEvent = (exitCode, commandName) => {
  eventSender({
    eventCategory: commandName,
    action: eventType.CODE,
    label: eventLabel,
    value: exitCode,
    callback: () => {
      process.exit(exitCode);
    }
  });
};

const getCLICommandNameAndArguments = args => {
  const _args$slice = args.slice(2),
        _args$slice2 = (0, _toArray2.default)(_args$slice),
        command = _args$slice2[0],
        subCommand = _args$slice2[1],
        commandArguments = _args$slice2.slice(2);

  const commandName = `${command}/${subCommand}`;
  return [commandName, commandArguments];
};

const sendCLIUsageData = args => {
  const _getCLICommandNameAnd = getCLICommandNameAndArguments(args),
        _getCLICommandNameAnd2 = (0, _slicedToArray2.default)(_getCLICommandNameAnd, 2),
        commandName = _getCLICommandNameAnd2[0],
        commandArguments = _getCLICommandNameAnd2[1];

  const params = Object.fromEntries(commandArguments.map(item => item.split('=')));
  eventSender({
    eventCategory: eventType.INVOKE,
    action: commandName
  });
  eventSender({
    eventCategory: commandName,
    action: eventType.ARGUMENTS,
    label: { ...params
    }
  });
};

module.exports = {
  eventSender,
  eventType,
  loadConfig,
  setUpErrorHandlerForJutroCliAnalytics,
  processExitEvent,
  sendCLIUsageData,
  getCLICommandNameAndArguments
};
//# sourceMappingURL=analytics.js.map