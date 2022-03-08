"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runCodemodsOnFiles = void 0;

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = require("fs-extra");

var _jscodeshift = _interopRequireDefault(require("jscodeshift"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var _logging = require("../logging");

const fileMatchesPattern = (filePath, pattern) => (0, _minimatch.default)(filePath, pattern);

const transform = (source, sourcePath, {
  migration
}) => {
  let transformedSource = source;

  const skipExcluded = ({
    exclude
  }) => !(exclude && fileMatchesPattern(sourcePath, exclude));

  const skipIncluded = ({
    include
  }) => !include || fileMatchesPattern(sourcePath, include);

  const filteredMigrations = migration.filter(skipExcluded).filter(skipIncluded);
  filteredMigrations.forEach(({
    execute,
    description
  }) => {
    try {
      transformedSource = execute((0, _jscodeshift.default)(transformedSource), {
        jscodeshift: _jscodeshift.default
      }).toSource({
        quote: 'single'
      });
    } catch (e) {
      (0, _logging.log)(`Codemod ${description} failed to execute: ${e}`);
    }
  });
  return transformedSource;
};

const runCodemodsOnSingleFile = async (codemods, file) => {
  const sourcePath = _path.default.resolve(process.cwd(), file);

  const source = (0, _fsExtra.readFileSync)(sourcePath).toString();
  const transformed = await transform(source, sourcePath, codemods);
  await (0, _fsExtra.writeFileSync)(file, transformed);
};

const runCodemodsOnFiles = async (codemods, files) => {
  const codeModsToRun = (0, _isArray.default)(codemods) ? codemods[0] : codemods;
  files.forEach(file => runCodemodsOnSingleFile(codeModsToRun, file));
};

exports.runCodemodsOnFiles = runCodemodsOnFiles;
//# sourceMappingURL=runCodemodsOnFiles.js.map