"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateUsingFeatureSnapshot = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _cliSnapshots = require("@jutro/cli-snapshots");

var _path = _interopRequireDefault(require("path"));

var _glob = require("glob");

var _logging = require("../../entities/logging");

var _glob2 = require("../../entities/glob");

var _appPackage = require("../../entities/app-package");

var _codemods = require("../../entities/codemods");

var _pipelines = require("../../entities/pipelines");

var _snapshots = require("../../entities/snapshots");

var _uiMetadata = require("../../entities/ui-metadata");

const FEATURE_SNAPSHOTS_DIR = _path.default.resolve(__dirname, '../features');

const migrateUsingFeatureSnapshot = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Migrating feature snapshots...',
  logFileName: 'jutro-upgrade-modal-cli.log'
}).setup(async ({
  codemodFileNamePattern = '**/*.js',
  featureName,
  features = _cliSnapshots.featureSnapshots,
  featuresDir = FEATURE_SNAPSHOTS_DIR,
  customGlobIgnorePattern,
  metadataFileNamePattern = '**/*.metadata.json5',
  packagePath = 'package.json',
  schemaFileNamePattern = '**/*.schema.json',
  upgradeRunners = [_appPackage.migrateFeaturePackage, _uiMetadata.migrate, _codemods.runSnapshotCodemods]
}) => {
  const currentVersion = (0, _appPackage.getConsumerApplicationVersion)(packagePath);
  const featureSnapshot = features.find(feature => feature.name === featureName);

  if (!featureSnapshot) {
    (0, _logging.logRed)(`Unable to find migration scripts for ${featureName}`);
    process.exit(1);
    return null;
  }

  const isApplicableFeature = (0, _cliSnapshotTools.filterSnapshotsByVersion)([featureSnapshot], currentVersion).length > 0;

  if (!isApplicableFeature) {
    (0, _logging.logRed)(`${featureName} has a version requirement of ${featureSnapshot.version} which your application version ${currentVersion} does not satisfy.`);
    process.exit(1);
    return null;
  }

  const schemaFilesTo = (0, _glob.sync)(schemaFileNamePattern, {
    ignore: customGlobIgnorePattern || _glob2.globIgnorePatterns
  });
  const metadataFilesToMigrate = (0, _glob.sync)(metadataFileNamePattern, {
    ignore: customGlobIgnorePattern || _glob2.globIgnorePatterns
  });
  const filesToApplyCodemods = (0, _glob.sync)(codemodFileNamePattern, {
    ignore: customGlobIgnorePattern || _glob2.globIgnorePatterns
  });
  return {
    snapshots: [featureSnapshot],
    toVersion: currentVersion,
    codemodFileNamePattern,
    currentVersion,
    featuresDir,
    filesToApplyCodemods,
    metadataFilesToMigrate,
    packagePath,
    schemaFilesTo,
    upgradeRunners
  };
}).addStep(async ({
  upgradeRunners,
  ...config
}, previousValue, beforeEachOutput) => _snapshots.executeUpgradeRunners.addStep(...upgradeRunners.map(runner => () => runner))(config, previousValue, beforeEachOutput)).addStep(async ({
  featureName
}) => {
  (0, _logging.logGreen)(`Finished adding feature ${featureName} to your application.`);
});
exports.migrateUsingFeatureSnapshot = migrateUsingFeatureSnapshot;
//# sourceMappingURL=migrate-using-feature-snapshot.js.map