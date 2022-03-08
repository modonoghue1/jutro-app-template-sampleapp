"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractMessages = void 0;

require("json5/lib/register");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _noop = _interopRequireDefault(require("lodash/noop"));

var _glob = require("glob");

var _glob2 = require("../../entities/glob");

var _pipelines = require("../../entities/pipelines");

var _i18n = require("../../entities/i18n");

const extractMessages = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Extracting messages...',
  logFileName: 'jutro-extract-messages-cli.log',
  name: 'runExtractMessages'
}).setup(async () => {
  try {
    if (__non_webpack_require__) (0, _noop.default)();
  } catch {
    global.__non_webpack_require__ = require;
  }
}).addStep(async ({
  filenamePattern,
  outputDir,
  globIgnorePattern = _glob2.globIgnorePatterns
}) => {
  (0, _glob.sync)(filenamePattern, {
    ignore: globIgnorePattern
  }).forEach(file => {
    const messages = (0, _i18n.traverseAndExtracti18nMessageIds)(__non_webpack_require__(_path.default.resolve(process.cwd(), file)));
    const splitFilePath = file.replace('./', '').split('/');
    const fileName = splitFilePath.pop().replace(/\.[^/.]+$/, '.json');
    const filePath = `${outputDir}/${splitFilePath.join('/')}`;

    _fs.default.mkdirSync(`${filePath}`, {
      recursive: true
    });

    const lintedMessages = (0, _i18n.lintMessages)(messages);

    _fs.default.writeFileSync(`${filePath}/${fileName}`, JSON.stringify(lintedMessages, null, 2));
  });
}).addStep({
  action: async ({
    logFileName
  }) => ({
    successLogFileName: `${logFileName}`
  }),
  props: {
    title: 'Finishing message extraction'
  }
});
exports.extractMessages = extractMessages;
//# sourceMappingURL=extract-messages-from-json5.js.map