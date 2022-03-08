const fsExtra = require('fs-extra');
const fs = require('fs');
const path = require('path');

const override = { overwrite: true };
const copyFileSync = (source, target) =>
    fsExtra.copySync(source, target, override);
const readFileSync = fileName => fsExtra.readFileSync(fileName, 'utf8');
const writeFileSync = (fileName, content) =>
    fs.writeFileSync(fileName, JSON.stringify(content));
const mkdirSync = folder => fsExtra.mkdirSync(folder);
const fileExistSync = file => fsExtra.existsSync(file);
const moveFileSync = (source, target) =>
    fsExtra.moveSync(source, target, override);
const appendFileSync = (source, value) => fsExtra.appendFileSync(source, value);
const isDirectory = file => fsExtra.lstatSync(file).isDirectory();
const removeFileSync = file => fsExtra.removeSync(file);
const removerFolderIfExist = folder =>
    fileExistSync(folder) && removeFileSync(folder);
const createFolderIfNotExist = folder =>
    !fileExistSync(folder) && mkdirSync(folder);

const joinPath = (base, targetPath) => path.join(base, targetPath);
const getPathBaseName = (filePath, ext) => path.basename(filePath, ext);
const getPathDirName = filePath => path.dirname(filePath);

module.exports = {
    copyFileSync,
    readFileSync,
    writeFileSync,
    moveFileSync,
    appendFileSync,
    mkdirSync,
    isDirectory,
    fileExistSync,
    removeFileSync,
    removerFolderIfExist,
    createFolderIfNotExist,
    joinPath,
    getPathBaseName,
    getPathDirName,
};
