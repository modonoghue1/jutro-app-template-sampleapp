"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptCodemodFilePattern = void 0;

var _promptsWrapper = require("./promptsWrapper");

const promptCodemodFilePattern = async fromCi => {
  const response = await (0, _promptsWrapper.prompt)({
    type: 'text',
    name: 'value',
    message: 'Which file pattern do you want the codemods applied to?',
    initial: '**/src/**/*.js'
  }, fromCi);
  return response.value;
};

exports.promptCodemodFilePattern = promptCodemodFilePattern;
//# sourceMappingURL=promptCodemodFilePattern.js.map