"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptUserForUnusedDependencies = void 0;

var _promptsWrapper = require("./promptsWrapper");

const promptUserForUnusedDependencies = async (dependencies, type, verbose, consoleCapture, fromCi) => {
  if (consoleCapture && !verbose) {
    consoleCapture.stopIntercept();
  }

  const choices = dependencies.map(dependency => ({
    title: dependency,
    value: dependency,
    selected: true
  }));

  if (!verbose) {
    choices.push({
      title: '',
      value: '',
      disabled: true
    });
  }

  const response = await (0, _promptsWrapper.prompt)({
    type: 'multiselect',
    name: 'action',
    message: `We found unused ${type} in your project. Please select those which you would like to remove below`,
    warn: ' ',
    choices
  }, fromCi);

  if (consoleCapture && !verbose) {
    consoleCapture.startIntercept();
  }

  return response.action;
};

exports.promptUserForUnusedDependencies = promptUserForUnusedDependencies;
//# sourceMappingURL=promptUserForUnusedDependencies.js.map