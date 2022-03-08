"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      runSnapshotCodemods = _require.runSnapshotCodemods,
      migrateUsingFeatureSnapshot = _require.migrateUsingFeatureSnapshot;

program.option('--package-path <packagePath>', 'The path to the applications package.json').action(async ({
  packagePath
}) => {
  const basePath = path.resolve();
  await migrateUsingFeatureSnapshot({
    featureName: 'updateModal',
    packagePath,
    basePath,
    upgradeRunners: [runSnapshotCodemods]
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=upgrade-modal.js.map