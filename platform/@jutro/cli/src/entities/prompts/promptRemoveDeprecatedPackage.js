"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptRemoveDeprecatedPackage = void 0;

var _promptsWrapper = require("./promptsWrapper");

const promptRemoveDeprecatedPackage = async (packageName, fromCi, consoleCapture, verbose) => {
  if (!packageName) {
    return false;
  }

  if (consoleCapture && !verbose) {
    consoleCapture.stopIntercept();
  }

  const options = [{
    title: 'yes',
    value: true
  }, {
    title: 'no',
    value: false
  }];
  const response = await (0, _promptsWrapper.prompt)({
    type: 'select',
    name: 'remove',
    message: `Do you want to remove the deprecated package '${packageName}'?`,
    choices: options,
    defaultChoice: true
  }, fromCi);

  if (consoleCapture && !verbose) {
    consoleCapture.startIntercept();
  }

  return response.remove;
};

exports.promptRemoveDeprecatedPackage = promptRemoveDeprecatedPackage;
//# sourceMappingURL=promptRemoveDeprecatedPackage.js.map