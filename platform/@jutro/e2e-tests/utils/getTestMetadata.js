const fileUtils = require('./fileOperations');

/**
 * Searches for the metadata of the test
 *
 * @param {object} t testcafe
 * @returns {object} test metadata
 */
async function getTestMetadata(t) {
    const testName = t.testRun.test.name;
    const regex = / /gi;
    const formattedTestName = testName.replace(regex, '_');
    const testFilePath = t.testRun.test.testFile.filename;
    const testFileName = fileUtils.getPathBaseName(testFilePath, '.js');
    const testFileFolder = fileUtils.getPathDirName(testFilePath);
    const browser = t.testRun.browserConnection.browserInfo.providerName;
    const testScreenShotName = `${formattedTestName}-${browser}.png`;
    return {
        testScreenShotName,
        testFileFolder,
        testFileName,
        testName: formattedTestName,
        browser,
    };
}

module.exports = { getTestMetadata };
