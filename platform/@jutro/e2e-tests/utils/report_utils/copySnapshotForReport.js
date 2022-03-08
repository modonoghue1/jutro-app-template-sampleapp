const fs = require('fs');
const path = require('path');
const fileUtils = require('../fileOperations');

const testsFolder = path.resolve('./');
const errorImage = 'error.png';
const regExFileExtension = /.png$/;
const pathForErrorScreenShot = fileUtils.joinPath(
    __dirname,
    `../../static_report_files/${errorImage}`
);

const createFolder = folder => {
    fileUtils.removerFolderIfExist(folder);
    fileUtils.mkdirSync(folder);
};

const copyImagesToBackstopFolder = (
    pathForActualScreenShot,
    backstopImageFolder
) => {
    const [, actualImagePath] = backstopImageFolder;
    fileUtils.copyFileSync(
        pathForErrorScreenShot,
        `${actualImagePath}/${errorImage}`
    );

    copyFilesRecursivelyToTwoLevels(
        pathForActualScreenShot,
        backstopImageFolder
    );
};

const copyFilesRecursivelyToTwoLevels = (dirPath, imgFolder) =>
    copyFilesRecursively(dirPath, 2, imgFolder);

const copyFilesRecursively = (dirPath, level, backstopImageFolder) => {
    const [, actualImagePath, diffImagePath] = backstopImageFolder;
    fs.readdirSync(dirPath).forEach(file => {
        const expectedFile = fileUtils.joinPath(dirPath, file);
        if (fileUtils.isDirectory(expectedFile) && level === 0) return;
        if (fileUtils.isDirectory(expectedFile) && level > 0) {
            copyFilesRecursively(expectedFile, level - 1, backstopImageFolder);
        } else {
            const sourcePath = fileUtils.joinPath(dirPath, file);
            if (!file.includes('diff')) {
                fileUtils.copyFileSync(
                    sourcePath,
                    `${actualImagePath}/${file}`
                );
            } else {
                fileUtils.copyFileSync(sourcePath, `${diffImagePath}/${file}`);
            }
        }
    });
};

const copyBaseImagesToBackstopJsFolder = (
    baseImagesPath,
    backstopImageFolder
) => {
    const [baseImagePath, ,] = backstopImageFolder;
    fileUtils.copyFileSync(
        pathForErrorScreenShot,
        `${baseImagePath}/${errorImage}`
    );
    fs.readdirSync(baseImagesPath).forEach(file => {
        const baseImage = fileUtils.joinPath(baseImagesPath, file);
        if (
            !fileUtils.isDirectory(baseImage) &&
            regExFileExtension.test(file)
        ) {
            fileUtils.copyFileSync(baseImage, `${baseImagePath}/${file}`);
        }
    });
};

const copySnapshotForReport = pathConfig => {
    const visualTestBaseImagesPath = fileUtils.joinPath(
        testsFolder,
        `./${pathConfig.baseSnapshotLocation}`
    );
    const reportFolder = fileUtils.joinPath(
        testsFolder,
        pathConfig.visualArtifactLocation
    );
    const pathForActualScreenShot = fileUtils.joinPath(
        reportFolder,
        '/screenshots'
    );
    const backstopJSFolder = fileUtils.joinPath(
        reportFolder,
        pathConfig.backstopReport
    );
    const backstopImageFolder = [
        'baseImages',
        'actualImages',
        'diffImages',
    ].map(folder => fileUtils.joinPath(backstopJSFolder, folder));

    backstopImageFolder.forEach(createFolder);

    copyImagesToBackstopFolder(pathForActualScreenShot, backstopImageFolder);
    copyBaseImagesToBackstopJsFolder(
        visualTestBaseImagesPath,
        backstopImageFolder
    );
};

module.exports = { copySnapshotForReport };
