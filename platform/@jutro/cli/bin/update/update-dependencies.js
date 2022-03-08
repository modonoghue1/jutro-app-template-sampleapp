"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      updateDependencies = _require.updateDependencies;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions,
      getExtensionProps = _require2.getExtensionProps;

useOptions(program, ['--current-version', '--to-version', '--error-level', '--package-path', '--do-npm-install', '--from-ci', '--skip-vcs', '--verbose', '--snapshots-path']).option('--branch-name <branchName>', 'git branch to store upgrade commits on').option('--dependency-install-script <dependencyInstallScript>', 'command which will be run to handle installing updated dependencies').action(async ({
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
    currentVersion,
    toVersion,
    snapshotsPath,
    packageFiles: [packagePath],
    fromCi,
    errorLevel
  });
  const commandResult = await updateDependencies({ ...args,
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
//# sourceMappingURL=update-dependencies.js.map