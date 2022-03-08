"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSnapshot = void 0;

var _path = require("path");

var _fsExtra = require("fs-extra");

var _pipelines = require("../../entities/pipelines");

var _generators = require("../../entities/generators");

var _prompts = require("../../entities/prompts");

var _logging = require("../../entities/logging");

const generationMessages = {
  errors: {
    emptyVersion: 'Version of snapshot cannot be empty.',
    emptyTemplates: 'Templates path cannot be empty.'
  }
};

const promptSnapshotVersion = async ({
  allVersionSnapshotsChoices,
  fromCi,
  snapshots,
  snapshotVersion
}) => (0, _prompts.singlePrompt)({
  type: 'select',
  name: 'selectedSnapshotVersion',
  message: 'What jutro snapshot version is the package template extending?',
  choices: allVersionSnapshotsChoices,
  defaultChoice: snapshots[snapshots.length - 1].version
}, fromCi, snapshotVersion);

const promptForOutputPath = async ({
  fromCi,
  snapshotOutputDir
}) => (0, _prompts.singlePrompt)({
  type: 'text',
  name: 'snapshotOutputPath',
  message: 'Where should the snapshots be output?',
  initial: (0, _path.resolve)(process.cwd(), 'snapshots')
}, fromCi, snapshotOutputDir);

const promptForOutputFormat = async ({
  fromCi,
  outputFormat
}) => (0, _prompts.singlePrompt)({
  type: 'select',
  name: 'outputFormat',
  message: 'What jutro snapshot version is the package template extending?',
  choices: [{
    title: 'ES6',
    value: 'ES6'
  }, {
    title: 'CommonJS',
    value: 'CommonJS'
  }],
  defaultChoice: 'CommonJS'
}, fromCi, outputFormat);

const generateSnapshot = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Generate migration snapshot',
  logFileName: 'jutro-migration-snapshot-generation.log'
}).setup(async ({
  fromCi,
  outputFormat,
  ignoreCssMods,
  ignoreJsMods,
  ignoreMetadata,
  snapshotOutputDir,
  snapshots,
  snapshotVersion,
  templatesPath
}) => {
  const allVersionSnapshotsChoices = snapshots.map(({
    version
  }) => ({
    title: version,
    value: version
  }));
  const selectedSnapshotVersion = await promptSnapshotVersion({
    allVersionSnapshotsChoices,
    fromCi,
    snapshots,
    snapshotVersion
  });
  const ignoreOptions = {
    ignoreCssMods,
    ignoreJsMods,
    ignoreMetadata
  };
  const selectedPath = await promptForOutputPath({
    fromCi,
    snapshotOutputDir
  });

  if (!selectedSnapshotVersion || selectedSnapshotVersion.length === 0) {
    throw Error(generationMessages.errors.emptyVersion);
  }

  if (!templatesPath) {
    throw Error(generationMessages.errors.emptyTemplates);
  }

  const selectedOutputFormat = await promptForOutputFormat({
    fromCi,
    outputFormat
  });
  await (0, _generators.generator)({
    config: ['cli-extensions', selectedOutputFormat],
    args: {
      path: selectedPath
    },
    name: selectedSnapshotVersion,
    pathToTemplates: templatesPath
  });
  Object.entries(ignoreOptions).forEach(([key, value]) => {
    if (value) {
      try {
        switch (key) {
          case 'ignoreCssMods':
            (0, _fsExtra.rmdirSync)((0, _path.resolve)(selectedPath, selectedSnapshotVersion, 'cssmods'), {
              recursive: true
            });
            break;

          case 'ignoreJsMods':
            (0, _fsExtra.rmdirSync)((0, _path.resolve)(selectedPath, selectedSnapshotVersion, 'codemods'), {
              recursive: true
            });
            break;

          case 'ignoreMetadata':
            (0, _fsExtra.rmdirSync)((0, _path.resolve)(selectedPath, selectedSnapshotVersion, 'uiMetadataMigration'), {
              recursive: true
            });
            break;

          default:
            break;
        }
      } catch (error) {
        (0, _logging.logYellow)(`Unable to ignore feature: ${key}`);
      }
    }
  });
});
exports.generateSnapshot = generateSnapshot;
//# sourceMappingURL=generate-snapshot.js.map