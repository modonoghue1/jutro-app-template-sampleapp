const { takeScreenShot } = require('./utils/takeScreenShot');
const { getTestMetadata } = require('./utils/getTestMetadata');
const { matchImageSnapshot } = require('./utils/compareImage');
const { takeScreenshotAndMatch } = require('./utils/takeScreenshotAndMatch');
const {
    generateSingleTestReport,
} = require('./utils/report_utils/generateSingleTestReport');
const { verifyVisualSnapshot } = require('./utils/verifyVisualSnapshot');
const { checkConsoleMessages } = require('./utils/checkConsoleMessages');

module.exports = {
    takeScreenShot,
    getTestMetadata,
    matchImageSnapshot,
    takeScreenshotAndMatch,
    generateSingleTestReport,
    verifyVisualSnapshot,
    checkConsoleMessages,
};
