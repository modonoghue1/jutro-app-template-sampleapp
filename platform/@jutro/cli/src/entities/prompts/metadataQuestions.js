"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionMetadataFromVersion = exports.questionMetadataFilePattern = void 0;

var _promptsWrapper = require("./promptsWrapper");

const questionMetadataFilePattern = async fromCi => {
  const response = await (0, _promptsWrapper.prompt)({
    type: 'text',
    name: 'value',
    message: 'Which file pattern are you using to store your metadata?',
    initial: '**/src/**/*.metadata.json5'
  }, fromCi);
  return response.value;
};

exports.questionMetadataFilePattern = questionMetadataFilePattern;

const questionMetadataFromVersion = async () => {
  const response = await (0, _promptsWrapper.prompt)({
    type: 'text',
    name: 'value',
    message: 'What metadata version are you updating from?'
  });
  return response.value;
};

exports.questionMetadataFromVersion = questionMetadataFromVersion;
//# sourceMappingURL=metadataQuestions.js.map