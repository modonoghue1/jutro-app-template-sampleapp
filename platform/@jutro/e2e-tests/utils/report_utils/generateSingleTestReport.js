const path = require('path');
const fileUtils = require('../fileOperations');

const generateSingleTestReport = (
    testScreenShotName,
    diffFilename,
    metadata
) => {
    const report = {};
    const pair = {};

    const testLabel = testScreenShotName.substring(
        0,
        testScreenShotName.lastIndexOf('-')
    );

    if (!metadata) {
        // eslint-disable-next-line no-param-reassign
        metadata = {
            misMatchPercentage: 1,
            analysisTime: 0,
        };
    }
    if (!diffFilename && metadata.misMatchPercentage > 0) {
        // eslint-disable-next-line no-param-reassign
        testScreenShotName = 'error.png';
    }

    const diff = {
        dimensionDifference: {
            width: 0,
            heigh: 0,
        },
        misMatchPercentage: metadata.misMatchPercentage,
        rawMisMatchPercentage: metadata.rawMisMatchPercentage,
        analysisTime: metadata.analysisTime,
    };
    pair.diff = diff;
    pair.reference = `../baseImages/${testScreenShotName}`;
    pair.test = `../actualImages/${testScreenShotName}`;
    pair.diffImage = `../diffImages/${diffFilename}`;
    pair.fileName = testScreenShotName;
    pair.label = testLabel;
    pair.misMatchThreshold = 0;
    report.pair = pair;
    report.status = pair.diff.rawMisMatchPercentage !== 0 ? 'fail' : 'pass';

    const visualArtifactLocation = 'tests/reports/visual';

    const tmpReportFolder = path.resolve(
        `./${visualArtifactLocation}/testResults`
    );

    const testPairFileName = fileUtils.joinPath(
        tmpReportFolder,
        `${testLabel}.json`
    );

    fileUtils.createFolderIfNotExist(tmpReportFolder);
    fileUtils.writeFileSync(testPairFileName, report);
};

module.exports = { generateSingleTestReport };
