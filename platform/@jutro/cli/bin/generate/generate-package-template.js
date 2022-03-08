"use strict";

const program = require('commander');

const _require = require('@jutro/cli-snapshots'),
      versionSnapshots = _require.versionSnapshots;

const _require2 = require('../../src'),
      generatePackageTemplate = _require2.generatePackageTemplate;

program.storeOptionsAsProperties(false).option('--template-output-dir <templateOutputDir>', 'path to output package-template').option('--from-ci', 'command is being run as part of ci').option('--snapshot-version <snapshotVersion>', 'version of the snapshot that the template extension is for').option('--base-package-path <basePackagePath>', 'if unset will use the template-package from the snapshot version').option('--extension-package-path <extensionPackagePath>', 'path to the package.json with extensions').action(async ({
  basePackagePath,
  snapshotVersion,
  extensionPackagePath,
  fromCi,
  templateOutputDir
}) => {
  generatePackageTemplate({
    basePackagePath,
    snapshotVersion,
    extensionPackagePath,
    fromCi,
    snapshots: versionSnapshots,
    templateOutputDir
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=generate-package-template.js.map