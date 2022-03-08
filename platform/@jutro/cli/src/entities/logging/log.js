"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logUpToDate = exports.logEmptyLine = exports.logRedAnnouncement = exports.logYellowAnnouncement = exports.logGreenAnnouncement = exports.logBlueBrightAnnouncement = exports.logAnnouncement = exports.logYellow = exports.logRed = exports.logObjectWithTitle = exports.logInverse = exports.logGreen = exports.logBold = exports.logBlueBright = exports.log = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _path = require("path");

var _fsExtra = require("fs-extra");

let CLI_VERSION;

const loadCliVersion = () => {
  if (!CLI_VERSION) {
    const _readJSONSync = (0, _fsExtra.readJSONSync)((0, _path.resolve)(__dirname, '..', '..', '..', 'package.json')),
          version = _readJSONSync.version;

    CLI_VERSION = version;
  }

  return CLI_VERSION;
};

const log = message => {
  const version = loadCliVersion();
  console.log(`[${_chalk.default.cyanBright(`jutro-cli-${version}`)}] - ${message}`);
};

exports.log = log;

const logGreen = message => log(_chalk.default.green(message));

exports.logGreen = logGreen;

const logInverse = message => log(_chalk.default.inverse(message));

exports.logInverse = logInverse;

const logBlueBright = message => log(_chalk.default.blueBright(message));

exports.logBlueBright = logBlueBright;

const logRed = message => log(_chalk.default.red(message));

exports.logRed = logRed;

const logBold = message => log(_chalk.default.bold(message));

exports.logBold = logBold;

const logObjectWithTitle = (title, object) => {
  logBold(title);
  logObjectWithoutFormatting(object);
};

exports.logObjectWithTitle = logObjectWithTitle;

const logYellow = message => log(_chalk.default.yellow(message));

exports.logYellow = logYellow;

const logEmptyLine = () => log('');

exports.logEmptyLine = logEmptyLine;

const announcement = message => `==== ${message} ====\n`;

const logAnnouncement = message => log(announcement(message));

exports.logAnnouncement = logAnnouncement;

const logGreenAnnouncement = message => logGreen(announcement(message));

exports.logGreenAnnouncement = logGreenAnnouncement;

const logBlueBrightAnnouncement = message => logBlueBright(announcement(message));

exports.logBlueBrightAnnouncement = logBlueBrightAnnouncement;

const logYellowAnnouncement = message => logYellow(announcement(message));

exports.logYellowAnnouncement = logYellowAnnouncement;

const logRedAnnouncement = message => logRed(announcement(message));

exports.logRedAnnouncement = logRedAnnouncement;

const logObjectWithoutFormatting = (object, whiteSpace = '  ') => {
  Object.entries(object).forEach(([topKey, topValue]) => {
    if ((0, _isPlainObject.default)(topValue)) {
      console.log(`${whiteSpace}${_chalk.default.yellow(topKey)}:`);
      logObjectWithoutFormatting(topValue, `  ${whiteSpace}`);
    } else {
      console.log(`${whiteSpace}${topKey}: ${topValue}`);
    }
  });
};

const logUpToDate = currentVersion => logGreen(`Current version (${currentVersion}) is the most recent. Everything is up to date.`);

exports.logUpToDate = logUpToDate;
//# sourceMappingURL=log.js.map