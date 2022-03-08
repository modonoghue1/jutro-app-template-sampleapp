"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnusedDependencies = void 0;

var _path = _interopRequireDefault(require("path"));

var _depcheck = _interopRequireDefault(require("depcheck"));

const getUnusedDependencies = async (packagePath, ignoredDependencies = '') => {
  let result = {};
  const options = {
    ignoreMatches: ['C:', '@jutro/auth', '@jutro/translations', '@jutro/theme', '@jutro/build-tools', '@jutro/cli', '@jutro/validation', '@jutro/wizard-next', '@jutro/datatable', '@jutro/layout', '@jutro/router', '@gtui/gt-ui-framework', 'testcafe', 'gherkin-testcafe', 'react', 'react-dom', 'react-intl', 'react-router-dom', 'react-app-rewired', 'react-docgen-typescript-loader', 'react-scripts', 'react-test-renderer', 'prop-types', 'stylelint*', 'json5*', 'jest*', 'node-sass*', 'eslint*', 'cross-env', 'core-js', '@jutro/e2e-tests', '@commitlint/*', 'babel-*', 'fs-extra', 'postcss-normalize', '@types/*', '@typescript-eslint/*', 'enzyme*', 'puppeteer', 'lint-staged', 'npm-run-all', 'ts-*', 'typescript', 'husky', 'lerna', 'babel-plugin-react-intl', '@hot-loader/react-dom', 'rimraf', '@formatjs/cli', 'symlink-dir', ...ignoredDependencies.split(',')],
    specials: [_depcheck.default.special.eslint, _depcheck.default.special.webpack]
  };
  await (0, _depcheck.default)(_path.default.resolve(process.cwd(), packagePath), options, unused => {
    result = unused;
  });
  return {
    path: packagePath,
    invalidDirs: result.invalidDirs,
    invalidFiles: result.invalidFiles,
    missing: result.missing,
    dependencies: result.dependencies,
    devDependencies: result.devDependencies
  };
};

exports.getUnusedDependencies = getUnusedDependencies;
//# sourceMappingURL=getUnusedDependencies.js.map