const path = require('path');
const fileUtils = require('./fileOperations');
const { getTestMetadata } = require('./getTestMetadata');

/**
 * Takes screen shot of the component
 *
 * @param {object} t testcafe
 * @param {object | object[]} selectors selector/array of selector for the component
 * @returns {object} metadata of taken screenshot
 */
async function takeScreenShot(t, selectors) {
    const { testFileName, testName, browser } = await getTestMetadata(t);
    /* eslint-disable no-await-in-loop */
    if (Array.isArray(selectors)) {
        const currentScreenShotList = await captureCurrentImageAndMetadata(
            t,
            selectors,
            { testFileName, testName, browser }
        );
        return saveBaseImage(t, currentScreenShotList);
    }
    const testScreenShotName = `${testName}-${browser}.png`;
    const currentScreenShot = `/${testFileName}/test-${testName}/${testScreenShotName}`;
    const testMetadata = {
        testName,
        testScreenShotName,
        currentScreenShot: `/screenshots/${testFileName}/test-${testName}/${testScreenShotName}`,
    };
    await captureScreenShot(t, selectors, currentScreenShot);
    return saveBaseImage(t, testMetadata);
}

async function captureCurrentImageAndMetadata(t, selectorList, testMetadata) {
    const { testFileName, testName, browser } = testMetadata;
    return Promise.all(
        selectorList.map(async selector => {
            // selector will be an object with a single key-value pair -> { header: '.headerClass'}/{ footer: Selector('.footerClass')}
            const [selectorName, selectorValue] = Object.entries(selector)[0];
            const testNameSelectorSpecific = `${testName}-${selectorName}`;
            const testScreenShotName = `${testNameSelectorSpecific}-${browser}.png`;
            const currentScreenShot = `/${testFileName}/test-${testName}/${testScreenShotName}`;
            await captureScreenShot(t, selectorValue, currentScreenShot);
            return {
                testName: testNameSelectorSpecific,
                testScreenShotName,
                currentScreenShot,
            };
        })
    );
}

async function saveBaseImage(t, currentTestImageData) {
    if (!Array.isArray(currentTestImageData))
        return getImagePaths(currentTestImageData);

    const imageMapForMultipleScreenShots = currentTestImageData.map(imageData =>
        getImagePaths(imageData)
    );
    return imageMapForMultipleScreenShots;
}

async function captureScreenShot(t, selector, screenShotPath) {
    await t.takeElementScreenshot(selector, screenShotPath, {
        includeMargins: false,
    });
}

function getImagePaths(imageData) {
    const { testName, testScreenShotName, currentScreenShot } = imageData;

    const pathConfig = {
        baseSnapshotLocation: 'tests/visual/tests/__snapshots__',
        visualArtifactLocation: 'tests/reports/visual',
        backstopJSHTMLReportLocation: '/backstopJSReport/html_report',
        backstopReport: '/backstopJSReport',
    };

    const baseImageDir = path.resolve(`./${pathConfig.baseSnapshotLocation}`);

    fileUtils.createFolderIfNotExist(baseImageDir);

    const baseImagePath = fileUtils.joinPath(baseImageDir, testScreenShotName);
    const currentImageAbsolutePath = path.resolve(
        `./${pathConfig.visualArtifactLocation}/${currentScreenShot}`
    );

    return {
        currentImagePath: currentImageAbsolutePath,
        baseImagePath,
        testName,
        testScreenShotName,
    };
}

module.exports = { takeScreenShot };
