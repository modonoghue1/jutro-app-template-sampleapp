"use strict";

const program = require('commander');

const _require = require('../../src'),
      generateComponent = _require.generateComponent;

const _require2 = require('../global-vars'),
      TEMPLATES_DIRECTORY = _require2.TEMPLATES_DIRECTORY;

const _require3 = require('../commanderUtils'),
      useOptions = _require3.useOptions;

useOptions(program.storeOptionsAsProperties(false), ['--skip-check', '--templates-directory']).option('-n, --name [name]', 'Name of the component, Wizard will be appended to name automatically').option('-p, --path [path]', 'Path to output the generated component').action(async ({
  name,
  path,
  skipCheck,
  templatesDirectory = TEMPLATES_DIRECTORY
}) => {
  generateComponent({
    name,
    path,
    type: 'wizard',
    skipCheck,
    templatesPath: templatesDirectory,
    isLogCaptured: false
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=generate-wizard.js.map