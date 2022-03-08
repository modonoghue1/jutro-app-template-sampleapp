"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      updateApp = _require.updateApp;

const _require2 = require('../getVersion'),
      getVersion = _require2.getVersion;

const _require3 = require('../commanderUtils'),
      useOptions = _require3.useOptions,
      getExtensionProps = _require3.getExtensionProps,
      deprecatedOption = _require3.deprecatedOption;

useOptions(program, ['--to-version', '--error-level', '--package-path', '--do-npm-install', '--from-ci', '--skip-vcs', '--verbose', '--snapshots-path']).option('--metadata-file-name-pattern <metadataFileNamePattern>', 'the file name pattern to look for when updating metadata').addOption(deprecatedOption({
  args: ['--file-name-pattern <fileNamePattern>', 'the file name pattern to look for when updating metadata'],
  mapTo: '--metadata-file-name-pattern'
})).option('--schema-file-name-pattern <schemaFileNamePattern>', 'used to build a relative path from the metadata files to the schema', '**/*schema.json').option('--codemod-file-name-pattern <codemodFileNamePattern>', 'the file pattern which determines which files codemods are run against').option('--css-file-name-pattern <cssFileNamePattern>', 'the file pattern which determines which files cssmods are run against').option('--schema-output-dir <schemaOutputDir>', 'where to write the updated schema files', './').option('--branch-name <branchName>', 'git branch to store upgrade commits on').option('--dependency-install-script <dependencyInstallScript>', 'command which will be run to handle installing updated dependencies').option('--resolve-rejects', 'resolve conflicts with rejected (.rej) files', true).option('--skip-update-app-shell', 'dont execute the update shell pipline', false).action(async ({
  toVersion,
  packagePath,
  snapshotsPath,
  fromCi,
  metadataFileNamePattern,
  fileNamePattern,
  errorLevel,
  ...args
}) => {
  const basePath = path.resolve();
  const extensionProps = await getExtensionProps({
    snapshotsPath,
    packageFiles: [packagePath],
    toVersion: getVersion(toVersion),
    fromCi,
    errorLevel
  });
  const commandResult = await updateApp({ ...args,
    metadataFileNamePattern: metadataFileNamePattern || fileNamePattern,
    toVersion: getVersion(toVersion),
    basePath,
    packagePath,
    fromCi,
    errorLevel,
    ...extensionProps
  });

  if (!commandResult) {
    process.exitCode = 1;
  }
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=update-app.js.map