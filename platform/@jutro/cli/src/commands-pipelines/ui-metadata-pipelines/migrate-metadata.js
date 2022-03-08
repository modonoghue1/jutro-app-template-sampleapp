"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateMetadata = void 0;

var _glob = require("glob");

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _glob2 = require("../../entities/glob");

var _uiMetadata = require("../../entities/ui-metadata");

var _pipelines = require("../../entities/pipelines");

var _prompts = require("../../entities/prompts");

const incrementalUpdate = async ({
  currentVersion,
  snapshot,
  metadataFilesToMigrate,
  schemaFiles,
  skipVersionMigration
}) => {
  if (!snapshot || !snapshot.uiMetadata) {
    return;
  }

  await (0, _uiMetadata.migrate)({
    currentVersion,
    snapshot,
    metadataFilesToMigrate,
    schemaFiles,
    skipVersionMigration
  });
};

const migrateMetadata = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Migrating metadata ...',
  logFileName: 'jutro-migrate-metadata.log',
  name: 'runMigrateMetadata'
}).setup(async ({
  metadataFileNamePattern = 'src/**/*metadata.json5',
  toVersion,
  skipVersionMigration,
  snapshots,
  schemaFileNamePattern = '**/*schema.json',
  currentVersion
}) => {
  const selectedFilenamePattern = metadataFileNamePattern || (await (0, _prompts.promptMetadataFilePattern)());
  const metadataFilesToMigrate = (0, _glob.sync)(selectedFilenamePattern, {
    ignore: _glob2.globIgnorePatterns
  });
  const schemaFilesGlobIgnorePattern = [..._glob2.globIgnorePatterns.filter(ignorePattern => !/node_modules/.test(ignorePattern)), ...['**/node_modules/!(@jutro)/**']];
  const schemaFiles = (0, _glob.sync)(schemaFileNamePattern, {
    ignore: schemaFilesGlobIgnorePattern
  });
  const allAvailableSnapshots = (0, _cliSnapshotTools.getAvailableSnapshots)({
    currentVersion,
    snapshots
  });
  return {
    snapshots: allAvailableSnapshots,
    toVersion,
    currentVersion,
    metadataFilesToMigrate,
    schemaFiles,
    skipVersionMigration
  };
}).addStep(async ({
  snapshots,
  toVersion,
  currentVersion,
  metadataFilesToMigrate,
  schemaFiles,
  skipVersionMigration,
  logFileName,
  snapshot
}) => {
  if (snapshot) {
    await incrementalUpdate({
      snapshot,
      currentVersion,
      metadataFilesToMigrate,
      schemaFiles,
      skipVersionMigration
    });
  } else {
    const incrementalSnapshotsToRun = (0, _cliSnapshotTools.filterSnapshotsByVersion)(snapshots, toVersion);

    for await (const incrementalSnapshot of incrementalSnapshotsToRun) {
      await incrementalUpdate({
        currentVersion,
        metadataFilesToMigrate,
        schemaFiles,
        skipVersionMigration,
        snapshot: incrementalSnapshot
      });
    }
  }

  return {
    successLogFileName: `${logFileName}-${currentVersion}-${toVersion}`
  };
});
exports.migrateMetadata = migrateMetadata;
//# sourceMappingURL=migrate-metadata.js.map