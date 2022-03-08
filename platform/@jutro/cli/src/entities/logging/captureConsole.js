"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.captureConsole = void 0;

var _path = _interopRequireDefault(require("path"));

var _captureConsole = _interopRequireDefault(require("capture-console"));

var _fs = _interopRequireDefault(require("fs"));

var _stripAnsi = _interopRequireDefault(require("strip-ansi"));

var _getTimestampForLogs = require("./getTimestampForLogs");

var _log = require("./log");

const captureConsole = () => {
  let captureOutput = '';
  let hasCalledStartCapture = false;
  return {
    hasStarted: () => hasCalledStartCapture,
    startCapture: () => {
      hasCalledStartCapture = true;

      _captureConsole.default.startCapture(process.stdout, stdout => {
        if (stdout.length) {
          const timestamp = (0, _getTimestampForLogs.getTimestampForLogs)();
          captureOutput += `[${timestamp}] - ${stdout}`;
        }
      });
    },
    stopCapture: () => {
      hasCalledStartCapture = false;

      _captureConsole.default.stopCapture(process.stdout);
    },
    startIntercept: () => {
      _captureConsole.default.startIntercept(process.stdout, stdout => {
        if (stdout.length) {
          const timestamp = (0, _getTimestampForLogs.getTimestampForLogs)();
          captureOutput += `[${timestamp}] - ${stdout}`;
        }
      });
    },
    stopIntercept: () => {
      _captureConsole.default.stopCapture(process.stdout);
    },
    saveLog: (fileName, basePath) => new Promise((resolve, reject) => {
      const logDirName = '.jutro';

      const logDirPath = _path.default.join(`${basePath}/${logDirName}/`);

      if (!_fs.default.existsSync(logDirPath)) {
        _fs.default.mkdirSync(logDirPath);
      }

      const timestamp = (0, _getTimestampForLogs.getTimestampForLogs)();
      const fileNameWithoutExtension = fileName.replace('.log', '');
      const fileNameWithTimestamp = `${fileNameWithoutExtension}-${timestamp}.log`;

      const wstream = _fs.default.createWriteStream(`${logDirPath}${fileNameWithTimestamp}`);

      wstream.write((0, _stripAnsi.default)(captureOutput));
      wstream.end();
      wstream.on('finish', () => {
        const filePath = _path.default.join(`${basePath}/${logDirName}`, fileNameWithTimestamp);

        (0, _log.logYellowAnnouncement)(`Please check ${filePath} for more details.`);
        resolve(true);
      });
      wstream.on('error', err => {
        console.log(err);
        reject;
      });
    })
  };
};

exports.captureConsole = captureConsole;
//# sourceMappingURL=captureConsole.js.map