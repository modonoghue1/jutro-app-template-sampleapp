"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuth = void 0;

var _configFiles = require("../../entities/config-files");

var _pipelines = require("../../entities/pipelines");

var _prompts = require("../../entities/prompts");

const addAuth = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Updating otka config...',
  logFileName: 'jutro-add-auth-cli.log'
}).addStep(async () => {
  const config = await (0, _prompts.promptUpdateConsumerConfig)({
    applicationDirectory: process.cwd(),
    enableOkta: true
  });
  (0, _configFiles.updateApplicationConfiguration)(config);
});
exports.addAuth = addAuth;
//# sourceMappingURL=add-auth.js.map