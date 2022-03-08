"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractMessagesJSX = extractMessagesJSX;

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

var _logging = require("../../entities/logging");

async function extractMessagesJSX({
  filenamePattern,
  outputDir,
  basePath = './',
  isLogCaptured = true
}) {
  const consoleCapture = (0, _logging.captureConsole)();

  if (isLogCaptured) {
    consoleCapture.startCapture();
  }

  const formatterPath = _path.default.resolve(_path.default.join(__dirname, './messagesFormatter.js'));

  const outFile = _path.default.join(outputDir, 'src/js-jsx-strings.json');

  const commandPath = _path.default.resolve(require.resolve('@formatjs/cli'), '..', '..', '..', '.bin', 'formatjs');

  const command = `${commandPath} extract "${filenamePattern}" --out-file ${outFile} --id-interpolation-pattern '[sha512:contenthash:base64:6]' --format ${formatterPath}`;

  try {
    (0, _child_process.execSync)(command);
  } catch (e) {
    (0, _logging.log)(e);
  } finally {
    if (isLogCaptured) {
      const logFileName = `jutro-js-jsx-extract-messages-cli.log`;
      consoleCapture.stopCapture();
      await consoleCapture.saveLog(logFileName, basePath);
    }
  }
}
//# sourceMappingURL=extract-messages-from-jsx.js.map