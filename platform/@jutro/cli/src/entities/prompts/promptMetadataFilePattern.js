"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptMetadataFilePattern = void 0;

var _promptsWrapper = require("./promptsWrapper");

const promptMetadataFilePattern = async fromCi => {
  const response = await (0, _promptsWrapper.prompt)({
    type: 'text',
    name: 'value',
    message: 'Which file pattern are you using to store your metadata?',
    initial: '**/src/**/*.metadata.json5'
  }, fromCi);
  return response.value;
};

exports.promptMetadataFilePattern = promptMetadataFilePattern;
//# sourceMappingURL=promptMetadataFilePattern.js.map