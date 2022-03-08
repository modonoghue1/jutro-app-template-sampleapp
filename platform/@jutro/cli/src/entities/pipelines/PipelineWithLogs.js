"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipelineWithLogs = void 0;

var _Pipeline = require("./Pipeline");

var _logging = require("../logging");

var _analytics = require("../../../analytics");

const PipelineWithLogs = (config = {}) => {
  const pipelineExecutionWithLogs = defaultPipeLineExecution => async (initialConfig, initialValue, initialBeforeValue) => {
    const globalConfig = { ...config,
      ...initialConfig
    };
    const _globalConfig$isLogCa = globalConfig.isLogCaptured,
          isLogCaptured = _globalConfig$isLogCa === void 0 ? true : _globalConfig$isLogCa,
          _globalConfig$basePat = globalConfig.basePath,
          basePath = _globalConfig$basePat === void 0 ? './' : _globalConfig$basePat,
          logStartMessage = globalConfig.logStartMessage,
          parentCapture = globalConfig.parentCapture,
          _globalConfig$errorLe = globalConfig.errorLevel,
          errorLevel = _globalConfig$errorLe === void 0 ? 'warn' : _globalConfig$errorLe;
    const consoleCapture = parentCapture || isLogCaptured ? (0, _logging.captureConsole)() : false;
    let _config$logFileName = config.logFileName,
        logFileName = _config$logFileName === void 0 ? 'jutro-cli' : _config$logFileName;
    let pipelineOutput;
    let successMessage;

    if (isLogCaptured && consoleCapture && !(parentCapture !== null && parentCapture !== void 0 && parentCapture.hasStarted())) {
      consoleCapture.startCapture();
    }

    try {
      if (logStartMessage) {
        (0, _logging.logBlueBrightAnnouncement)(logStartMessage);
      }

      pipelineOutput = await defaultPipeLineExecution({
        consoleCapture,
        ...globalConfig
      }, initialValue, initialBeforeValue);

      const _ref = pipelineOutput || {},
            successLogFileName = _ref.successLogFileName,
            successLogMessage = _ref.successLogMessage;

      if (successLogFileName) {
        logFileName = successLogFileName;
      }

      if (successLogMessage) {
        successMessage = successLogMessage;
      }
    } catch (error) {
      const message = error.message,
            errorLogFileName = error.errorLogFileName;

      if (errorLogFileName) {
        logFileName = errorLogFileName;
      }

      (0, _logging.logRedAnnouncement)(message || error);
      (0, _analytics.eventSender)({
        eventCategory: _analytics.eventType.ERROR,
        action: 'CLI Pipeline Error',
        label: error
      });

      if (errorLevel === 'error') {
        throw new Error(message || error);
      }
    } finally {
      if (!logFileName.includes('.log')) {
        logFileName = `${logFileName}.log`;
      }

      if (isLogCaptured && consoleCapture && !(parentCapture !== null && parentCapture !== void 0 && parentCapture.hasStarted())) {
        consoleCapture.stopCapture();
        await consoleCapture.saveLog(logFileName, basePath);
      }

      if (successMessage) {
        (0, _logging.logGreenAnnouncement)(successMessage);
      }
    }

    return pipelineOutput;
  };

  const pipeline = (0, _Pipeline.Pipeline)(config, pipelineExecutionWithLogs);
  return pipeline;
};

exports.PipelineWithLogs = PipelineWithLogs;
//# sourceMappingURL=PipelineWithLogs.js.map