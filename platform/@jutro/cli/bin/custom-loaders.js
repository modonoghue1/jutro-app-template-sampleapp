"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCliExtensionProps = exports.loadCliExtension = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/interopRequireWildcard"));

var _path = require("path");

var _camelCase = _interopRequireDefault(require("lodash/camelCase"));

const CLI_EXTENSION_PROPS = ['migration-snapshots', 'migration-snapshots-path', 'custom-folder-template', 'custom-folder-template-path'];

const fromRoot = (...parts) => (0, _path.resolve)(process.cwd(), ...parts);

const loadCliExtension = async () => {
  const config = await Promise.resolve(`${fromRoot('cli.extension.js')}`).then(s => (0, _interopRequireWildcard2.default)(require(s))).catch(() => ({}));
  return config.default;
};

exports.loadCliExtension = loadCliExtension;

const importConfigProp = async (path, propName) => {
  const fullPath = fromRoot(path);
  const loaded = await Promise.resolve(`${fullPath}`).then(s => (0, _interopRequireWildcard2.default)(require(s))).catch(() => {
    throw new Error(`[jutro-cli]: Failed to load resources for ${propName}. ${propName} in cli.extension.js is not set correctly, check your path: ${fullPath}`);
  });
  return loaded.default;
};

const getCliExtensionProps = async () => {
  const cliExtensionProps = {};
  const config = await loadCliExtension();

  if (!config) {
    return {};
  }

  for (const propName of CLI_EXTENSION_PROPS) {
    if (config[propName] && propName.endsWith('-path')) {
      const newPropKey = (0, _camelCase.default)(propName.slice(0, -5));
      cliExtensionProps[newPropKey] = config[propName] ? await importConfigProp(config[propName], propName) : undefined;
    } else if (config[propName]) {
      const newPropKey = (0, _camelCase.default)(propName);
      cliExtensionProps[newPropKey] = config[propName];
    }
  }

  Object.keys(cliExtensionProps).forEach(key => {
    console.log(`jutro-cli: loaded with custom property for "${key}"`);
  });
  return cliExtensionProps;
};

exports.getCliExtensionProps = getCliExtensionProps;
//# sourceMappingURL=custom-loaders.js.map