"use strict";

const program = require('commander');

const path = require('path');

const _require = require('../../src'),
      updateAnalyticsConfig = _require.updateAnalyticsConfig;

program.action(async () => {
  const basePath = path.resolve();
  await updateAnalyticsConfig({
    basePath
  });
}).parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
//# sourceMappingURL=enable-analytics.js.map