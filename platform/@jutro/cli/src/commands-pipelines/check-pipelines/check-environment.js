"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEnvironment = void 0;

require("json5/lib/register");

var _envinfo = _interopRequireDefault(require("envinfo"));

var _json = _interopRequireDefault(require("json5"));

var _logging = require("../../entities/logging");

var _appPackage = require("../../entities/app-package");

var _uiMetadata = require("../../entities/ui-metadata");

var _pipelines = require("../../entities/pipelines");

const checkEnvironment = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Checking evironment info...',
  logFileName: 'check-environment-cli.log',
  consoleCapture: (0, _logging.captureConsole)()
}).addStep(async () => {
  const jutroVersion = await (0, _appPackage.getConsumerApplicationVersion)();

  if (jutroVersion === null) {
    return;
  }

  const jutroMetadataVersion = await (0, _uiMetadata.getConsumerUiMetadataVersion)();
  const results = await _envinfo.default.run({
    System: ['OS', 'CPU'],
    Binaries: ['Node', 'Yarn', 'npm'],
    Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
    npmPackages: '/**/{typescript,react, react-dom, @jutro/cli}'
  }, {
    json: true,
    showNotFound: true,
    duplicates: true,
    fullTree: true
  });

  const resultsObject = _json.default.parse(results);

  const JutroInfo = {
    jutroVersion,
    jutroMetadataVersion
  };
  const resultsWithCustomFields = { ...resultsObject,
    JutroInfo
  };
  (0, _logging.logObjectWithTitle)('\nEnvironment Info:', resultsWithCustomFields);
});
exports.checkEnvironment = checkEnvironment;
//# sourceMappingURL=check-environment.js.map