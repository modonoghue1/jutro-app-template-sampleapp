"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMetadataSchema = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

const schemaFiles = ['metadata.schema.json', 'basic.metadata.schema.json'];
const updateMetadataSchema = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Updating metadata schema...',
  logFileName: 'jutro-update-metadata-cli.log'
}).addStep(async ({
  schemaOutputDir
}) => {
  (0, _logging.log)('updating metadata schema files');
  const cwd = process.cwd();

  const getSchemaSrcPath = schemaFileName => _path.default.join(cwd, 'node_modules', '@jutro', 'uimetadata', 'common', 'json-schema', schemaFileName);

  const getSchemaDstPath = schemaFileName => _path.default.join(cwd, schemaOutputDir, schemaFileName);

  try {
    schemaFiles.forEach(schemaFile => {
      _fsExtra.default.copyFileSync(getSchemaSrcPath(schemaFile), getSchemaDstPath(schemaFile));

      (0, _logging.log)(`wrote schema file to: ${getSchemaDstPath(schemaFile)}`);
    });
  } catch (error) {
    (0, _logging.logRed)(`A fatal error occurred trying to update the metadata schema: ${error}`);
    throw Error('Unable to update metadata schema file.');
  }
});
exports.updateMetadataSchema = updateMetadataSchema;
//# sourceMappingURL=update-metadata-schema.js.map