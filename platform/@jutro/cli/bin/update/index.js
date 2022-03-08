"use strict";

const program = require('commander');

const path = require('path');

program.command('app', 'upgrade jutro application', {
  executableFile: path.resolve(__dirname, './update-app.js')
}).command('app-shell', 'update application shell files', {
  executableFile: path.resolve(__dirname, './update-app-shell.js')
}).command('cli', 'update jutro-cli package', {
  executableFile: path.resolve(__dirname, './update-cli.js')
}).command('css', 'update application .scss files', {
  executableFile: path.resolve(__dirname, './update-css.js')
}).command('dependencies', 'update application dependencies (also including devDependencies, peerDependencies, engines)', {
  executableFile: path.resolve(__dirname, './update-dependencies.js')
}).command('jsx', 'apply updates to javascript and jsx files', {
  executableFile: path.resolve(__dirname, './update-jsx.js')
}).command('json-schema', 'update the JSON schema', {
  executableFile: path.resolve(__dirname, './update-json-schema.js')
}).command('metadata', 'migrate UI metadata to a newer version', {
  executableFile: path.resolve(__dirname, './update-metadata.js')
}).command('module', 'update project module', {
  executableFile: path.resolve(__dirname, './update-module.js')
}).command('scripts', 'update application package.json scripts', {
  executableFile: path.resolve(__dirname, './update-scripts.js')
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
//# sourceMappingURL=index.js.map