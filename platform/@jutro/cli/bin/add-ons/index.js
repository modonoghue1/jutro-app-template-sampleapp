"use strict";

const program = require('commander');

const path = require('path');

program.command('enable-analytics', 'enable analytics ( Google, MixPanel) into your application', {
  executableFile: path.resolve(__dirname, './enable-analytics.js')
}).command('update-commit-hooks', 'update whether or not recommended commit hooks are enabled (ESLint, Prettier, stylelint, commit message)', {
  executableFile: path.resolve(__dirname, './update-commit-hooks.js')
}).command('upgrade-modal', 'replace deprecated Modal component to Jutro Modal Next, available since Jutro 2.0.x', {
  executableFile: path.resolve(__dirname, './upgrade-modal.js')
}).command('add-auth', 'add Okta authentication into your application', {
  executableFile: path.resolve(__dirname, './add-auth.js')
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
//# sourceMappingURL=index.js.map