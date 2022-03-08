const fs = require('fs');
const path = require('path');
const fileUtils = require('../fileOperations');

const reportObject = {
    testSuite: 'Visual',
    tests: [],
    id: 'Jutro Visual Report',
};
const staticReportFiles = '../../static_report_files';
const dataJsonFile = 'data.js';
const indexHtmlFile = 'index.html';
const configJSFile = 'config.js';
const reportImage = 'a96f14595379b7c348d66e115ec65a93.png';
const encoding = 'utf8';

const joinPathWithCWD = file => fileUtils.joinPath(__dirname, file);
const pathToStaticReportFiles = file =>
    fileUtils.joinPath(staticReportFiles, file);
const indexHtmlFilePath = joinPathWithCWD(
    pathToStaticReportFiles(indexHtmlFile)
);
const reportImageFilePath = joinPathWithCWD(
    pathToStaticReportFiles(reportImage)
);
const dataFilePath = path.resolve(dataJsonFile);

const combineReports = pathConfig => {
    const htmlReportPath = `${pathConfig.visualArtifactLocation}/${pathConfig.backstopJSHTMLReportLocation}`;

    const visualArtifactLocation = 'tests/reports/visual';
    const resultsDirectory = path.resolve(
        `${visualArtifactLocation}/testResults`
    );

    // preparing combined result file by merging all individual result files
    fs.readdirSync(resultsDirectory).forEach(file => {
        const content = fileUtils.readFileSync(
            `${resultsDirectory}/${file}`,
            encoding
        );
        reportObject.tests.push(JSON.parse(content));
    });
    fileUtils.appendFileSync(dataFilePath, 'const data =', encoding);
    fileUtils.appendFileSync(
        dataFilePath,
        JSON.stringify(reportObject),
        encoding
    );
    fileUtils.moveFileSync(
        dataFilePath,
        fileUtils.joinPath(htmlReportPath, dataJsonFile)
    );

    // copying static file to be used by backstopjs report
    fileUtils.copyFileSync(
        indexHtmlFilePath,
        fileUtils.joinPath(htmlReportPath, indexHtmlFile)
    );
    fileUtils.copyFileSync(
        reportImageFilePath,
        fileUtils.joinPath(htmlReportPath, reportImage)
    );
    // removing file from default backstop report
    fileUtils.removeFileSync(fileUtils.joinPath(htmlReportPath, configJSFile));
};

module.exports = { combineReports };
