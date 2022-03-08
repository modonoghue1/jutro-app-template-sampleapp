"use strict";

const program = require('commander');

const path = require('path');

program.command('build-info', 'generate build information', {
  executableFile: path.resolve(__dirname, './generate-build-info.js')
}).command('changelog', 'generates changelog based on commit messages', {
  executableFile: path.resolve(__dirname, './generate-changelog/index.js')
}).command('component', 'generate a jutro component', {
  executableFile: path.resolve(__dirname, './generate-component.js')
}).command('form', 'generate a jutro form component', {
  executableFile: path.resolve(__dirname, './generate-form.js')
}).command('package-template', 'generate a package template used in jutro migration extension', {
  executableFile: path.resolve(__dirname, './generate-package-template.js')
}).command('page', 'generate a jutro page component', {
  executableFile: path.resolve(__dirname, './generate-page.js')
}).command('snapshot', 'generate a custom snapshot', {
  executableFile: path.resolve(__dirname, './generate-snapshot.js')
}).command('wizard', 'generate a jutro wizard component', {
  executableFile: path.resolve(__dirname, './generate-wizard.js')
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
//# sourceMappingURL=index.js.map