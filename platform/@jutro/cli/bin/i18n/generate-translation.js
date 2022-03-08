"use strict";

const path = require('path');

const program = require('commander');

const _require = require('../../src'),
      captureConsole = _require.captureConsole,
      extractMessages = _require.extractMessages,
      extractMessagesJSX = _require.extractMessagesJSX,
      generatePseudo = _require.generatePseudo,
      log = _require.log,
      mergeTranslations = _require.mergeTranslations,
      mergeBizCompTranslations = _require.mergeBizCompTranslations;

program.storeOptionsAsProperties(true).option('--error-level <errorLevel>', 'error level = "error" will bubble an error out of the cli', 'warn').option('--extract-file-pattern <extractFilePattern>', 'defines where the extracted translations have been stored', 'src/**/*.metadata.json5').option('--extract-file-pattern-jsx <extractFilePatternJSX>', 'defines which files with app code have translations', 'src/**/*.{ts,tsx,js,jsx}').option('--extract-output-dir <extractOutputDir>', 'defines the output messages combining default translations and extracted translations', './i18n/').option('--merge-file-pattern <mergeFilePattern>', 'defines where the extracted translations have been stored', './i18n/src/**/*.json').option('--merge-output-dir <mergeOutputDir>', 'defines the output messages combining default translations and extracted translations', './src/i18n').option('--merge-output-file <mergeOutputFile>', 'output file name', 'en').option('--merge-biz-comp-output-dir <mergeBizCompOutputDir>', 'defines the output directory for merged messages from various business components', './i18n/biz-comp-translations').option('--target-type <targetType>', 'defines the expected input type for the pseudolizer', 'FILES').option('--pseudoType <pseudoType>', 'pseudoType can be one of ["EXPANSION","SHERLOCK","BOTH"]', 'sherlock').option('--outputFileName <outputFileName>', 'defines the output file name template', 'yy.json').option('-V, --version', 'output version number', false).option('--task <task>', 'Task can be one of ["FILE_PATTERNS","SINGLE_KEY","CONFIG_FILE"]').option('--key <keyString>', 'key string').option('--source <sourceString>', 'source string').option('--configFile <configFile>', 'path to the configuration file').option('-h, --help', 'output usage information', false).action(({
  errorLevel,
  extractFilePattern,
  extractFilePatternJsx,
  extractOutputDir,
  mergeFilePattern,
  mergeOutputDir,
  mergeOutputFile,
  mergeBizCompOutputDir,
  targetType,
  pseudoType,
  outputFileName,
  version,
  task,
  keyString,
  sourceString,
  configFile,
  help,
  inputFile
}) => {
  const basePath = path.resolve();
  const consoleCapture = captureConsole();
  consoleCapture.startCapture();

  try {
    extractMessagesJSX({
      filenamePattern: extractFilePatternJsx,
      outputDir: extractOutputDir,
      basePath,
      isLogCaptured: false
    });
    extractMessages({
      errorLevel,
      filenamePattern: extractFilePattern,
      outputDir: extractOutputDir,
      basePath,
      isLogCaptured: false
    });
    mergeTranslations({
      errorLevel,
      filenamePattern: mergeFilePattern,
      outputDir: mergeOutputDir,
      outputFileName: mergeOutputFile,
      basePath,
      isLogCaptured: false
    });
    mergeBizCompTranslations({
      basePath,
      outputDir: mergeBizCompOutputDir,
      isLogCaptured: false
    });
    generatePseudo({
      errorLevel,
      targetType,
      pseudoType,
      outputFileName,
      version,
      task,
      keyString,
      sourceString,
      configFile,
      help,
      inputFile
    });
  } catch (error) {
    log(error);
  } finally {
    const logFileName = `jutro-generate-translation-cli.log`;
    consoleCapture.stopCapture();
    consoleCapture.saveLog(logFileName, basePath);
  }
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=generate-translation.js.map