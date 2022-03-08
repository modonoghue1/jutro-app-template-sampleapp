"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      updateScripts = _require.updateScripts;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions,
      getExtensionProps = _require2.getExtensionProps;

useOptions(program, ['--to-version', '--package-path', '--error-level', '--from-ci', '--skip-vcs', '--verbose', '--snapshots-path']).option('--branch-name <branchName>', 'git branch to store upgrade commits on').action(async ({
  toVersion,
  snapshotsPath,
  packagePath,
  fromCi,
  errorLevel,
  ...args
}) => {
  const basePath = path.resolve();
  const extensionProps = await getExtensionProps({
    toVersion,
    snapshotsPath,
    packageFiles: [packagePath],
    fromCi,
    errorLevel
  });
  const commandResult = await updateScripts({ ...args,
    toVersion,
    basePath,
    packagePath,
    fromCi,
    errorLevel,
    ...extensionProps
  });

  if (!commandResult) {
    process.exitCode = 1;
  }
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=update-scripts.js.map