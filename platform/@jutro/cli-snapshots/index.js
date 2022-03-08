"use strict";

const _require = require('path'),
      resolve = _require.resolve;

const _require2 = require('fs-extra'),
      pathExistsSync = _require2.pathExistsSync;

const _require3 = require('semver'),
      gt = _require3.gt;

const _require4 = require('@jutro/cli-snapshot-tools'),
      squashSnapshots = _require4.squashSnapshots;

const babelConfig = resolve(__dirname, '../../..', 'babel.config.js');

if (typeof true === 'undefined' && pathExistsSync(babelConfig)) {
  require('@babel/register')({
    envName: 'cli',
    extensions: ['.ts', '.tsx', '.es6', '.es', '.jsx', '.js', '.mjs'],
    extends: babelConfig,
    ignore: [/node_modules/]
  });
}

const _require5 = require('./features'),
      featureSnapshots = _require5.versions;

const _require6 = require('./versions'),
      versions = _require6.versions;

const isInSameBucket = (previousVersion, currentVersion) => previousVersion.includes('next') && gt(currentVersion, previousVersion);

const versionSnapshots = squashSnapshots({
  currentVersion: versions[0].version,
  snapshots: versions,
  includeVersion: versions[versions.length - 1].version,
  isInSameBucket
});
module.exports = {
  featureSnapshots,
  versionSnapshots
};
//# sourceMappingURL=index.js.map