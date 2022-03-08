"use strict";

const _require = require('../bin/check-for-cli-update'),
      getLatestVersion = _require.getLatestVersion,
      promptUpdate = _require.promptUpdate;

const _require2 = require('../src'),
      promptEnableCliAnalytics = _require2.promptEnableCliAnalytics;

const runUpdateCheck = () => {
  const latestVersion = getLatestVersion();

  if (latestVersion) {
    promptUpdate(latestVersion);
  }
};

runUpdateCheck();
promptEnableCliAnalytics();
//# sourceMappingURL=postinstall.js.map