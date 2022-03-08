"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyPatch = void 0;

var _child_process = require("child_process");

var _path = require("path");

var _fs = require("fs");

var _logging = require("../logging");

const getGitRoot = packagePath => {
  const cwd = packagePath === 'package.json' ? process.cwd() : packagePath.replace('package.json', '');
  const cwdGit = (0, _path.resolve)(cwd, '.git');
  return (0, _fs.existsSync)(cwdGit) ? cwd : getGitRoot((0, _path.resolve)(cwd, '..'));
};

const applyPatch = (patchPath, packagePath) => {
  const options = ['--verbose', '--no-index', '--reject', '--unsafe-paths', '--ignore-space-change', '--ignore-whitespace', '--whitespace=fix'];

  try {
    const cwd = getGitRoot(packagePath);
    (0, _child_process.execSync)(`git apply ${options.join(' ')} --directory ${cwd} ${patchPath}`, {
      cwd
    });
  } catch (e) {
    (0, _logging.logYellow)('patch did not apply cleanly - there is likely additional logging above.');
  }
};

exports.applyPatch = applyPatch;
//# sourceMappingURL=applyPatch.js.map