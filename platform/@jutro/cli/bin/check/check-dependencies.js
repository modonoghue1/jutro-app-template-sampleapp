"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      checkDependencies = _require.checkDependencies;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions;

useOptions(program, ['--error-level']).option('--packages-path <packagesPath>', 'relative path to be scanned', './').option('--ignored-dependencies <ignoredDependencies>', 'comma delimited list of dependencies to ignore in the check').action(async params => {
  const basePath = path.resolve();
  await checkDependencies({ ...params,
    basePath
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=check-dependencies.js.map