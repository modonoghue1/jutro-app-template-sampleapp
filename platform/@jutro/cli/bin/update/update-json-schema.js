"use strict";

const program = require('commander');

const _require = require('../../src'),
      updateMetadataSchema = _require.updateMetadataSchema;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions;

useOptions(program, ['--error-level']).option('--schema-output-dir <schemaOutputDir>', 'where to write the updated schema files', './').action(param => {
  updateMetadataSchema({ ...param
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=update-json-schema.js.map