"use strict";

const program = require('commander');

const _require = require('../../src'),
      migrateMetadata = _require.migrateMetadata;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions,
      getExtensionProps = _require2.getExtensionProps,
      deprecatedOption = _require2.deprecatedOption;

useOptions(program, ['--current-version', '--to-version', '--error-level', '--from-ci', '--snapshots-path']).option('--metadata-file-name-pattern <metadataFileNamePattern>', 'the file name pattern used to filter files to be migrated', 'src/**/*metadata.json5').addOption(deprecatedOption({
  args: ['--file-name-pattern <fileNamePattern>', 'the file name pattern used to filter files to be migrated', 'src/**/*metadata.json5'],
  mapTo: '--metadata-file-name-pattern'
})).option('--skip-version-migration', 'do not update the jutro version in the metadata files').option('--schema-file-name-pattern <schemaFileNamePattern>', 'used to build a relative path from the metadata files to the schema', '**/*schema.json').action(async ({
  errorLevel,
  currentVersion,
  metadataFileNamePattern,
  fileNamePattern,
  toVersion,
  skipVersionMigration,
  fromCi,
  schemaFileNamePattern,
  snapshotsPath
}) => {
  const extensionProps = await getExtensionProps({
    currentVersion,
    snapshotsPath,
    toVersion,
    fromCi,
    errorLevel
  });
  await migrateMetadata({
    errorLevel,
    currentVersion,
    metadataFileNamePattern: metadataFileNamePattern || fileNamePattern,
    toVersion,
    skipVersionMigration,
    fromCi,
    schemaFileNamePattern,
    ...extensionProps
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=update-metadata.js.map