"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptInstallDependencies = void 0;

var _promptsWrapper = require("./promptsWrapper");

const promptInstallDependencies = async fromCi => {
  const response = await (0, _promptsWrapper.prompt)({
    type: 'select',
    name: 'shouldInstall',
    message: 'We recommend that you run npm install to install updated dependencies. Do you want to install them now?',
    choices: [{
      title: 'yes',
      value: true
    }, {
      title: 'no',
      value: false
    }]
  }, fromCi);
  return response.shouldInstall;
};

exports.promptInstallDependencies = promptInstallDependencies;
//# sourceMappingURL=promptInstallDependencies.js.map