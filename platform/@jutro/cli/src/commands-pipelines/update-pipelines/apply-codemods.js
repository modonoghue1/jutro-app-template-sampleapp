"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyCodemods = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _glob = require("glob");

var _glob2 = require("../../entities/glob");

var _prompts = require("../../entities/prompts");

var _codemods = require("../../entities/codemods");

var _pipelines = require("../../entities/pipelines");

const applyCodemods = (0, _pipelines.Pipeline)({
  name: 'runApplyCodemods'
}).addStep(async ({
  codemodFileNamePattern,
  fromCi
}) => {
  if (!codemodFileNamePattern) {
    return (0, _prompts.promptCodemodFilePattern)(fromCi);
  }

  return codemodFileNamePattern;
}).addStep(async ({
  toVersion,
  snapshots,
  currentVersion
}, selectedFilenamePattern) => {
  const allAvailableSnapshots = (0, _cliSnapshotTools.getAvailableSnapshots)({
    currentVersion,
    snapshots
  });
  const filteredSnapshots = (0, _cliSnapshotTools.filterSnapshotsByVersion)(allAvailableSnapshots, toVersion);
  const filesToApplyCodemods = (0, _glob.sync)(selectedFilenamePattern, {
    ignore: _glob2.globIgnorePatterns
  });

  for await (const snapshot of filteredSnapshots) {
    await (0, _codemods.runSnapshotCodemods)({
      filesToApplyCodemods,
      snapshot
    });
  }
});
exports.applyCodemods = applyCodemods;
//# sourceMappingURL=apply-codemods.js.map