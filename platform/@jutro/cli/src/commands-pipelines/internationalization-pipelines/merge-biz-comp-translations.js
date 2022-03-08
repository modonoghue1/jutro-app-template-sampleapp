"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeBizCompTranslations = mergeBizCompTranslations;

var _glob = require("glob");

var _mkdirp = require("mkdirp");

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _groupBy = _interopRequireDefault(require("lodash/groupBy"));

var _logging = require("../../entities/logging");

const OUTPUT_DIR = `./i18n/biz-comp-translations`;

function exportMetadata(outputDir, translationsAvailable) {
  (0, _fs.writeFileSync)(_path.default.join(outputDir, 'meta.json'), JSON.stringify({
    translationsAvailable
  }, null, 2));
}

async function mergeBizCompTranslations({
  pathsToNodeModules = [_path.default.resolve('node_modules'), ...require.main.paths],
  outputDir = OUTPUT_DIR,
  basePath = './',
  isLogCaptured = true
}) {
  const consoleCapture = (0, _logging.captureConsole)();

  if (isLogCaptured) {
    consoleCapture.startCapture();
  }

  try {
    (0, _fs.rmdirSync)(outputDir, {
      recursive: true
    });
    (0, _mkdirp.sync)(outputDir);
    const translationPaths = Object.values(pathsToNodeModules.reduceRight((result, pathToNodeModules) => {
      const pathsGroupedByBusinessPattern = (0, _groupBy.default)((0, _glob.sync)(`${pathToNodeModules}/@business-patterns/*/translations/*.json`), filePath => _path.default.basename(_path.default.join(filePath, '../..')));
      return { ...result,
        ...pathsGroupedByBusinessPattern
      };
    }, {})).flat();

    if (translationPaths.length === 0) {
      exportMetadata(outputDir, false);
      return;
    }

    exportMetadata(outputDir, true);
    const translationPathsGroupedByFileName = (0, _groupBy.default)(translationPaths, filePath => _path.default.parse(filePath).base);
    Object.keys(translationPathsGroupedByFileName).forEach(outputFileName => {
      const content = translationPathsGroupedByFileName[outputFileName].reduce((fileContent, source) => ({ ...fileContent,
        ...JSON.parse((0, _fs.readFileSync)(source, 'utf8'))
      }), {});
      (0, _fs.writeFileSync)(`${outputDir}/${outputFileName}`, JSON.stringify(content, null, 2));
      (0, _logging.log)(`Translations merged to ${outputDir}/${outputFileName}.json!`);
    });
  } catch (error) {
    (0, _logging.log)(error);
  } finally {
    if (isLogCaptured) {
      const logFileName = `jutro-merge-biz-comp-messages-cli.log`;
      consoleCapture.stopCapture();
      await consoleCapture.saveLog(logFileName, basePath);
    }
  }
}
//# sourceMappingURL=merge-biz-comp-translations.js.map