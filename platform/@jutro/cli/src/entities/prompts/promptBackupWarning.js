"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptBackupWarning = void 0;

var _promptsWrapper = require("./promptsWrapper");

const promptBackupWarning = async fromCi => {
  const options = [{
    title: 'yes',
    value: true
  }, {
    title: 'no',
    value: false
  }];
  const response = await (0, _promptsWrapper.prompt)({
    type: 'select',
    name: 'migration',
    message: `We recommend that you back up your code on git or source control before you continue. If you have already done so would you like to continue?`,
    choices: options,
    defaultChoice: true
  }, fromCi);
  return response.migration;
};

exports.promptBackupWarning = promptBackupWarning;
//# sourceMappingURL=promptBackupWarning.js.map