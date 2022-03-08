"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

const path = require('path');

const program = require('commander');

const _require = require('../../src'),
      generateBuildInfo = _require.generateBuildInfo;

const addCustomBuildValue = (value, previous) => {
  const _value$split = value.split(':'),
        _value$split2 = (0, _slicedToArray2.default)(_value$split, 2),
        buildItemKey = _value$split2[0],
        buildItemValue = _value$split2[1];

  return { ...previous,
    [`${buildItemKey}`]: buildItemValue
  };
};

program.option('--error-level <errorLevel>', 'error level = "error" will bubble an error out of the cli', 'warn').option('--output-dir <outputDir>', 'application directory to write build info file to', './src/assets').option('--output-file <outputFile>', 'name of the file to write build info to (omit extension)', 'build').option('--package-dir <packageDir>', 'directory containing application package.json file', './').option('-b, --build <value>', 'custom build value in the form NAME:VALUE', addCustomBuildValue, {}).action(async ({
  errorLevel,
  outputDir,
  outputFile,
  packageDir,
  build: additionalBuildInfo
}) => {
  const basePath = path.resolve();
  await generateBuildInfo({
    additionalBuildInfo,
    basePath,
    errorLevel,
    outputDir,
    outputFile,
    packageDir
  });
}).parse(process.argv);
//# sourceMappingURL=generate-build-info.js.map