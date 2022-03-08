"use strict";

var fs = require('fs');

var fse = require('fs-extra');

var minimist = require('minimist');

var dotEnv = require('dotenv');

var runnerDefaultValues = require("../../scripts/test-runners/utils/runner-params-default-values");

var JSON5 = require('json5');

var jsonConfigFile = 'config/config.json';
var jsonAppConfig = readJsonConfigFile();

function getValueForConfigProperty(configKey) {
  loadEnvironmentVars();

  if (configKey in process.env) {
    return process.env[configKey];
  } else if (jsonAppConfig !== undefined && configKey in jsonAppConfig) {
    return jsonAppConfig[configKey];
  } else {
    return undefined;
  }
}

function getValueForConfigPropertyOrDefault(defaultValue, configKey) {
  var valueFoundForConfig = getValueForConfigProperty(configKey);
  return valueFoundForConfig ? valueFoundForConfig : defaultValue;
}

function readJsonConfigFile() {
  console.log('Reading configuration parameters from ' + jsonConfigFile);
  return readJsonFile(jsonConfigFile);
}

function readJsonFile(filename) {
  if (fs.existsSync(filename)) {
    return fse.readJsonSync(filename);
  } else {
    console.error('Failed to read JSON file: ' + filename);
    return undefined;
  }
}

function readJson5File(filename) {
  var jsonData = fs.readFileSync(filename);
  return JSON5.parse(jsonData.toString());
}

function loadEnvironmentVars() {
  var envVarsFile = minimist(process.argv).envVarsPath !== undefined ? minimist(process.argv).envVarsPath : runnerDefaultValues.envVarsPath;
  dotEnv.config({
    path: envVarsFile
  });
}

module.exports = {
  getValueForConfigProperty,
  readJsonConfigFile,
  readJson5File,
  loadEnvironmentVars,
  getValueForConfigPropertyOrDefault
};