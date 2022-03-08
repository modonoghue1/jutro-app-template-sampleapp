"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateConfigFiles = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _process = _interopRequireDefault(require("process"));

var _logging = require("../logging");

const updateConfigFiles = ({
  snapshot,
  snapshotPath: versionsDir
}) => {
  const version = snapshot ? snapshot.version : null;

  const filesToCopyDir = _path.default.resolve(_path.default.join(versionsDir, version, 'configurationFiles', 'filesToCopy'));

  const fileNameMap = snapshot.fileNameMap || defaultFileNameMap;

  try {
    const files = _fsExtra.default.readdirSync(filesToCopyDir);

    (0, _logging.logGreen)(`updating configuration for: ${version}`);
    files.forEach(file => {
      try {
        const sourcePath = _path.default.resolve(_path.default.join(filesToCopyDir, file));

        const destinationFileName = fileNameMap[file] != null ? fileNameMap[file] : file;

        const destinationPath = _path.default.resolve(_path.default.join(_process.default.cwd(), destinationFileName));

        (0, _logging.logGreen)(`Adding File: ${destinationFileName}`);

        _fsExtra.default.copySync(sourcePath, destinationPath);
      } catch (exception) {
        (0, _logging.logRed)(exception);
      }
    });
  } catch (err) {
    return (0, _logging.logGreen)(`Unable to scan directory: ${err}`);
  }

  return undefined;
};

exports.updateConfigFiles = updateConfigFiles;
const defaultFileNameMap = {
  babelrc: '.babelrc',
  'eslintrc.js.x': '.eslintrc.js',
  'prettierrc.js.x': '.prettierrc.js',
  stylelintrc: '.stylelintrc',
  'commitlint.config.js.x': 'commitlint.config.js',
  'lint-staged.config.js.x': 'lint-staged.config.js'
};
//# sourceMappingURL=updateConfigFiles.js.map