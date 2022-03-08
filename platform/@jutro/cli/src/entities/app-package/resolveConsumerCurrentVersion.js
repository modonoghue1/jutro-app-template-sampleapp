"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveConsumerCurrentVersion = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _cliSnapshots = require("@jutro/cli-snapshots");

var _getConsumerModuleVersion = require("./getConsumerModuleVersion");

var _prompts = require("../prompts");

const resolveConsumerCurrentVersion = async ({
  packageFiles,
  currentVersion,
  fromCi,
  snapshots = _cliSnapshots.versionSnapshots
}) => {
  const allVersionSnapshotsChoices = (0, _cliSnapshotTools.getAvailableSnapshots)({
    currentVersion: '0.0.0',
    snapshots
  }).map(({
    version
  }) => ({
    title: version,
    value: version
  }));
  const usersCurrentVersion = await (0, _prompts.singlePrompt)({
    type: 'select',
    name: 'usersCurrentVersion',
    message: 'What jutro version are you currently on',
    choices: allVersionSnapshotsChoices
  }, fromCi, currentVersion || (0, _getConsumerModuleVersion.getConsumerModuleVersion)(packageFiles));
  return usersCurrentVersion;
};

exports.resolveConsumerCurrentVersion = resolveConsumerCurrentVersion;
//# sourceMappingURL=resolveConsumerCurrentVersion.js.map