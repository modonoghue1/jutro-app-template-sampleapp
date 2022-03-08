"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/interopRequireWildcard"));

const _require = require('@jutro/cli-snapshot-tools'),
      extendSnapshots = _require.extendSnapshots,
      squashSnapshots = _require.squashSnapshots;

const _require2 = require('@jutro/cli-snapshots'),
      versionSnapshots = _require2.versionSnapshots;

const _require3 = require('commander'),
      Option = _require3.Option;

const _require4 = require('path'),
      resolve = _require4.resolve;

const _require5 = require('lodash'),
      isNil = _require5.isNil,
      isArray = _require5.isArray,
      get = _require5.get;

const _require6 = require('./custom-loaders'),
      getCliExtensionProps = _require6.getCliExtensionProps;

const _require7 = require('./getVersion'),
      getVersion = _require7.getVersion;

const _require8 = require('../src/entities/app-package'),
      resolveConsumerCurrentVersion = _require8.resolveConsumerCurrentVersion;

const _require9 = require('../src/entities/prompts/getChosenVersion'),
      getChosenVersion = _require9.getChosenVersion;

const _require10 = require('../src/entities/logging'),
      logUpToDate = _require10.logUpToDate,
      logYellow = _require10.logYellow;

const getExtensionProps = async ({
  fromCi,
  snapshotsPath,
  toVersion: presetToVersion,
  shouldPromptToVersion = true,
  currentVersion: presetCurrentVersion,
  packageFiles = ['package.json'],
  availableSnapshotsFilter,
  errorLevel
}) => {
  const exitCode = errorLevel === 'error' ? 1 : 0;
  const customSnapshotsPath = snapshotsPath && resolve(process.cwd(), snapshotsPath);
  const cliExtensionProps = await getCliExtensionProps();
  let snapshots;
  let toVersion = presetToVersion;
  let currentVersion = presetCurrentVersion;

  if (customSnapshotsPath) {
    snapshots = get(await Promise.resolve(`${customSnapshotsPath}`).then(s => (0, _interopRequireWildcard2.default)(require(s))).catch(() => {
      throw new Error(`[jutro-cli]: Failed to load custom snapshots, check your path: ${customSnapshotsPath}`);
    }), 'default');
    currentVersion = await resolveConsumerCurrentVersion({
      snapshots,
      fromCi,
      currentVersion: presetCurrentVersion,
      packageFiles
    });

    if (isNil(currentVersion)) {
      process.exit(exitCode);
    }
  } else {
    currentVersion = await resolveConsumerCurrentVersion({
      snapshots,
      fromCi,
      currentVersion: presetCurrentVersion,
      packageFiles
    });

    if (isNil(currentVersion)) {
      process.exit(exitCode);
    }

    const consumerSnapshots = cliExtensionProps.migrationSnapshots;

    if (consumerSnapshots) {
      snapshots = await extendSnapshots(versionSnapshots, consumerSnapshots);
    } else {
      snapshots = squashSnapshots({
        currentVersion,
        snapshots: versionSnapshots,
        includeVersion: toVersion,
        availableSnapshotsFilter
      });
    }

    if (!fromCi && shouldPromptToVersion && !toVersion) {
      toVersion = await getChosenVersion(presetToVersion, snapshots);

      if (!toVersion) {
        logUpToDate(currentVersion);
        process.exit(exitCode);
      }
    }

    const allVersions = snapshots.map(({
      version
    }) => version);

    if (shouldPromptToVersion && !allVersions.includes(toVersion)) {
      logYellow(`We could not find an appropriate version to update to from current version: ${currentVersion} for to-version: "${toVersion}".`);
      process.exit(exitCode);
    }
  }

  return {
    cliExtensionProps,
    currentVersion,
    toVersion,
    snapshots
  };
};

const optionsMap = {
  '--from-ci': {
    args: ['--from-ci', 'flag to denote the script being executed in a ci environment']
  },
  '--error-level': {
    args: ['--error-level <errorLevel>', 'error level = "error" will bubble an error out of the cli'],
    methods: {
      default: ['warn'],
      choices: [['error', 'warn']]
    }
  },
  '--package-path': {
    args: ['--package-path <packagePath>', 'path to the package.json file'],
    methods: {
      default: ['package.json']
    }
  },
  '--snapshots-path': {
    args: ['--snapshots-path <snapshotsPath>', 'a path to custom snapshots to use'],
    methods: {
      hideHelp: []
    }
  },
  '--do-npm-install': {
    args: ['--do-npm-install', 'install updated dependencies after migration']
  },
  '--skip-vcs': {
    args: ['--skip-vcs', 'dont track the update using vcs', false]
  },
  '--verbose': {
    args: ['--verbose', 'dont supress info from log in terminal', false]
  },
  '--to-version': {
    args: ['--to-version <toVersion>', 'version to migrate to (exact version numbers or "latest")', getVersion]
  },
  '--current-version': {
    args: ['--current-version <currentVersion>', 'param to specify the current version. If unset, command will look for Jutro dependencies in package.json and will infer the version']
  },
  '--skip-check': {
    args: ['--skip-check', 'skip verifying that the command is being run inside a jutro-application']
  },
  '--templates-directory': {
    args: ['--templates-directory <templatesDirectory>', 'the path to the templates directory default - Jutro Templates']
  }
};

const useOptions = (program, options) => {
  options.forEach(item => {
    const _ref = isArray(item) ? item : [item],
          _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          option = _ref2[0],
          overrideMethods = _ref2[1];

    const _optionsMap$option = optionsMap[option],
          args = _optionsMap$option.args,
          methods = _optionsMap$option.methods;
    const createdOption = Object.entries({ ...methods,
      ...overrideMethods
    }).reduce((modifiedOption, [method, methodArgs]) => modifiedOption[method](...methodArgs), new Option(...args));
    program.addOption(createdOption);
  });
  return program;
};

const deprecatedOption = ({
  args,
  message,
  mapTo
}) => {
  const _args = (0, _slicedToArray2.default)(args, 1),
        nameArgs = _args[0];

  const _nameArgs$split = nameArgs.split(' '),
        _nameArgs$split2 = (0, _slicedToArray2.default)(_nameArgs$split, 1),
        name = _nameArgs$split2[0];

  const defaultMessage = `${name} is deprecated, please use ${mapTo} instead`;

  const logDeprecated = value => {
    logYellow(`DEPRECATED - ${message || defaultMessage}`);
    return value;
  };

  return new Option(...args).argParser(logDeprecated).hideHelp();
};

module.exports = {
  useOptions,
  getExtensionProps,
  deprecatedOption
};
//# sourceMappingURL=commanderUtils.js.map