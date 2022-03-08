"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCommitHooks = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _has = _interopRequireDefault(require("lodash/has"));

var _set = _interopRequireDefault(require("lodash/set"));

var _util = require("util");

var _pipelines = require("../../entities/pipelines");

var _prompts = require("../../entities/prompts");

const readFileAsync = (0, _util.promisify)(_fs.default.readFile);
const writeFileAsync = (0, _util.promisify)(_fs.default.writeFile);
const updateCommitHooks = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Updating commit hooks...',
  logFileName: 'jutro-update-commit-hooks-cli.log'
}).addStep(async ({
  basePath = './',
  fromCi
}) => {
  const husky = {};
  const data = await readFileAsync(_path.default.join(basePath, 'package.json'));
  let lintingHooksEnabled = true;
  let commitMessageHookEnabled = true;
  const json = JSON.parse(data);

  if ((0, _has.default)(json, 'husky.hooks')) {
    lintingHooksEnabled = (0, _has.default)(json, 'husky.hooks.pre-commit');
    commitMessageHookEnabled = (0, _has.default)(json, 'husky.hooks.commit-msg');
  }

  const commitHooksQuestions = [{
    type: 'confirm',
    name: 'enableLintCommitHooks',
    message: 'Enable ESLint, Prettier, and stylelint commit hooks?',
    initial: lintingHooksEnabled
  }, {
    type: 'confirm',
    name: 'enableCommitMessageLintHook',
    message: 'Enable commit message linting hook?',
    initial: commitMessageHookEnabled
  }];

  const _await$prompt = await (0, _prompts.prompt)(commitHooksQuestions, fromCi),
        enableLintCommitHooks = _await$prompt.enableLintCommitHooks,
        enableCommitMessageLintHook = _await$prompt.enableCommitMessageLintHook;

  const isUpdatingConfig = enableLintCommitHooks || enableCommitMessageLintHook;

  if (enableLintCommitHooks) {
    (0, _set.default)(husky, 'hooks.pre-commit', 'lint-staged');
  }

  if (enableCommitMessageLintHook) {
    (0, _set.default)(husky, 'hooks.commit-msg', 'commitlint -e');
  }

  (0, _set.default)(json, 'husky', husky);
  await writeFileAsync(_path.default.join(basePath, 'package.json'), JSON.stringify(json, null, 2));
  return { ...husky,
    successLogMessage: isUpdatingConfig ? 'Your commit hooks configuration has been updated.' : 'No change was applied to the commit hooks configuration.'
  };
});
exports.updateCommitHooks = updateCommitHooks;
//# sourceMappingURL=update-commit-hooks.js.map