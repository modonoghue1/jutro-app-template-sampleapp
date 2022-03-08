#! /usr/bin/env node
"use strict";

var minimist = require('minimist');

var {
  generateBddReport
} = require('./reporter-utils');

var {
  getValueForConfigPropertyOrDefault
} = require('../../Utilities/Configurations/ConfigUtils');

var runnerDefaultValues = require('../test-runners/utils/runner-params-default-values');

var {
  projectName = getValueForConfigPropertyOrDefault(runnerDefaultValues.projectName, 'projectName'),
  projectVersion = getValueForConfigPropertyOrDefault(runnerDefaultValues.projectVersion, 'projectVersion'),
  reporterOutput = getValueForConfigPropertyOrDefault(runnerDefaultValues.reporterOutputBdd, 'reporterOutputBdd'),
  reportName = getValueForConfigPropertyOrDefault(runnerDefaultValues.reportName, 'reportName'),
  openReportInBrowser = getValueForConfigPropertyOrDefault(runnerDefaultValues.openReportInBrowser, 'openReportInBrowser'),
  disableLog = getValueForConfigPropertyOrDefault(runnerDefaultValues.disableLog, 'disableLog'),
  displayDuration = getValueForConfigPropertyOrDefault(runnerDefaultValues.displayDuration, 'displayDuration'),
  durationInMS = getValueForConfigPropertyOrDefault(runnerDefaultValues.durationInMS, 'durationInMS')
} = minimist(process.argv.slice(2));
generateBddReport(projectName, projectVersion, reportName, reporterOutput, reporterOutput, openReportInBrowser, disableLog, displayDuration, durationInMS);