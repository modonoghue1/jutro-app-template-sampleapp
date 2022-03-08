#!/usr/bin/env node
const path = require('path');
const minimist = require('minimist');
const backstop = require('backstopjs');
const combineReports = require('../utils/report_utils/combineReports');
const copySnapshotForReport = require('../utils/report_utils/copySnapshotForReport');
const {
    BACKSTOP_CONFIG,
    PATH_CONFIG,
    setConfig,
    getConfig,
} = require('../configs');

const createPathConfig = require('../configs/path.conf.js');
const createBackstopConfig = require('../configs/backstop.js');

const {
    pathConfig: pathConfigFile,
    backstopConfig: backstopConfigFile,
    testsFolder = './tests',
    reportsFolder = './tests/reports/visual',
} = minimist(process.argv.slice(2));

if (pathConfigFile) {
    setConfig(PATH_CONFIG, require(path.join(process.cwd(), pathConfigFile)));
} else {
    setConfig(PATH_CONFIG, createPathConfig(testsFolder, reportsFolder));
}

if (backstopConfigFile) {
    setConfig(
        BACKSTOP_CONFIG,
        require(path.join(process.cwd(), backstopConfigFile))
    );
} else {
    setConfig(BACKSTOP_CONFIG, createBackstopConfig(reportsFolder));
}

backstop('test', {
    config: getConfig(BACKSTOP_CONFIG),
})
    .then(() => {
        const pathConfig = getConfig(PATH_CONFIG);
        copySnapshotForReport.copySnapshotForReport(pathConfig);
        combineReports.combineReports(pathConfig);
    })
    .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Backstop.js test command failed', error);
        process.exit(1);
    });
