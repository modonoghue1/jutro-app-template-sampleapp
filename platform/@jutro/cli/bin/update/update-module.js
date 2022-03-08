"use strict";

const program = require('commander');

const path = require('path');

const globSync = require('glob').sync;

const _require = require('../../src'),
      updateModule = _require.updateModule;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions,
      getExtensionProps = _require2.getExtensionProps;

const _require3 = require('../../src/entities/glob'),
      globIgnorePatterns = _require3.globIgnorePatterns;

useOptions(program, ['--current-version', '--to-version', '--error-level', '--do-npm-install', '--from-ci', '--verbose', '--snapshots-path']).option('--dependency-install-script <dependencyInstallScript>', 'command which will be run to handle installing updated dependencies').option('--file-name-pattern <fileNamePattern>', 'file name pattern to find all the package.json files', '**/package.json').action(async ({
  currentVersion,
  toVersion,
  fileNamePattern,
  customGlobIgnorePattern,
  snapshotsPath,
  fromCi,
  errorLevel,
  ...args
}) => {
  const basePath = path.resolve();
  const packageFiles = globSync(fileNamePattern, {
    ignore: customGlobIgnorePattern || globIgnorePatterns
  });
  const extensionProps = await getExtensionProps({
    currentVersion,
    toVersion,
    snapshotsPath,
    packageFiles,
    fromCi,
    errorLevel
  });
  await updateModule({ ...args,
    toVersion,
    basePath,
    packageFiles,
    fromCi,
    errorLevel,
    ...extensionProps
  }).catch(err => {
    console.log(err);
    process.exitCode = 1;
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=update-module.js.map