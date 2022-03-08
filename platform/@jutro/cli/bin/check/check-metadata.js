"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      checkMetadata = _require.checkMetadata;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions;

useOptions(program, ['--error-level']).option('--fileNamePattern <fileNamePattern>', 'pattern to find all metadata files').option('--schemaPath <schemaPath>', 'path for json schema').action(async params => {
  const basePath = path.resolve();
  await checkMetadata({ ...params,
    basePath
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
//# sourceMappingURL=check-metadata.js.map