"use strict";

const path = require('path');

const program = require('commander');

const _require = require('../../src'),
      mergeTranslations = _require.mergeTranslations;

program.option('--error-level <errorLevel>', 'error level = "error" will bubble an error out of the cli', 'warn').option('--merge-file-pattern <mergeFilePattern>', 'defines where the extracted translations have been stored', './i18n/src/**/*.json').option('--merge-output-dir <mergeOutputDir>', 'defines the output messages combining default translations and extracted translations', './src/i18n').option('--merge-output-file <mergeOutputFile>', 'output file name', 'en').option('--custom-ignore-patterns <customIgnorePatterns>', 'custom glob ignore patterns, comma separated no space').action(({
  customIgnorePatterns,
  errorLevel,
  mergeFilePattern,
  mergeOutputDir,
  mergeOutputFile
}) => {
  var _customIgnorePatterns;

  const basePath = path.resolve();
  const globIgnores = customIgnorePatterns === null || customIgnorePatterns === void 0 ? void 0 : (_customIgnorePatterns = customIgnorePatterns.split(',')) === null || _customIgnorePatterns === void 0 ? void 0 : _customIgnorePatterns.filter(pattern => !!pattern);
  mergeTranslations({
    basePath,
    errorLevel,
    filenamePattern: mergeFilePattern,
    globIgnores,
    outputDir: mergeOutputDir,
    outputFileName: mergeOutputFile
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=merge-messages.js.map