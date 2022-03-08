const resemble = require('resemblejs');
const path = require('path');
const fs = require('fs-extra');
const fileUtils = require('./fileOperations');
const resembleConfig = require('./resemble.conf');

const pathToErrorImage = path.resolve(
    __dirname,
    '../static_report_files/error.png'
);

const matchImageSnapshot = async (actualPath, basePath) => {
    const isActualScreenshotTaken = fileUtils.fileExistSync(actualPath);
    const comparisonData = {
        basePath,
        actualPath,
    };

    if (isActualScreenshotTaken) {
        await resemble(basePath)
            .compareTo(actualPath)
            .ignoreAntialiasing()
            .outputSettings({
                ...resembleConfig.outputConfig,
            })
            .onComplete(async data => {
                comparisonData.metadata = data;
                if (data.error || data.rawMisMatchPercentage > 0) {
                    comparisonData.diffFilename = await generateDiffImage(
                        actualPath,
                        data.getBuffer()
                    );
                    comparisonData.isMatched = false;
                } else {
                    comparisonData.isMatched = true;
                }
            });
    } else {
        fs.copySync(pathToErrorImage, actualPath);
        comparisonData.diffFilename = 'error.png';
        comparisonData.isMatched = false;
    }

    return comparisonData;
};

const generateDiffImage = async (actualPath, data) => {
    const directory = fileUtils.getPathDirName(actualPath);
    const diffFileName = `${fileUtils.getPathBaseName(
        actualPath,
        path.extname(actualPath)
    )}-diff.png`;
    const diffFilePath = path.join(directory, diffFileName);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    fs.writeFileSync(diffFilePath, data);
    return diffFileName;
};

module.exports = { matchImageSnapshot };
