#! /usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var glob = require('glob');

var testCafeInterface = require('gherkin-testcafe');

var minimist = require('minimist');

var {
  runTestCafe,
  closeProcessWithErrorIfFailsExist
} = require('./utils/runner-utils');

var {
  getValueForConfigProperty,
  getValueForConfigPropertyOrDefault
} = require('../../Utilities/Configurations/ConfigUtils');

var runnerDefaultValues = require('./utils/runner-params-default-values');

var {
  generateBddReport
} = require('../reporter/reporter-utils');

var testSuiteLocation = 'config/';

function getFeatureLocationPattern() {
  var featureLocationPattern = getValueForConfigProperty('feature_location_pattern'); // ToDo: Deprecate and remove eventually (for backwards-compatibility with Cortina)

  if (!featureLocationPattern) {
    featureLocationPattern = getValueForConfigProperty('feature-location-pattern');
  }

  return featureLocationPattern ? featureLocationPattern : 'tests/**/*.feature';
}

function getGlueLocationPattern() {
  var glueLocationPattern = getValueForConfigProperty('glue_location_pattern'); // ToDo: Deprecate and remove eventually (for backwards-compatibility with Cortina)

  if (!glueLocationPattern) {
    glueLocationPattern = getValueForConfigProperty('glue-location-pattern');
  }

  return glueLocationPattern ? glueLocationPattern : 'tests/**/steps/**/*.js';
}

function runTests() {
  return _runTests.apply(this, arguments);
}

function _runTests() {
  _runTests = (0, _asyncToGenerator2.default)(function* () {
    var failedCount = yield runTestCafe([args.glue, args.feature], testSuiteLocation, args.reporter, args, testCafeInterface);
    generateBddReport(args.projectName, args.projectVersion, args.reportName, args.reporterOutput, args.reporterOutput, args.openReportInBrowser, args.disableLog, args.displayDuration, args.durationInMS);
    closeProcessWithErrorIfFailsExist(failedCount);
  });
  return _runTests.apply(this, arguments);
}

var testOptionsMap = {
  boolean: ['headless', 'quarantineMode', 'liveMode', 'openReportInBrowser', 'disableLog', 'displayDuration'],
  default: {
    testSuite: 'None',
    cucumberTags: '~@Ignore',
    glue: getGlueLocationPattern(),
    feature: getFeatureLocationPattern(),
    reporter: runnerDefaultValues.reporter,
    reporterOutput: getValueForConfigPropertyOrDefault(runnerDefaultValues.reporterOutputBdd, 'reporterOutputBdd'),
    screenshotsPathPattern: runnerDefaultValues.screenshotsPathPattern,
    videoPathPattern: runnerDefaultValues.videoPathPattern,
    clientScripts: runnerDefaultValues.clientScripts,
    envVarsPath: runnerDefaultValues.envVarsPath,
    quarantineMode: runnerDefaultValues.quarantineMode,
    concurrency: runnerDefaultValues.concurrency,
    browser: runnerDefaultValues.browser,
    headless: runnerDefaultValues.headless,
    selectorTimeout: runnerDefaultValues.selectorTimeout,
    assertionTimeout: runnerDefaultValues.assertionTimeout,
    pageLoadTimeout: runnerDefaultValues.pageLoadTimeout,
    liveMode: runnerDefaultValues.liveMode,
    projectName: getValueForConfigPropertyOrDefault(runnerDefaultValues.projectName, 'projectName'),
    projectVersion: getValueForConfigPropertyOrDefault(runnerDefaultValues.projectVersion, 'projectVersion'),
    reportName: getValueForConfigPropertyOrDefault(runnerDefaultValues.reportName, 'reportName'),
    openReportInBrowser: getValueForConfigPropertyOrDefault(runnerDefaultValues.openReportInBrowser, 'openReportInBrowser'),
    disableLog: getValueForConfigPropertyOrDefault(runnerDefaultValues.disableLog, 'disableLog'),
    displayDuration: getValueForConfigPropertyOrDefault(runnerDefaultValues.displayDuration, 'displayDuration'),
    durationInMS: getValueForConfigPropertyOrDefault(runnerDefaultValues.durationInMS, 'durationInMS')
  }
};
var args = minimist(process.argv.slice(2), testOptionsMap);

if (args.feature && glob.sync(args.feature).length === 0) {
  console.error("Error: Could not find the test files that match the following patterns:");
  console.error(args.feature);
  process.exit(1);
}

runTests();