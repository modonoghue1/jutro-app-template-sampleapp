"use strict";

const program = require('commander');

const path = require('path');

program.command('extract-messages', 'extract messsages from app', {
  executableFile: path.resolve(__dirname, './extract-messages.js')
}).command('merge-messages', 'merge inline messages with external messages', {
  executableFile: path.resolve(__dirname, './merge-messages.js')
}).command('generate-pseudo', 'generate psuedo messages', {
  executableFile: path.resolve(__dirname, './generate-pseudo.js')
}).command('generate-translation', 'generate translation of messages', {
  executableFile: path.resolve(__dirname, './generate-translation.js')
}).command('merge-biz-comp-translations', 'merge business components translations', {
  executableFile: path.resolve(__dirname, './merge-biz-comp-translations.js')
});
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
//# sourceMappingURL=index.js.map