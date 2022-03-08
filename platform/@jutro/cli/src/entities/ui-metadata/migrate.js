"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrate = void 0;

require("json5/lib/register");

var _fs = _interopRequireDefault(require("fs"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _path = require("path");

var _semver = _interopRequireDefault(require("semver"));

var _commentJson = require("comment-json");

var _getMetadataFromFile = require("./getMetadataFromFile");

var _logging = require("../logging");

const getSchemaFile = (schemaFiles, filePath) => {
  const pattern = /.*metadata\.schema\.json/;
  const schemaFile = schemaFiles === null || schemaFiles === void 0 ? void 0 : schemaFiles.filter(el => pattern.test(el))[0];
  return schemaFile ? (0, _path.relative)((0, _path.dirname)(filePath), schemaFile) : null;
};

const traverse = (jsonObject, {
  migration,
  reducer
}, nextVersion) => {
  for (const prop in jsonObject) {
    if (typeof jsonObject[prop] === 'object' && jsonObject[prop]) {
      migration.forEach(({
        filter,
        actions
      }) => {
        if (filter(jsonObject[prop])) {
          actions.forEach(action => {
            (0, _logging.logYellow)(`running action -> ${action.type}`);
            jsonObject[prop] = reducer(jsonObject[prop], action);
          });
        }
      });
      traverse(jsonObject[prop], {
        migration,
        reducer
      }, nextVersion);
    }
  }

  return jsonObject;
};

const migrate = async ({
  currentVersion,
  metadataFilesToMigrate: filesToMigrate,
  schemaFiles,
  skipVersionMigration = false,
  snapshot
}) => {
  console.time('total time to migrate metadata');

  if (!filesToMigrate || !filesToMigrate.length) {
    return;
  }

  if (!snapshot) {
    (0, _logging.logYellow)('No upgrade scripts to update to.');
    return;
  }

  const nextVersion = snapshot.version,
        migrationObjects = snapshot.uiMetadata;
  let foundFileToMigrate = false;

  if (!skipVersionMigration) {
    (0, _logging.log)(`current ${currentVersion} - next ${nextVersion}`);
  }

  filesToMigrate.forEach(file => {
    if (_semver.default.lte(nextVersion, currentVersion)) {
      return;
    }

    const metadata = (0, _getMetadataFromFile.getMetadataFromFile)(file);

    if ((0, _isNil.default)(metadata.jutro) || _semver.default.lt(metadata.jutro, nextVersion)) {
      if (!foundFileToMigrate) {
        foundFileToMigrate = true;
        (0, _logging.logBlueBright)('\nMigrated Files ::');
      }

      (0, _logging.logGreen)(`file "${file}" has been migrated from version: ${metadata.jutro} to ${nextVersion}`);
      const metadataWithVersion = skipVersionMigration ? { ...metadata
      } : { ...metadata,
        jutro: nextVersion
      };

      if ((0, _isArray.default)(migrationObjects)) {
        migrationObjects.forEach(uiMetadata => {
          traverse(metadataWithVersion, uiMetadata, nextVersion);
        });
      } else {
        traverse(metadataWithVersion, migrationObjects, nextVersion);
      }

      const splitFilePath = file.replace('./', '').split('/');
      const fileName = splitFilePath.pop().replace(/\.[^/.]+$/, '.json5');
      const schemaFile = getSchemaFile(schemaFiles, file);

      if (schemaFile && (!metadataWithVersion.$schema || metadataWithVersion.$schema !== schemaFile)) {
        metadataWithVersion.$schema = schemaFile;
      }

      _fs.default.writeFileSync(`${splitFilePath.join('/')}/${fileName}`, (0, _commentJson.stringify)(metadataWithVersion, null, 2));
    }
  });
  console.timeEnd('total time to migrate metadata');
};

exports.migrate = migrate;
//# sourceMappingURL=migrate.js.map