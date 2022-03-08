"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDependencies = void 0;

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _forEach = _interopRequireDefault(require("lodash/forEach"));

var _mergeWith = _interopRequireDefault(require("lodash/mergeWith"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _appPackage = require("../../entities/app-package");

var _pipelines = require("../../entities/pipelines");

var _logging = require("../../entities/logging");

const getPathRelativeTo = packagesPath => absolutePath => absolutePath.substring(absolutePath.indexOf(packagesPath) + packagesPath.length + 1);

const formatSourcePaths = (relativePath, paths) => paths.map(getPathRelativeTo(relativePath)).join(', ');

const formatErrors = packagesPaths => data => {
  const result = [];
  const invalidDirs = data.invalidDirs,
        invalidFiles = data.invalidFiles;

  if (!(0, _isEmpty.default)(invalidDirs) || !(0, _isEmpty.default)(invalidFiles)) {
    result.push(`Encountered errors inside ${getPathRelativeTo(packagesPaths)(data.path)}:`);
    Object.entries(invalidDirs).forEach(([key, val]) => result.push(`--> directory: '${key}' -- error: ${val}`));
    Object.entries(invalidFiles).forEach(([key, val]) => result.push(`--> file: '${key}' -- error: ${val}`));
  }

  return result;
};

const formatMessagesForUnusedDependencies = packagePath => data => {
  const result = [];

  if (data.dependencies.length > 0 || data.devDependencies.length > 0) {
    result.push(`Found unused module(s) inside ${getPathRelativeTo(packagePath)(data.path)}:`);
    data.dependencies.forEach(d => result.push(`--> dependency: '${d}'`));
    data.devDependencies.forEach(d => result.push(`--> devDependency: '${d}'`));
  }

  return result;
};

const checkDependencies = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Dependencies declarations check start...',
  logFileName: 'check-dependencies-cli.log'
}).addStep(async ({
  packagesPath = './',
  ignoredPackages = [],
  ignoredDependencies = '',
  subPath = ''
}) => {
  const packages = _glob.default.sync(`${packagesPath}${subPath}`, {
    ignore: ['./packages/jutro-toolset-*']
  }).filter(packageToFilter => !ignoredPackages.includes(packageToFilter));

  const rawReport = [];

  for (let index = 0; index < packages.length; index += 1) {
    const result = await (0, _appPackage.getUnusedDependencies)(packages[index], ignoredDependencies);
    rawReport.push(result);
  }

  return rawReport;
}).addStep(({
  toBeIgnored = ['envConfig', 'envBaseConfig'],
  packagesPath = './'
}, rawReport) => {
  const customizer = (objValue, srcValue) => {
    if ((0, _isArray.default)(objValue)) {
      return objValue.concat(srcValue);
    }
  };

  const missingDependeciesData = {};
  rawReport.forEach(r => (0, _mergeWith.default)(missingDependeciesData, r.missing, customizer));
  (0, _forEach.default)(toBeIgnored, packagePath => delete missingDependeciesData[packagePath]);
  return {
    missing: missingDependeciesData,
    unused: (0, _flatten.default)(rawReport.map(formatMessagesForUnusedDependencies(packagesPath))),
    errors: (0, _flatten.default)(rawReport.map(formatErrors(packagesPath)))
  };
}).addStep(async ({
  packagesPath = './'
}, data) => {
  const duplicateDependecies = (0, _appPackage.getDuplicateDependencies)(_path.default.join(packagesPath, 'package.json'));

  if (duplicateDependecies.length !== 0) {
    (0, _logging.log)(`Found duplicate dependencies:`);
    duplicateDependecies.forEach(([type, packageName]) => (0, _logging.log)(`--> ${type}: '${packageName}'`));
  }

  return { ...data,
    duplicateDependecies
  };
}).addStep(async ({
  packagesPath = './'
}, data) => {
  const errors = data.errors,
        missing = data.missing,
        unused = data.unused,
        duplicateDependecies = data.duplicateDependecies;
  const anyErrors = errors.length > 0;
  const anyMissing = Object.keys(missing).length > 0;
  const anyUnused = unused.length > 0;
  const anyDuplicateDependecies = duplicateDependecies.length > 0;
  const errorsFound = anyErrors || anyMissing || anyUnused || anyDuplicateDependecies;

  if (!errorsFound) {
    return { ...data,
      successLogMessage: 'Dependency declarations check PASSED.'
    };
  }

  if (anyErrors) errors.forEach(_logging.log);

  if (anyMissing) {
    (0, _forEach.default)(missing, (sourceFiles, missingDependencyDeclaration) => {
      (0, _logging.log)(`Missing dependency declaration on '${missingDependencyDeclaration}' in ${formatSourcePaths(packagesPath, sourceFiles)}`);
    });
  }

  if (anyUnused) unused.forEach(_logging.log);
  throw Error(`Dependency declarations check FAILED.`);
});
exports.checkDependencies = checkDependencies;
//# sourceMappingURL=check-dependencies.js.map