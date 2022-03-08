"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singlePrompt = void 0;

var _prompts = _interopRequireDefault(require("prompts"));

var _logging = require("../logging");

const singlePrompt = async (question, fromCi = false, overrideValues) => {
  if (overrideValues) {
    return overrideValues;
  }

  const response = fromCi ? getDefaultPromptValue(question) : await getPromptValue(question);
  return response;
};

exports.singlePrompt = singlePrompt;

const getDefaultPromptValue = ({
  type,
  initial,
  name,
  defaultChoice
}) => {
  var _ref;

  const value = (_ref = defaultChoice !== null && defaultChoice !== void 0 ? defaultChoice : initial) !== null && _ref !== void 0 ? _ref : null;

  if (value === null) {
    (0, _logging.log)(`No default provided for prompt ${name} type ${type} - returning null value`);
  }

  return value;
};

const getPromptValue = async question => {
  try {
    const response = await (0, _prompts.default)([question]);
    return response[question.name];
  } catch (error) {
    (0, _logging.log)(`Unable to record response for prompt: ${error}`);
    return null;
  }
};
//# sourceMappingURL=singlePrompt.js.map