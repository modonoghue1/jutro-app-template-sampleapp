"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      addAuth = _require.addAuth;

program.action(async () => {
  const basePath = path.resolve();
  await addAuth({
    basePath
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=add-auth.js.map