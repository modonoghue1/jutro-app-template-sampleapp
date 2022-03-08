"use strict";

const path = require('path');

const program = require('commander');

const _require = require('../../src'),
      checkAppVersion = _require.checkAppVersion;

const _require2 = require('../commanderUtils'),
      useOptions = _require2.useOptions;

useOptions(program, ['--error-level']).action(async params => {
  const basePath = path.resolve();
  await checkAppVersion({ ...params,
    basePath
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });
}).parse(process.argv);
//# sourceMappingURL=check-version.js.map