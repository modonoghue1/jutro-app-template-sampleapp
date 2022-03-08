"use strict";

const program = require('commander');

const _require = require('@jutro/cli-snapshots'),
      versionSnapshots = _require.versionSnapshots;

const _require2 = require('../../src'),
      generateSnapshot = _require2.generateSnapshot;

const _require3 = require('../global-vars'),
      TEMPLATES_DIRECTORY = _require3.TEMPLATES_DIRECTORY;

program.storeOptionsAsProperties(false).option('--from-ci', 'command is being run as part of ci').option('--snapshot-version <snapshotVersion>', 'version of the snapshot that the template extension is for').option('--snapshot-output-dir <snapshotOutputDir>', 'path to output the snapshot').option('--ignore-css-mods', 'do not include css mods in snapshot').option('--ignore-js-mods', 'do not include js mods in snapshot').option('--ignore-metadata', 'do not include metadata migration in snapshot').option('--output-format <outputFormat>', 'one of CommonJS | ES6').option('--templates-directory <templatesDirectory>', 'the path to the templates directory', TEMPLATES_DIRECTORY).action(async ({
  fromCi,
  ignoreCssMods,
  ignoreJsMods,
  ignoreMetadata,
  snapshotOutputDir,
  snapshotVersion,
  templatesDirectory,
  outputFormat
}) => {
  generateSnapshot({
    fromCi,
    ignoreCssMods,
    ignoreJsMods,
    ignoreMetadata,
    snapshotOutputDir,
    snapshots: versionSnapshots,
    snapshotVersion,
    templatesPath: templatesDirectory,
    isLogCaptured: false,
    outputFormat
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=generate-snapshot.js.map