"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDependencyInstallation = void 0;

var _logging = require("../logging");

var _installUpdatedDependencies = require("./installUpdatedDependencies");

var _prompts = require("../prompts");

const handleDependencyInstallation = async (shouldNpmInstall, dependencyInstallScript = 'npm install', verbose, consoleCapture) => {
  if (consoleCapture && !verbose) {
    consoleCapture.stopIntercept();
  }

  const shouldInstall = shouldNpmInstall !== null ? shouldNpmInstall : await (0, _prompts.promptInstallDependencies)();

  if (consoleCapture && !verbose) {
    consoleCapture.startIntercept();
  }

  if (shouldInstall === true) {
    (0, _installUpdatedDependencies.installUpdatedDependencies)(dependencyInstallScript);
  } else {
    (0, _logging.log)('skipping dependencies installation');
  }
};

exports.handleDependencyInstallation = handleDependencyInstallation;
//# sourceMappingURL=handleDependencyInstallation.js.map