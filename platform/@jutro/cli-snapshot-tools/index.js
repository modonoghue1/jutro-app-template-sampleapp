"use strict";

const _require = require('path'),
      resolve = _require.resolve;

const _require2 = require('fs-extra'),
      pathExistsSync = _require2.pathExistsSync;

const babelConfig = resolve(__dirname, '../../..', 'babel.config.js');

if (typeof true === 'undefined' && pathExistsSync(babelConfig)) {
  require('@babel/register')({
    envName: 'cli',
    extensions: ['.ts', '.tsx', '.es6', '.es', '.jsx', '.js', '.mjs'],
    extends: babelConfig,
    ignore: [/node_modules/]
  });
}

const _require3 = require('./codemods'),
      registerCodemodActions = _require3.registerCodemodActions,
      stripNewlines = _require3.stripNewlines,
      parseSimpleValue = _require3.parseSimpleValue;

const _require4 = require('./snapshots'),
      getAvailableSnapshots = _require4.getAvailableSnapshots,
      getNextSnapshot = _require4.getNextSnapshot,
      buildSnapshot = _require4.buildSnapshot,
      buildTempPatch = _require4.buildTempPatch,
      filterSnapshotsByVersion = _require4.filterSnapshotsByVersion,
      filterSnapshotsGreaterThan = _require4.filterSnapshotsGreaterThan,
      filterSnapshotsGreaterThanOrEqual = _require4.filterSnapshotsGreaterThanOrEqual,
      filterSnapshotsLessThanOrEqual = _require4.filterSnapshotsLessThanOrEqual,
      squashSnapshots = _require4.squashSnapshots,
      extendSnapshots = _require4.extendSnapshots,
      VERSIONS_DIR = _require4.VERSIONS_DIR;

const _require5 = require('./uiMetadata'),
      actionTypes = _require5.actionTypes,
      replaceComponentPropAction = _require5.replaceComponentPropAction,
      removeComponentPropAction = _require5.removeComponentPropAction,
      createReducer = _require5.createReducer,
      replaceComponentProp = _require5.replaceComponentProp,
      removeComponentProp = _require5.removeComponentProp,
      createFilter = _require5.createFilter,
      createDataTypeFilter = _require5.createDataTypeFilter,
      createFieldFilter = _require5.createFieldFilter,
      createContainerFilter = _require5.createContainerFilter,
      createElementFilter = _require5.createElementFilter,
      createActionFilter = _require5.createActionFilter,
      createLayoutFilter = _require5.createLayoutFilter;

module.exports = {
  registerCodemodActions,
  stripNewlines,
  parseSimpleValue,
  getAvailableSnapshots,
  getNextSnapshot,
  buildSnapshot,
  buildTempPatch,
  filterSnapshotsByVersion,
  filterSnapshotsGreaterThan,
  filterSnapshotsGreaterThanOrEqual,
  filterSnapshotsLessThanOrEqual,
  squashSnapshots,
  extendSnapshots,
  VERSIONS_DIR,
  actionTypes,
  replaceComponentPropAction,
  removeComponentPropAction,
  createReducer,
  replaceComponentProp,
  removeComponentProp,
  createFilter,
  createDataTypeFilter,
  createFieldFilter,
  createContainerFilter,
  createElementFilter,
  createActionFilter,
  createLayoutFilter
};
//# sourceMappingURL=index.js.map