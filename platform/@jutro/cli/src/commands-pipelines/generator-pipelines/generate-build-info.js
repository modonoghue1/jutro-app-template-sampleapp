"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBuildInfo = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _appPackage = require("../../entities/app-package");

var _git = require("../../entities/git");

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

const defaultConfig = {
  outputDir: './src/assets',
  outputFile: 'build',
  packageDir: './',
  packageFile: 'package'
};
const generateBuildInfo = (0, _pipelines.PipelineWithLogs)({
  logFileName: 'generate-build-info-cli.log'
}).setup(async config => ({ ...defaultConfig,
  ...config
})).addStep(async ({
  additionalBuildInfo = null,
  packageDir,
  packageFile,
  outputFile
}) => {
  let packageFileBuildInfo = {};

  try {
    const packageData = _fsExtra.default.readJSONSync(`${packageDir}/${packageFile}.json`);

    const APPLICATION_NAME = packageData.name,
          APPLICATION_VERSION = packageData.version,
          APP_DEPS = packageData.dependencies;
    const namedDependencies = Object.keys(APP_DEPS);
    const foundJutroDep = (0, _appPackage.retrieveJutroDependency)(namedDependencies);
    let JUTRO_VERSION;

    if (foundJutroDep) {
      JUTRO_VERSION = APP_DEPS[foundJutroDep];
    }

    packageFileBuildInfo = {
      APPLICATION_NAME,
      APPLICATION_VERSION,
      JUTRO_VERSION
    };
  } catch (e) {
    console.error(`Jutro could not read application package.json, version information will not be available in ${outputFile}`);
  }

  const buildInfo = { ...packageFileBuildInfo,
    ...additionalBuildInfo
  };
  return buildInfo;
}).addStep(async ({
  outputFile,
  outputDir
}, buildInfo) => {
  const commitHash = await (0, _git.getCommitHash)();

  if (commitHash) {
    buildInfo.COMMIT_HASH = commitHash;
  } else {
    (0, _logging.log)(`Jutro could not find a Git commit hash, Git information will not be available in ${outputFile}`);
  }

  const fileName = `${outputDir}/${outputFile}.json`;

  _fsExtra.default.outputJsonSync(fileName, buildInfo);

  (0, _logging.log)(`Jutro has written build information to ${fileName}!`);
});
exports.generateBuildInfo = generateBuildInfo;
//# sourceMappingURL=generate-build-info.js.map