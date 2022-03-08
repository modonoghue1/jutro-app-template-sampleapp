"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeTranslations = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _glob = require("glob");

var _mkdirp = require("mkdirp");

var _glob2 = require("../../entities/glob");

var _pipelines = require("../../entities/pipelines");

var _logging = require("../../entities/logging");

const LANG_DIR = './i18n/';
const MESSAGES_PATTERN = `${LANG_DIR}frontend/**/*.json`;
const OUTPUT_DIR = `${LANG_DIR}`;
const OUTPUT_FILENAME = 'en';
const mergeTranslations = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Merging messages...',
  logFileName: 'jutro-merge-messages-cli.log',
  name: 'runMergeMessages'
}).addStep(async ({
  filenamePattern = MESSAGES_PATTERN,
  outputDir = OUTPUT_DIR,
  outputFileName = OUTPUT_FILENAME,
  globIgnores = _glob2.globIgnorePatterns
}) => {
  function extracted(defaultMessage, id, collection) {
    if (Object.prototype.hasOwnProperty.call(collection, id)) {
      throw new Error(`Duplicate message id: ${id}`);
    }

    collection[id] = defaultMessage;
  }

  const messages = (0, _glob.sync)(filenamePattern, {
    ignore: globIgnores
  }).map(filename => JSON.parse(_fs.default.readFileSync(filename, 'utf8'))).reduce((collection, item) => Array.isArray(item) ? [...collection, ...item] : [...collection, item], []).reduce((collection, displayKey) => {
    if (displayKey.id) {
      const defaultMessage = displayKey.defaultMessage,
            id = displayKey.id;
      extracted(defaultMessage, id, collection);
    } else {
      Object.keys(displayKey).forEach(key => extracted(displayKey[key], key, collection));
    }

    return collection;
  }, {});
  (0, _mkdirp.sync)(outputDir);
  const orderedMessages = {};
  Object.keys(messages).sort().forEach(key => {
    orderedMessages[key] = messages[key];
  });

  _fs.default.writeFileSync(`${outputDir}/${outputFileName}.json`, JSON.stringify(orderedMessages, null, 2));

  (0, _logging.log)(`Source strings merged to ${outputDir}/${outputFileName}.json!`);
}).addStep({
  action: async ({
    logFileName
  }) => ({
    successLogFileName: `${logFileName}`
  }),
  props: {
    title: 'Finishing merging messages'
  }
});
exports.mergeTranslations = mergeTranslations;
//# sourceMappingURL=merge-translations.js.map