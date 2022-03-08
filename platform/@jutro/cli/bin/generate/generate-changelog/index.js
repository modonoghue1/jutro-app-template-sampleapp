"use strict";

const program = require('commander');

const generateChangeLog = require('./generateChangeLog');

const _require = require('../../../src'),
      log = _require.log,
      logYellow = _require.logYellow;

const splitByComma = string => string.split(',');

program.option('--workdir <workdir>', 'working directory with git repository root', process.cwd()).option('--for-version <forVersion>', 'version corresponding to changelog; by default it takes version from package.json file in workdir').option('--ignored-scopes <ignoredScopes>', 'comma separated scopes; ignore commits that start with `<type>(<scope>)`', splitByComma, []).option('--issue-prefixes <issuePrefixes>', 'comma separated prefixes; jira issue prefixes (like `JUT-`)', splitByComma, []).action(({
  workdir,
  forVersion,
  ignoredScopes,
  issuePrefixes
}) => {
  generateChangeLog({
    workdir,
    forVersion,
    ignoredScopes,
    issuePrefixes
  }).then(message => {
    log(message);
  }).catch(message => {
    logYellow(message);
    process.exit(1);
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=index.js.map