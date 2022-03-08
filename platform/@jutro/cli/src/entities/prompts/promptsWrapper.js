"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompt = void 0;

var _prompts = _interopRequireDefault(require("prompts"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _forIn = _interopRequireDefault(require("lodash/forIn"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _logging = require("../logging");

const prompt = async (questions, fromCi = false, overrideValues, promptOptions) => {
  if (overrideValues) {
    if (promptOptions.showRemainingQuestions) {
      _prompts.default.override(overrideValues);
    } else {
      return overrideValues;
    }
  }

  const questionsArray = Array.isArray(questions) ? questions : [questions];
  const responses = fromCi ? defaultPromptValue(questionsArray) : await getPromptValue(questionsArray, promptOptions);
  return sanitizeResponses(responses);
};

exports.prompt = prompt;

const defaultPromptValue = questions => {
  const responses = {};
  questions.forEach(({
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

    responses[name] = value;
  });
  return responses;
};

const revalidateResponses = (questions, responses) => {
  questions.forEach(question => {
    if (question.validate) {
      const validationResult = question.validate(responses[question.name]);

      if (validationResult !== true) {
        throw new Error(validationResult);
      }
    }
  });
};

const getPromptValue = async (questions, promptOptions) => {
  try {
    const responses = await (0, _prompts.default)(questions, promptOptions);

    if (false) {
      revalidateResponses(questions, responses);
    }

    return responses;
  } catch (error) {
    (0, _logging.log)(`Unable to record response for prompt: ${error}`);
    return null;
  }
};

const sanitizeResponses = responses => {
  const sanitized = {};
  (0, _forIn.default)(responses, (value, key) => {
    if (value && !(0, _isUndefined.default)(value[key])) {
      (0, _merge.default)(sanitized, value);
    } else if (key && !isEmptyObject(value)) {
      sanitized[key] = value;
    }
  });
  return sanitized;
};

const isEmptyObject = obj => JSON.stringify(obj) === '{}';
//# sourceMappingURL=promptsWrapper.js.map