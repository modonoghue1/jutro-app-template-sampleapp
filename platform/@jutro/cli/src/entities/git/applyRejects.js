"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyRejects = exports.getSourceLines = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _readline = _interopRequireDefault(require("readline"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _logging = require("../logging");

const AT_THE_RATE = `@@`;
const ignoreRejectedLines = ['rejected hunks', AT_THE_RATE];

async function processFileLineByLine(fileName, rootPath) {
  const rejectedFilePath = _path.default.resolve(rootPath, fileName);

  const allRejectedLines = await getSourceLines(rejectedFilePath);
  const originalFileName = allRejectedLines[0].split('diff a/')[1].split('b/')[0].trim();

  const originalFilePath = _path.default.resolve(rootPath, originalFileName);

  let sourceFileLines = await getSourceLines(originalFilePath);
  let linesToBeDeleted = [];
  let linesToBeAdded = [];
  let isDeletionSuccessful = true;
  allRejectedLines.forEach(async (currentLine, index) => {
    if (isIgnoredLine(currentLine)) return;

    if (currentLine.charAt(0) === '-') {
      linesToBeDeleted.push(currentLine.substring(1));
    }

    const isUnchangedLine = currentLine.trim() !== '' && currentLine.charAt(0) !== '+' && currentLine.charAt(0) !== '-';

    if (isUnchangedLine || index === allRejectedLines.length - 1) {
      if (!(0, _isEmpty.default)(linesToBeDeleted) && isDeletionSuccessful) {
        isDeletionSuccessful = false;

        if (canPerformDeleteAction(sourceFileLines, linesToBeDeleted)) {
          sourceFileLines = deleteLinesFromSourceFile(sourceFileLines, linesToBeDeleted);
          linesToBeDeleted = [];
          isDeletionSuccessful = true;
        }
      }
    }
  });

  if (!isDeletionSuccessful) {
    (0, _logging.logYellow)(`Cannot resolve conflicts for ${originalFileName} file, please apply changes manually.`);
    return;
  }

  allRejectedLines.forEach(async (currentLine, index) => {
    if (isIgnoredLine(currentLine)) return;

    if (currentLine.charAt(0) === '+') {
      linesToBeAdded.push(currentLine.substring(1));
    }

    const isUnchangedLine = currentLine.trim() !== '' && currentLine.charAt(0) !== '+' && currentLine.charAt(0) !== '-';

    if (isUnchangedLine || index === allRejectedLines.length - 1) {
      if (!(0, _isEmpty.default)(linesToBeAdded)) {
        sourceFileLines = addLinesToSourceFile(sourceFileLines, currentLine, linesToBeAdded);
        linesToBeAdded = [];
      }
    }
  });
  await saveFile(originalFilePath, sourceFileLines);

  _fs.default.unlinkSync(rejectedFilePath);
}

const isIgnoredLine = currentLine => ignoreRejectedLines.some(str => currentLine.includes(str));

const addLinesToSourceFile = (sourceFileLines, currentLine, newlyAddedLines) => {
  const newLines = [];
  let isNewLinesAdded = false;
  sourceFileLines.forEach(async sourceFileLine => {
    if (!isNewLinesAdded && currentLine.trim() === sourceFileLine.trim()) {
      newLines.push(...newlyAddedLines);
      isNewLinesAdded = true;
    }

    newLines.push(sourceFileLine);
  });
  return newLines;
};

const deleteLinesFromSourceFile = (sourceFileLines, linesToBeDeleted) => {
  const newLines = [];

  for (let i = 0; i < sourceFileLines.length; i += 1) {
    const newArray = sourceFileLines.slice(i, i + linesToBeDeleted.length);

    if ((0, _isEqual.default)(newArray, linesToBeDeleted)) {
      i += linesToBeDeleted.length;
    }

    if (!(0, _isUndefined.default)(sourceFileLines[i])) newLines.push(sourceFileLines[i]);
  }

  return newLines;
};

const canPerformDeleteAction = (sourceFileLines, linesToBeDeleted) => {
  for (let i = 0; i < sourceFileLines.length; i += 1) {
    const slicedSourceFileLines = sourceFileLines.slice(i, i + linesToBeDeleted.length);

    if ((0, _isEqual.default)(slicedSourceFileLines, linesToBeDeleted)) {
      return true;
    }
  }

  return false;
};

const getSourceLines = async (filePath) => new Promise(resolve => {
  const currentFileStream = _fs.default.createReadStream(filePath);

  const currentFileLines = [];

  const fileInterface = _readline.default.createInterface({
    input: currentFileStream,
    output: process.stdout,
    terminal: false,
    crlfDelay: Infinity
  });

  fileInterface.on('line', line => {
    currentFileLines.push(line);
  });
  fileInterface.on('close', () => {
    resolve(currentFileLines);
  });
});

exports.getSourceLines = getSourceLines;

const saveFile = async (filePath, updatedSourceLines) => new Promise(resolve => {
  _fs.default.truncate(filePath, 0, () => {
    const writeLogger = _fs.default.createWriteStream(filePath);

    updatedSourceLines.forEach(myLine => {
      writeLogger.write(`${myLine}\n`);
    });
    writeLogger.end();
    (0, _logging.logGreen)(`Applied rejected ${filePath} cleanly.`);
    resolve();
  });
});

const processFiles = async (rootPath, files) => {
  await Promise.all(files.map(async fileName => {
    await processFile(rootPath, fileName);
  }));
};

const processFile = async (filePath, fileName) => {
  const sanitizedFilename = _path.default.basename(fileName);

  (0, _logging.log)(`Processing ${sanitizedFilename} to resolve conflicts...`);
  await processFileLineByLine(fileName, filePath);
};

const getRejectedFiles = rootPath => {
  const files = _fs.default.readdirSync(rootPath).filter(file => file.includes('.rej'));

  return files;
};

const applyRejects = async (rootPath = `./`) => {
  const files = getRejectedFiles(rootPath);

  if (files.length === 0) {
    (0, _logging.log)(`No reject reject (.rej) files found.`);
    return;
  }

  await processFiles(rootPath, files);
  const remainingRejectedFiles = getRejectedFiles(rootPath);

  if ((0, _isEmpty.default)(remainingRejectedFiles)) {
    (0, _logging.log)('All conflicts have been applied, please review these changes.');
  } else {
    (0, _logging.logYellow)(`Unable to apply reject (.rej) files: ${remainingRejectedFiles.join(', ')}`);
  }
};

exports.applyRejects = applyRejects;
//# sourceMappingURL=applyRejects.js.map