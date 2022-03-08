#! /usr/bin/env node
const report = require('multiple-cucumber-html-reporter');
const path = require('path');
const minimist = require('minimist');

const reportGenerationTime = new Date().toISOString();

const {
    projectName = path.basename(__dirname),
    projectVersion = process.env.npm_package_version,
    reportName = 'BDD Report',
    jsonDir = 'tests/reports/bdd',
    reportPath = 'tests/reports/bdd',
    openReportInBrowser = false,
    disableLog = true,
    displayDuration = true,
    durationInMS = true,
} = minimist(process.argv.slice(2));

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
        data: [
            { label: 'Project', value: `${projectName}` },
            { label: 'Release', value: `${projectVersion}` },
            {
                label: 'Report Generation Time',
                value: `${reportGenerationTime}`,
            },
        ],
    },
});
