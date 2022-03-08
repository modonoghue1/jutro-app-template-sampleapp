"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkFolderStructure = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

var _glob = require("glob");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _last = _interopRequireDefault(require("lodash/last"));

var _walkSync = _interopRequireDefault(require("walk-sync"));

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

const normalizePath = path => path.split(_path.sep).join(_path.posix.sep);

const defaultPathWarning = path => `Your application is missing the path ${path}`;

const strictPathWarning = path => `Your application contains a path which is not valid: ${path}`;

const collectPaths = (item, parentPath, paths) => {
  const _item$children = item.children,
        children = _item$children === void 0 ? [] : _item$children,
        path = item.path;
  const fullPath = normalizePath(parentPath ? (0, _path.join)(parentPath, path) : path);
  return [...paths, fullPath, ...children.flatMap(child => collectPaths(child, fullPath, paths))];
};

const verifyStrictPaths = (path, children, ignored, shouldMatchDirectories) => {
  const allPaths = (0, _walkSync.default)(path, {
    includeBasePath: true,
    ignore: ignored,
    directories: shouldMatchDirectories
  });
  const childPaths = children.flatMap(child => collectPaths(child, path, []));
  const additionalPaths = allPaths.filter(additionalPath => !childPaths.some(child => child.startsWith(additionalPath)));

  if (additionalPaths.length > 0) {
    return additionalPaths.map(strictPathWarning);
  }

  return false;
};

const processPaths = ({
  item,
  parentPath = '',
  folderPath
}) => {
  const path = item.path,
        message = item.message,
        _item$children2 = item.children,
        children = _item$children2 === void 0 ? [] : _item$children2,
        pattern = item.pattern,
        strict = item.strict,
        _item$ignored = item.ignored,
        ignored = _item$ignored === void 0 ? [] : _item$ignored,
        _item$shouldMatchDire = item.shouldMatchDirectories,
        shouldMatchDirectories = _item$shouldMatchDire === void 0 ? false : _item$shouldMatchDire;

  if (pattern) {
    const files = (0, _glob.sync)((0, _path.resolve)(folderPath, parentPath, pattern), {
      matchBase: true
    });

    if ((0, _isEmpty.default)(files)) {
      (0, _logging.logYellow)(`No matches found for pattern: ${pattern}`);
      return [];
    }

    return (0, _flatten.default)(files.flatMap(file => {
      if (strict) {
        const errors = verifyStrictPaths((0, _path.resolve)(folderPath, parentPath, file), children, ignored, shouldMatchDirectories);
        if (errors) return errors;
      }

      return children.map(child => processPaths({
        item: child,
        parentPath: file,
        folderPath
      }));
    }));
  }

  const fullPath = parentPath ? (0, _path.join)(parentPath, path) : path;
  const pathMessage = message || defaultPathWarning(fullPath);

  const isPathResolved = _fs.default.existsSync((0, _path.resolve)(folderPath, fullPath));

  if (strict) {
    const errors = verifyStrictPaths((0, _path.resolve)(folderPath, fullPath), children, ignored, shouldMatchDirectories);
    if (errors) return errors;
  }

  const errorsInChildren = (0, _flatten.default)(children.map(child => processPaths({
    item: child,
    parentPath: fullPath,
    folderPath
  })));
  return isPathResolved ? errorsInChildren : [pathMessage, ...errorsInChildren];
};

const checkFolderStructure = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Checking application folder structure...',
  logFileName: 'check-folder-structure-cli.log',
  name: 'runCheckFolderStructure'
}).addStep(async ({
  currentVersion,
  folderTemplatePath,
  folderPath = process.cwd(),
  errorLevel = 'error',
  cliExtensionProps = {},
  snapshots
}) => {
  var _folderStructure;

  const customFolderTemplate = cliExtensionProps.customFolderTemplate;
  let folderStructure = customFolderTemplate;

  if (folderTemplatePath) {
    folderStructure = JSON.parse(_fs.default.readFileSync(folderTemplatePath, 'utf8'));
  } else if (!customFolderTemplate) {
    const snapshot = (0, _last.default)((0, _cliSnapshotTools.filterSnapshotsByVersion)(snapshots, currentVersion));
    folderStructure = snapshot.folderStructure;
  }

  const errors = (_folderStructure = folderStructure) === null || _folderStructure === void 0 ? void 0 : _folderStructure.flatMap(item => processPaths({
    item,
    folderPath
  }));

  if (!(0, _isEmpty.default)(errors)) {
    const shouldWarn = errorLevel === 'warn';
    errors.forEach(shouldWarn ? _logging.logYellow : _logging.logRed);
    const errorMessage = `Folder structure validation check FAILED.`;

    if (shouldWarn) {
      (0, _logging.logYellowAnnouncement)(errorMessage);
      return {
        errors
      };
    }

    throw Error(errorMessage);
  }

  return {
    successLogMessage: 'Folder structure check PASSED.'
  };
});
exports.checkFolderStructure = checkFolderStructure;
//# sourceMappingURL=check-folder-structure.js.map