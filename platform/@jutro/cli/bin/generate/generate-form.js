"use strict";

const program = require('commander');

const _require = require('../../src'),
      generateComponent = _require.generateComponent;

const _require2 = require('../global-vars'),
      TEMPLATES_DIRECTORY = _require2.TEMPLATES_DIRECTORY;

program.storeOptionsAsProperties(false).option('-n, --name [name]', 'Name of the component').option('-p, --path [path]', 'Path to output the generated component').option('--skip-check', 'skip verifying that the command is being run inside a jutro-application').option('--templates-directory <templatesDirectory>', 'the path to the templates directory default - Jutro Templates').option('--error-level <errorLevel>', 'error level = "error" will bubble an error out of the cli', 'warn').action(async ({
  errorLevel,
  name,
  path,
  skipCheck,
  templatesDirectory = TEMPLATES_DIRECTORY
}) => {
  generateComponent({
    errorLevel,
    name,
    path,
    skipCheck,
    type: 'form',
    templatesPath: templatesDirectory,
    isLogCaptured: false
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=generate-form.js.map