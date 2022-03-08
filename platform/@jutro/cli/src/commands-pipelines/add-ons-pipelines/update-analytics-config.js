"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAnalyticsConfig = void 0;

var _prompts = require("../../entities/prompts");

var _pipelines = require("../../entities/pipelines");

var _configFiles = require("../../entities/config-files");

const updateAnalyticsConfig = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Updating analytics config...',
  logFileName: 'jutro-enable-analytics-cli.log'
}).addStep(async () => {
  const config = await (0, _prompts.promptUpdateConsumerConfig)({
    applicationDirectory: process.cwd(),
    enableMixPanel: true,
    enableGoogleAnalytics: true,
    enableDataDog: true
  });
  (0, _configFiles.updateApplicationConfiguration)(config);
});
exports.updateAnalyticsConfig = updateAnalyticsConfig;
//# sourceMappingURL=update-analytics-config.js.map