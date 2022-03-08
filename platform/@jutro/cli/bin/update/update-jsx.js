"use strict";

const program = require('commander');

const _require = require('../../src'),
      applyCodemods = _require.applyCodemods;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions,
      getExtensionProps = _require2.getExtensionProps,
      deprecatedOption = _require2.deprecatedOption;

useOptions(program, ['--current-version', '--to-version', '--package-path', '--error-level', '--from-ci', '--snapshots-path']).option('--codemod-file-name-pattern <codemodFileNamePattern>', 'the file pattern which determines which files codemods are run against', 'src/**/*.js').addOption(deprecatedOption({
  args: ['--file-name-pattern <fileNamePattern>', 'the file pattern which determines which files codemods are run against', 'src/**/*.js'],
  mapTo: '--codemod-file-name-pattern'
})).option('--skip-version-migration', 'do not update the jutro version in the metadata files').action(async ({
  packagePath,
  currentVersion,
  errorLevel,
  codemodFileNamePattern,
  fileNamePattern,
  toVersion,
  skipVersionMigration,
  fromCi,
  snapshotsPath
}) => {
  const extensionProps = await getExtensionProps({
    currentVersion,
    toVersion,
    snapshotsPath,
    packageFiles: [packagePath],
    fromCi,
    errorLevel
  });
  await applyCodemods({
    errorLevel,
    codemodFileNamePattern: codemodFileNamePattern || fileNamePattern,
    toVersion,
    skipVersionMigration,
    fromCi,
    ...extensionProps
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
//# sourceMappingURL=update-jsx.js.map