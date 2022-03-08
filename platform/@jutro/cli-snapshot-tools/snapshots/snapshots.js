"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSIONS_DIR = exports.squashSnapshots = exports.getNextSnapshot = exports.getAvailableSnapshots = exports.filterSnapshotsLessThanOrEqual = exports.filterSnapshotsGreaterThanOrEqual = exports.filterSnapshotsGreaterThan = exports.filterSnapshotsByVersion = exports.buildTempPatch = exports.buildSnapshot = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _semver = _interopRequireDefault(require("semver"));

var _get = _interopRequireDefault(require("lodash/get"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _last = _interopRequireDefault(require("lodash/last"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _path = require("path");

var _tmp = require("tmp");

const VERSIONS_DIR = 'cliVersions';
exports.VERSIONS_DIR = VERSIONS_DIR;

const compareSnapshotVersions = (snapshotA, snapshotB) => {
  const versionA = snapshotA.version;
  const versionB = snapshotB.version;

  if (_semver.default.lt(versionA, versionB)) {
    return -1;
  }

  if (_semver.default.lt(versionB, versionA)) {
    return 1;
  }

  return 0;
};

const buildSnapshot = (fromDir, versionsDir = VERSIONS_DIR) => {
  let templateData = {};

  try {
    templateData = _fsExtra.default.readJSONSync((0, _path.join)(versionsDir, fromDir, 'package-template.json'));
  } catch (e) {
    console.log('unable to find template data for snapshot object');
  }

  let uiMetadata = {};

  try {
    const pathToMigrationScripts = (0, _path.join)(versionsDir, fromDir, 'uiMetadataMigration');
    uiMetadata = require(pathToMigrationScripts);
  } catch (e) {
    console.log('unable to find ui metadata update scripts for snapshot object');
  }

  let codemods = {};

  try {
    const pathToCodemodsScripts = (0, _path.join)(versionsDir, fromDir, 'codemods');
    codemods = require(pathToCodemodsScripts);
  } catch (e) {
    console.log(`no codemods update scripts for snapshot version ${fromDir}`);
  }

  let diff = {};

  try {
    const pathToDiff = (0, _path.join)(versionsDir, fromDir, 'diffs', 'diff.text');
    diff = _fsExtra.default.readFileSync(pathToDiff).toString();
  } catch (e) {
    console.log(`no upgrade patch found for snapshot version ${fromDir}`);
  }

  let folderStructure = [];

  try {
    const pathToFolderStructure = (0, _path.join)(versionsDir, fromDir, 'folder-structure.json');
    folderStructure = require(pathToFolderStructure);
  } catch (e) {
    console.log(`no folder structure for snapshot version ${fromDir}`);
  }

  if ([templateData, uiMetadata, codemods, diff, folderStructure].every(_isEmpty.default)) {
    return null;
  }

  return {
    template: templateData,
    version: templateData ? templateData.version : fromDir,
    codemods,
    uiMetadata,
    diff,
    folderStructure
  };
};

exports.buildSnapshot = buildSnapshot;

const isSameBucket = (previousVersion, currentversion) => _semver.default.major(previousVersion) === _semver.default.major(currentversion) && _semver.default.minor(previousVersion) === _semver.default.minor(currentversion);

const omitRemovedPackagesFromMergedSnapshot = (packagesToRemove, mergedSnapshot) => {
  const packagesToRemoveList = packagesToRemove.map(entry => entry.packageName);
  const updatedDependencies = (0, _omit.default)(mergedSnapshot.template.dependencies, [...packagesToRemoveList]);
  const updatedDevDependencies = (0, _omit.default)(mergedSnapshot.template.devDependencies, [...packagesToRemoveList]);
  return { ...mergedSnapshot,
    template: { ...mergedSnapshot.template,
      dependencies: updatedDependencies,
      devDependencies: updatedDevDependencies
    }
  };
};

const getAvailableSnapshots = ({
  currentVersion,
  filter = filterSnapshotsGreaterThan,
  snapshots
}) => {
  try {
    const filteredByVersion = filterSnapshotsByVersion(snapshots, currentVersion, filter);
    return filteredByVersion.sort(compareSnapshotVersions);
  } catch (e) {
    console.log('unable to retrieve available snapshots');
    return [];
  }
};

exports.getAvailableSnapshots = getAvailableSnapshots;

const squashSnapshots = ({
  currentVersion,
  snapshots,
  includeVersion,
  availableSnapshotsFilter = filterSnapshotsGreaterThan,
  isInSameBucket = isSameBucket
}) => {
  if (!snapshots.length) {
    return [];
  }

  const availableSnapshots = getAvailableSnapshots({
    currentVersion,
    snapshots,
    filter: availableSnapshotsFilter
  });

  const getSnapshotsToSquash = unfilteredSnapshots => includeVersion ? filterSnapshotsByVersion(unfilteredSnapshots, includeVersion, filterSnapshotsLessThanOrEqual) : unfilteredSnapshots;

  const ensureSpreadable = obj => obj && !(0, _isEmpty.default)(obj) ? obj : [];

  const ensureArray = snapshotField => Array.isArray(snapshotField) ? snapshotField : [snapshotField];

  const addToBucket = (snapshot, bucket) => {
    const name = snapshot.name,
          version = snapshot.version;
    const combinedBucket = {};
    const snapshotFields = ['template', 'diff', 'uiMetadata', 'codemods', 'cssMods', 'fileNameMap', 'folderStructure'];
    snapshotFields.forEach(field => {
      switch (field) {
        case 'template':
          combinedBucket.template = (0, _merge.default)({}, bucket.template, snapshot.template);
          break;

        case 'diff':
          combinedBucket.diff = [...ensureSpreadable(bucket.diff), ...(ensureArray(snapshot.diff) || null)];
          break;

        case 'uiMetadata':
          combinedBucket.uiMetadata = [...ensureSpreadable(bucket.uiMetadata), ...(ensureArray(snapshot.uiMetadata) || null)];
          break;

        case 'codemods':
          combinedBucket.codemods = [...ensureSpreadable(bucket.codemods), ...(ensureArray(snapshot.codemods) || null)];
          break;

        case 'cssMods':
          combinedBucket.cssMods = (0, _merge.default)({}, bucket.cssMods, snapshot.cssMods);
          break;

        case 'fileNameMap':
          combinedBucket.fileNameMap = (0, _merge.default)({}, bucket.fileNameMap, snapshot.fileNameMap);
          break;

        case 'folderStructure':
          combinedBucket.folderStructure = snapshot.folderStructure;
          break;

        default:
          break;
      }
    });
    combinedBucket.name = name;
    combinedBucket.version = version;
    return combinedBucket;
  };

  const snapshotsToSquash = getSnapshotsToSquash(availableSnapshots);

  if (!snapshotsToSquash.length) {
    return [];
  }

  const firstSnapshotBucket = addToBucket(snapshotsToSquash.shift(), {});
  return !snapshotsToSquash.length ? [firstSnapshotBucket] : snapshotsToSquash.reduce((squashed, snapshot) => {
    const version = snapshot.version;
    const currentBucket = (0, _last.default)(squashed);
    const lastVersion = (0, _get.default)(currentBucket, 'version');
    const updatedSquashed = [...squashed];

    if (isInSameBucket(lastVersion, version)) {
      const mergedBucket = addToBucket(snapshot, currentBucket);
      const packagesToRemove = mergedBucket.template.packagesToRemove;
      const updatedSnapshot = packagesToRemove && packagesToRemove.length ? omitRemovedPackagesFromMergedSnapshot(packagesToRemove, mergedBucket) : mergedBucket;
      updatedSquashed[updatedSquashed.length - 1] = updatedSnapshot;
    } else {
      updatedSquashed.push(addToBucket(snapshot, {}));
    }

    return updatedSquashed;
  }, [firstSnapshotBucket]);
};

exports.squashSnapshots = squashSnapshots;

const getNextSnapshot = (currentVersion, snapshots) => {
  const availableSnapshots = getAvailableSnapshots({
    currentVersion,
    snapshots
  });
  return availableSnapshots.length ? availableSnapshots[0] : null;
};

exports.getNextSnapshot = getNextSnapshot;

const filterSnapshotsLessThanOrEqual = version => snapshot => _semver.default.lte(snapshot.version, version);

exports.filterSnapshotsLessThanOrEqual = filterSnapshotsLessThanOrEqual;

const filterSnapshotsGreaterThan = version => snapshot => _semver.default.gt(snapshot.version, version);

exports.filterSnapshotsGreaterThan = filterSnapshotsGreaterThan;

const filterSnapshotsGreaterThanOrEqual = version => snapshot => _semver.default.gte(snapshot.version, version);

exports.filterSnapshotsGreaterThanOrEqual = filterSnapshotsGreaterThanOrEqual;

const filterSnapshotsByVersion = (snapshotsToFilter, version, filterBy = filterSnapshotsLessThanOrEqual) => snapshotsToFilter.default ? snapshotsToFilter.default.filter(filterBy(version)) : snapshotsToFilter.filter(filterBy(version));

exports.filterSnapshotsByVersion = filterSnapshotsByVersion;

const buildTempPatch = fileContent => {
  try {
    const tempPatchPath = (0, _tmp.fileSync)({
      postfix: '.patch'
    }).name;

    _fsExtra.default.outputFileSync(tempPatchPath, fileContent);

    return tempPatchPath;
  } catch (e) {
    console.log(`Unable to build temporary patch:\n${e}`);
  }

  return undefined;
};

exports.buildTempPatch = buildTempPatch;
//# sourceMappingURL=snapshots.js.map