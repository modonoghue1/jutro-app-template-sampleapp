#! /usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var testCafeInterface = require('testcafe');

var minimist = require('minimist');

var fse = require('fs-extra');

var {
  splitCommaSeparatedValueStringIntoArray,
  runTestCafe,
  closeProcessWithErrorIfFailsExist
} = require('./utils/runner-utils');

var {
  setPathConfig
} = require("../../Utilities/Configurations/ConfigProvider");

var {
  getValueForConfigProperty
} = require('../../Utilities/Configurations/ConfigUtils');

var {
  getValueForConfigPropertyOrDefault
} = require('../../Utilities/Configurations/ConfigUtils');

var runnerDefaultValues = require('./utils/runner-params-default-values');

function configureVisualTestsPath(visualTestsSnapshotLocation, reporterOutput) {
  var snapshotLocation = visualTestsSnapshotLocation;
  var visualArtifactLocation = reporterOutput;
  setPathConfig(snapshotLocation, visualArtifactLocation);
  fse.mkdirsSync(visualArtifactLocation);
}

function getDevTestLocationPattern() {
  var devtestLocationPattern = getValueForConfigProperty('devtest_location_pattern'); // ToDo: Deprecate and remove eventually (for backwards-compatibility with Cortina)

  if (!devtestLocationPattern) {
    devtestLocationPattern = getValueForConfigProperty('dev-test-location-pattern');
  }

  return devtestLocationPattern ? devtestLocationPattern : 'tests/**/devTests/**/*.js';
}

function runTests() {
  return _runTests.apply(this, arguments);
}

function _runTests() {
  _runTests = (0, _asyncToGenerator2.default)(function* () {
    var failedCount = yield runTestCafe(testLocations, '', args.reporter, args, testCafeInterface);
    closeProcessWithErrorIfFailsExist(failedCount);
  });
  return _runTests.apply(this, arguments);
}

var testOptionsMap = {
  boolean: ['headless', 'quarantineMode', 'liveMode', 'osCompatibility'],
  default: {
    tests: getDevTestLocationPattern(),
    envVarsPath: runnerDefaultValues.envVarsPath,
    quarantineMode: runnerDefaultValues.quarantineMode,
    concurrency: runnerDefaultValues.concurrency,
    browser: runnerDefaultValues.browser,
    reporter: runnerDefaultValues.reporter,
    reporterOutput: getValueForConfigPropertyOrDefault(runnerDefaultValues.reporterOutputNonBdd, 'reporterOutputNonBdd'),
    screenshotsPathPattern: runnerDefaultValues.screenshotsPathPattern,
    videoPathPattern: runnerDefaultValues.videoPathPattern,
    clientScripts: runnerDefaultValues.clientScripts,
    headless: runnerDefaultValues.headless,
    selectorTimeout: runnerDefaultValues.selectorTimeout,
    assertionTimeout: runnerDefaultValues.assertionTimeout,
    pageLoadTimeout: runnerDefaultValues.pageLoadTimeout,
    includeFixtures: undefined,
    excludeFixtures: undefined,
    includeTests: undefined,
    excludeTests: undefined,
    liveMode: runnerDefaultValues.liveMode,
    visualTestsSnapshotLocation: undefined,
    osCompatibility: runnerDefaultValues.osCompatibility
  }
};
var args = minimist(process.argv.slice(2), testOptionsMap);
var testLocations = splitCommaSeparatedValueStringIntoArray(args.tests);
configureVisualTestsPath(args.visualTestsSnapshotLocation, args.reporterOutput);
runTests();