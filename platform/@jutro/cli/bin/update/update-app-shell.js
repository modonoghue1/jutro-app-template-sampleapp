"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      updateAppShell = _require.updateAppShell;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions,
      getExtensionProps = _require2.getExtensionProps;

useOptions(program, ['--current-version', '--error-level', '--package-path', '--snapshots-path', '--to-version']).option('--resolve-rejects', 'apply contents of reject (.rej) files automatically').action(async ({
  currentVersion,
  toVersion,
  packagePath,
  snapshotsPath,
  fromCi,
  errorLevel,
  ...args
}) => {
  const basePath = path.resolve();
  const extensionProps = await getExtensionProps({
    fromCi,
    snapshotsPath,
    currentVersion,
    toVersion,
    packageFiles: [packagePath],
    errorLevel
  });
  const commandResult = await updateAppShell({ ...args,
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
//# sourceMappingURL=update-app-shell.js.map