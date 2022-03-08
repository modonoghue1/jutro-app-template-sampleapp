"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptConfirmation = exports.promptComponentGeneration = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _promptsWrapper = require("./promptsWrapper");

var _logging = require("../logging");

const exit = () => {
  (0, _logging.log)('Exiting...');
  const SIGINT_SIGNAL = 130;
  process.exit(SIGINT_SIGNAL);
};

const showPromptsForMissingArguments = async (existingQuestions, existingArguments) => {
  const promptResponses = await (0, _promptsWrapper.prompt)(existingQuestions, false, existingArguments, {
    showRemainingQuestions: existingQuestions.length !== Object.keys(existingArguments).length,
    onCancel: () => exit()
  });
  return promptResponses;
};

const filterEmptyFields = objectToFilter => {
  const filteredObject = {};
  Object.keys(objectToFilter).forEach(field => {
    if (objectToFilter[field] !== undefined) filteredObject[field] = objectToFilter[field];
  });
  return filteredObject;
};

const promptComponentGeneration = async (providedQuestions, providedArguments) => {
  const mergedArguments = await showPromptsForMissingArguments(providedQuestions, filterEmptyFields(providedArguments));
  return mergedArguments;
};

exports.promptComponentGeneration = promptComponentGeneration;

const promptConfirmation = async warningMessage => {
  const _await$prompt = await (0, _promptsWrapper.prompt)({
    type: 'confirm',
    name: 'confirmation',
    message: '',

    onRender() {
      this.msg = `${_chalk.default.yellow(warningMessage)}, are you sure you want to continue?`;
    }

  }, false, undefined, {
    onCancel: () => exit()
  }),
        confirmation = _await$prompt.confirmation;

  if (confirmation === false) exit();
};

exports.promptConfirmation = promptConfirmation;
//# sourceMappingURL=promptsComponentGeneration.js.map