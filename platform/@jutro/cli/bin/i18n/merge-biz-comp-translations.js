"use strict";

const path = require('path');

const program = require('commander');

const _require = require('../../src'),
      mergeBizCompTranslations = _require.mergeBizCompTranslations;

program.option('--merge-output-dir <mergeOutputDir>', 'defines the output directory for merged messages from various business components', './i18n/biz-comp-translations').action(({
  mergeOutputDir
}) => {
  const basePath = path.resolve();
  mergeBizCompTranslations({
    outputDir: mergeOutputDir,
    basePath
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=merge-biz-comp-translations.js.map