"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

var _ajv = _interopRequireDefault(require("ajv"));

var _json = _interopRequireDefault(require("json5"));

function validate(metadataFiles, schemaPath) {
  if (!metadataFiles.length) {
    return [];
  }

  const _ref = schemaPath ? readFile(schemaPath) : getDefaultSchema(),
        schema = _ref.content,
        schemaError = _ref.error;

  if (schemaError) {
    return [schemaError];
  }

  const ajv = new _ajv.default();
  const validator = ajv.compile(schema);
  return metadataFiles.map(file => {
    const _readFile = readFile(file),
          metadata = _readFile.content,
          fileError = _readFile.error;

    if (fileError) {
      return fileError;
    }

    if (validator(metadata)) {
      return undefined;
    }

    const errorMessages = ajv.errorsText(validator.errors).split(', ');
    return {
      file,
      errorMessages: Array.from(new Set(errorMessages))
    };
  }).filter(Boolean);
}

function readFile(file) {
  try {
    const rawContent = (0, _fs.readFileSync)(_path.default.resolve(process.cwd(), file), 'utf8');
    return {
      content: _json.default.parse(rawContent)
    };
  } catch (e) {
    return {
      error: {
        file,
        errorMessages: [e.message]
      }
    };
  }
}

function getDefaultSchema() {
  try {
    const dirPath = process.env.PWD || process.cwd();
    const metadataSchema = JSON.parse((0, _fs.readFileSync)(`${dirPath}/node_modules/@jutro/uimetadata/common/json-schema/metadata.schema.json`, 'utf-8'));
    return {
      content: metadataSchema
    };
  } catch (e) {
    return {
      error: {
        file: '@jutro/uimetadata',
        errorMessages: [e.message]
      }
    };
  }
}
//# sourceMappingURL=validate.js.map