"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      generatePseudo = _require.generatePseudo;

program.storeOptionsAsProperties(true).option('--error-level <errorLevel>', 'error level = "error" will bubble an error out of the cli', 'warn').option('--target-type <targetType>', 'defines the expected input type for the pseudolizer', 'FILES').option('--pseudoType <pseudoType>', 'pseudoType can be one of ["EXPANSION","SHERLOCK","BOTH"]', 'sherlock').option('--outputFileName <outputFileName>', 'defines the output file name template', 'yy.json').option('-V, --version', 'output version number', false).option('--task <task>', 'Task can be one of ["FILE_PATTERNS","SINGLE_KEY","CONFIG_FILE"]').option('--inputFile <inputFile>', 'defines a custom input file').option('--key <keyString>', 'key string').option('--source <sourceString>', 'source string').option('--configFile <configFile>', 'path to the configuration file').option('-h, --help', 'output usage information', false).action(({
  errorLevel,
  targetType,
  pseudoType,
  outputFileName,
  version,
  task,
  keyString,
  sourceString,
  configFile,
  help,
  inputFile
}) => {
  const basePath = path.resolve();
  generatePseudo({
    basePath,
    configFile,
    errorLevel,
    help,
    inputFile,
    keyString,
    outputFileName,
    pseudoType,
    sourceString,
    targetType,
    task,
    version
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=generate-pseudo.js.map