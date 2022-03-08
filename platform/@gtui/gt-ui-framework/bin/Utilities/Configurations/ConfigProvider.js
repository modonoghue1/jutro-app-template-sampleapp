"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConfig = setConfig;
exports.getConfig = getConfig;
exports.setPathConfig = setPathConfig;
var CONFIG_KEY = Symbol.for('gtui.configProvider');
var PATH_CONFIG_KEY = Symbol.for('PATH_CONFIG');

if (!Object.getOwnPropertySymbols(global).includes(CONFIG_KEY)) {
  global[CONFIG_KEY] = {
    [PATH_CONFIG_KEY]: {}
  };
}

var config = global[CONFIG_KEY];

function setConfig(configKey, configValue) {
  config[configKey] = configValue;
}

function getConfig(configKey) {
  return config[configKey];
}

function setPathConfig(snapshotLocation, visualArtifactLocation) {
  var pathValue = {
    baseSnapshotLocation: "".concat(snapshotLocation),
    visualArtifactLocation: "".concat(visualArtifactLocation)
  };
  setConfig(PATH_CONFIG_KEY, pathValue);
}