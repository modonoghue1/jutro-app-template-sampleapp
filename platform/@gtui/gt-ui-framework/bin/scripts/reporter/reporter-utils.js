#! /usr/bin/env node
"use strict";

var report = require('multiple-cucumber-html-reporter');

var reportGenerationTime = new Date().toISOString();

function generateBddReport(projectName, projectVersion, reportName, jsonDir, reportPath, openReportInBrowser, disableLog, displayDuration, durationInMS) {
  report.generate({
    reportName,
    jsonDir,
    reportPath,
    openReportInBrowser,
    disableLog,
    displayDuration,
    durationInMS,
    customData: {
      title: 'Run info',
      data: [{
        label: 'Project',
        value: projectName
      }, {
        label: 'Release',
        value: projectVersion
      }, {
        label: 'Report Generation Time',
        value: "".concat(reportGenerationTime)
      }]
    }
  });
}

module.exports = {
  generateBddReport
};