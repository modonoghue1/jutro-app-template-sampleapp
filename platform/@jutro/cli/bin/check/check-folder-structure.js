"use strict";

const program = require('commander');

const path = require('path');

const _require = require('@jutro/cli-snapshot-tools'),
      filterSnapshotsGreaterThanOrEqual = _require.filterSnapshotsGreaterThanOrEqual;

const _require2 = require('../../src'),
      checkFolderStructure = _require2.checkFolderStructure;

const _require3 = require('../commanderUtils'),
      useOptions = _require3.useOptions,
      getExtensionProps = _require3.getExtensionProps,
      deprecatedOption = _require3.deprecatedOption;

useOptions(program, ['--current-version', ['--error-level', {
  default: ['error']
}], '--from-ci', '--snapshots-path']).option('--folder-template-path <folderTemplatePath>', 'path to custom folder structure template').option('--folder-path <folderPath>', 'path to the folder structure to validate').addOption(deprecatedOption({
  args: ['--log-level <errorLevel>', 'set validation to "warn" or "error"'],
  mapTo: '--error-level'
})).action(async ({
  fromCi,
  currentVersion,
  errorLevel,
  folderPath,
  folderTemplatePath,
  logLevel,
  snapshotsPath
}) => {
  const basePath = path.resolve();
  const extensionProps = await getExtensionProps({
    fromCi,
    currentVersion,
    snapshotsPath,
    shouldPromptToVersion: false,
    availableSnapshotsFilter: filterSnapshotsGreaterThanOrEqual,
    errorLevel: errorLevel || logLevel
  });
  await checkFolderStructure({
    basePath,
    errorLevel: errorLevel || logLevel,
    folderPath,
    folderTemplatePath,
    ...extensionProps
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
});
program.parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=check-folder-structure.js.map