"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      updateCommitHooks = _require.updateCommitHooks;

program.action(async () => {
  const basePath = path.resolve();
  await updateCommitHooks(basePath).catch(err => {
    console.log(err);
    process.exit(1);
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=update-commit-hooks.js.map