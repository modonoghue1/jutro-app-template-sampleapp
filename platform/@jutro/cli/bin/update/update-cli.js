"use strict";

const program = require('commander');

const _require = require('child_process'),
      execSync = _require.execSync;

const ora = require('ora');

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions;

useOptions(program, ['--to-version']).action(({
  toVersion
}) => {
  const progress = ora(`Updating @jutro/cli to ${toVersion}`).start();

  try {
    execSync(`npm i --save-dev --save-exact @jutro/cli@${toVersion}`);
  } catch {
    progress.fail('Unable to update @jutro/cli');
    process.exit(1);
  }

  progress.succeed();
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=update-cli.js.map