"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      updateCss = _require.updateCss;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions,
      getExtensionProps = _require2.getExtensionProps;

useOptions(program, ['--current-version', '--to-version', '--package-path', '--error-level', '--from-ci', '--verbose', '--snapshots-path']).option('--css-file-name-pattern <cssFileNamePattern>', 'file name pattern of the css files', '**/*.scss').action(async ({
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
  const commandResult = await updateCss({ ...args,
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
//# sourceMappingURL=update-css.js.map