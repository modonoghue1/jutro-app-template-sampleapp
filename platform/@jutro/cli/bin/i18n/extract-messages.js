"use strict";

const program = require('commander');

const _require = require('../../src'),
      extractMessages = _require.extractMessages;

program.option('--extract-file-pattern <extractFilePattern>', 'defines where the extracted translations have been stored', 'src/**/*.metadata.json5').option('--extract-output-dir <extractOutputDir>', 'defines the output messages combining default translations and extracted translations', './i18n/').option('--error-level <errorLevel>', 'error level = "error" will bubble an error out of the cli', 'warn').option('--filename-ignore-pattern <filenameIgnorePattern>', 'comma separated list of filename patterns to ignore').action(({
  errorLevel,
  extractFilePattern,
  extractOutputDir,
  filenameIgnorePattern
}) => {
  var _filenameIgnorePatter;

  const globIgnores = filenameIgnorePattern === null || filenameIgnorePattern === void 0 ? void 0 : (_filenameIgnorePatter = filenameIgnorePattern.split(',')) === null || _filenameIgnorePatter === void 0 ? void 0 : _filenameIgnorePatter.filter(pattern => !!pattern);
  extractMessages({
    errorLevel,
    filenamePattern: extractFilePattern,
    outputDir: extractOutputDir,
    globIgnorePattern: globIgnores
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=extract-messages.js.map