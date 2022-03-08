"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConsumerUiMetadataVersion = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _path = _interopRequireDefault(require("path"));

var _glob = require("glob");

var _semver = _interopRequireDefault(require("semver"));

var _json = _interopRequireDefault(require("json5"));

var _glob2 = require("../glob");

var _appPackage = require("../app-package");

const getConsumerUiMetadataVersion = async (packageSource, fileNamePattern = 'src/**/*metadata.json5') => {
  let minimumMetadataVersion = '';
  const filesToMigrate = (0, _glob.sync)(fileNamePattern, {
    ignore: _glob2.globIgnorePatterns
  });
  filesToMigrate.forEach(file => {
    const metadata = _json.default.parse(_fsExtra.default.readFileSync(_path.default.resolve(process.cwd(), file)));

    if (!(0, _isNil.default)(metadata.jutro)) {
      if (minimumMetadataVersion === '' || minimumMetadataVersion !== '1.0.0' && _semver.default.lt(metadata.jutro, minimumMetadataVersion)) {
        minimumMetadataVersion = metadata.jutro;
      }
    }
  });

  if (minimumMetadataVersion === '') {
    return (0, _appPackage.getConsumerApplicationVersion)(packageSource);
  }

  return minimumMetadataVersion;
};

exports.getConsumerUiMetadataVersion = getConsumerUiMetadataVersion;
//# sourceMappingURL=getConsumerUiMetadataVersion.js.map