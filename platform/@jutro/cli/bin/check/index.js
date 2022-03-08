"use strict";

const program = require('commander');

const path = require('path');

program.command('dependencies', 'check required dependencies have been declared in package.json', {
  executableFile: path.resolve(__dirname, './check-dependencies.js')
}).command('deprecated', 'check for deprecated packages and prompt for removal', {
  executableFile: path.resolve(__dirname, './check-deprecated.js')
}).command('environment', 'environment information', {
  executableFile: path.resolve(__dirname, './check-environment.js')
}).command('metadata', 'validate UI metadata', {
  executableFile: path.resolve(__dirname, './check-metadata.js')
}).command('folder-structure', 'validate application files and folder structure', {
  executableFile: path.resolve(__dirname, './check-folder-structure.js')
}).command('version', 'check & compare jutro-app package version with latest', {
  executableFile: path.resolve(__dirname, './check-version.js')
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
//# sourceMappingURL=index.js.map