"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      clearDeprecated = _require.clearDeprecated;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions;

useOptions(program, ['--from-ci', '--error-level']).action(async params => {
  const basePath = path.resolve();
  await clearDeprecated({ ...params,
    basePath
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=check-deprecated.js.map