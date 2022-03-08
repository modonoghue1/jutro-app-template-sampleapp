const { takeScreenShot } = require('./takeScreenShot');
const { matchImageSnapshot } = require('./compareImage');
const {
    generateSingleTestReport,
} = require('./report_utils/generateSingleTestReport');

/**
 * Searches for the metadata of the test
 *
 * @param {object} t testcafe
 * @param {object} containerSelector testcafe selector or array of selectors
 * @returns {object} result of the match
 */
async function takeScreenshotAndMatch(t, containerSelector) {
    const imageListData = await takeScreenShot(t, containerSelector);

    if (!Array.isArray(imageListData)) {
        const comparisionData = await compareImageAndCreateResult(
            imageListData
        );
        return comparisionData;
    }
    const comparisionDataForMultipleScreenShots = await getComparisionMetadataForImageList(
        imageListData
    );

    const areAllScreenShotMatched = comparisionDataForMultipleScreenShots.every(
        ({ isMatched }) => isMatched
    );

    const metadataForAllScreenShots = comparisionDataForMultipleScreenShots.reduce(
        (acc, { metadata, testName }) => ({
            ...acc,
            [testName]: metadata,
        }),
        {}
    );
    // eslint-disable-next-line no-param-reassign
    t.ctx.screenShotTaken = true;

    return {
        isMatched: areAllScreenShotMatched,
        metadata: metadataForAllScreenShots,
    };
}

async function getComparisionMetadataForImageList(imageListData) {
    return Promise.all(
        imageListData.map(async imageData => {
            const { testName } = imageData;
            const {
                isMatched,
                metadata,
                diffFilename,
            } = await compareImageAndCreateResult(imageData);
            return {
                isMatched,
                metadata,
                diffFilename,
                testName,
            };
        })
    );
}

async function compareImageAndCreateResult(imageListData) {
    const {
        currentImagePath,
        baseImagePath,
        testScreenShotName,
    } = imageListData;
    const { isMatched, metadata, diffFilename } = await matchImageSnapshot(
        currentImagePath,
        baseImagePath
    );
    generateSingleTestReport(testScreenShotName, diffFilename, metadata);

    return {
        isMatched,
        metadata,
        diffFilename,
    };
}

module.exports = { takeScreenshotAndMatch };
