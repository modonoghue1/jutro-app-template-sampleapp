"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePackageTemplate = void 0;

var _fsExtra = require("fs-extra");

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _get = _interopRequireDefault(require("lodash/get"));

var _last = _interopRequireDefault(require("lodash/last"));

var _path = _interopRequireDefault(require("path"));

var _pipelines = require("../../entities/pipelines");

var _appPackage = require("../../entities/app-package");

var _prompts = require("../../entities/prompts");

var _logging = require("../../entities/logging");

const promptSnapshotVersion = async (allVersionSnapshots, allVersionSnapshotsChoices, fromCi, snapshotVersion) => (0, _prompts.singlePrompt)({
  type: 'select',
  name: 'selectedSnapshotVersion',
  message: 'What jutro snapshot version is the package template extending?',
  choices: allVersionSnapshotsChoices,
  defaultChoice: (0, _last.default)(allVersionSnapshots)
}, fromCi, snapshotVersion);

const promptOutputDir = async ({
  fromCi,
  templateOutputDir,
  snapshotVersion
}) => (0, _prompts.singlePrompt)({
  type: 'text',
  name: 'selectedOutputDir',
  initial: _path.default.resolve(process.cwd(), 'snapshots', snapshotVersion || '0.0.0', 'package-template.json'),
  message: 'Where should the package template be generated?'
}, fromCi, templateOutputDir);

const promptExtenstionPackagePath = async ({
  fromCi,
  extensionPackagePath
}) => (0, _prompts.singlePrompt)({
  type: 'text',
  name: 'extensionPackagePath',
  initial: 'package.json',
  message: 'What is the path to the package.json with the template extensions?'
}, fromCi, extensionPackagePath);

const generatePackageTemplate = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Generate Package Template Extension',
  logFileName: 'jutro-package-template-generation.log'
}).setup(async ({
  basePackagePath,
  extensionPackagePath,
  fromCi,
  snapshots,
  snapshotVersion,
  templateOutputDir
}) => {
  const allVersionSnapshotsChoices = !basePackagePath && snapshots.map(({
    version
  }) => ({
    title: version,
    value: version
  }));
  const selectedSnapshotVersion = !basePackagePath && (await promptSnapshotVersion(snapshots, allVersionSnapshotsChoices, fromCi, snapshotVersion));

  if (!basePackagePath && (0, _isNil.default)(selectedSnapshotVersion)) {
    (0, _logging.logYellow)(`Could not find a corresponding snapshot for version: ${selectedSnapshotVersion}`);
    return null;
  }

  const _ref = !basePackagePath && snapshots.find(snapshot => snapshot.version === selectedSnapshotVersion),
        template = _ref.template;

  const basePackage = basePackagePath ? (0, _appPackage.getConsumerApplicationPackage)(basePackagePath) : template;
  const selectedExtensionPackagePath = await promptExtenstionPackagePath({
    extensionPackagePath,
    fromCi
  });
  const extensionPackage = (0, _appPackage.getConsumerApplicationPackage)(selectedExtensionPackagePath);
  const selectedOutputDir = await promptOutputDir({
    fromCi,
    templateOutputDir,
    snapshotVersion: selectedSnapshotVersion
  });
  return {
    basePackage,
    extensionPackage,
    templateOutputDir: selectedOutputDir
  };
}).addStep(({
  basePackage,
  extensionPackage,
  templateOutputDir
}) => {
  const fieldsToUpdate = ['dependencies', 'devDependencies', 'peerDependencies', 'scripts', 'engines', 'deprecatedPackages', 'packagesToRemove'];
  const extendedPackageTemplate = fieldsToUpdate.reduce((acc, field) => {
    try {
      const fieldExtension = Object.entries(extensionPackage[field]).filter(([extensionKey]) => !(0, _get.default)(basePackage, [field, extensionKey])).reduce((fieldAcc, [key, value]) => ({
        [key]: value,
        ...fieldAcc
      }), acc[field]);
      return { ...acc,
        [field]: fieldExtension
      };
    } catch (error) {
      (0, _logging.logYellow)(`Field not found in extending package-template: ${field}`);
      return { ...acc
      };
    }
  }, basePackage);
  (0, _fsExtra.outputJSONSync)(templateOutputDir, extendedPackageTemplate, {
    spaces: 2
  });
});
exports.generatePackageTemplate = generatePackageTemplate;
//# sourceMappingURL=generate-package-template.js.map