"use strict";

const program = require('commander');

const _require = require('../../src'),
      generatePage = _require.generatePage;

const _require2 = require('../global-vars'),
      TEMPLATES_DIRECTORY = _require2.TEMPLATES_DIRECTORY;

const _require3 = require('../commanderUtils'),
      useOptions = _require3.useOptions;

useOptions(program.storeOptionsAsProperties(false), ['--skip-check', '--templates-directory']).option('-n, --name [name]', 'Name of the page component').option('-p, --path [path]', 'Path to output the generated page').option('--skip-setup', 'skip adding the new page to the application routes and component map', false).option('--type <type>', 'Type of the component generate, one of component | form | wizard').option('--path-to-component-map <pathToComponentMap>', 'Relative path to the app level component map to enable auto setup').option('--path-to-app-routes <pathToAppRoutes>', 'Relative path to the app level routes to enable auto setup').action(async ({
  name,
  path,
  pathToAppRoutes,
  pathToComponentMap,
  skipCheck,
  skipSetup,
  templatesDirectory = TEMPLATES_DIRECTORY,
  type
}) => {
  generatePage({
    isLogCaptured: false,
    name,
    path,
    pathToAppRoutes,
    pathToComponentMap,
    templatesPath: templatesDirectory,
    skipCheck,
    skipSetup,
    type
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=generate-page.js.map