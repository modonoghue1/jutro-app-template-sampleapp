"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMetadata = void 0;

var _glob = require("glob");

var _logging = require("../../entities/logging");

var _glob2 = require("../../entities/glob");

var _uiMetadata = require("../../entities/ui-metadata");

var _pipelines = require("../../entities/pipelines");

const checkMetadata = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Validating metadata...',
  logFileName: 'check-metadata-cli.log'
}).addStep(async ({
  fileNamePattern = 'src/**/*.metadata.json5'
}) => {
  (0, _logging.logBlueBright)(`Validating ${fileNamePattern}`);
  (0, _logging.logEmptyLine)();
  const metadataFiles = (0, _glob.sync)(fileNamePattern, {
    ignore: _glob2.globIgnorePatterns
  });

  if (metadataFiles.length === 0) {
    throw new Error(`No metadata files are found for file name pattern ${fileNamePattern}`);
  }

  return metadataFiles;
}).addStep(async ({
  schemaPath
}, metadataFiles) => {
  const result = (0, _uiMetadata.validate)(metadataFiles, schemaPath);

  if (!result.length) {
    (0, _logging.logBlueBright)('All metadata files are fine!');
    return;
  }

  (0, _logging.log)('The following issues with metadata were found:');
  result.forEach(({
    file,
    errorMessages
  }) => {
    (0, _logging.logEmptyLine)();
    (0, _logging.logInverse)(`${file}:`);
    errorMessages.forEach(line => (0, _logging.logRed)(`  ${line}`));
  });

  if (result.length) {
    throw new Error('Metadata check has found the above errors.');
  }
});
exports.checkMetadata = checkMetadata;
//# sourceMappingURL=check-metadata.js.map