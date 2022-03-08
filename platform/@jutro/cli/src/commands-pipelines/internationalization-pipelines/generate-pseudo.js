"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePseudo = void 0;

var _i18n = require("../../entities/i18n");

var _logging = require("../../entities/logging");

var _pipelines = require("../../entities/pipelines");

const defaultInputFile = 'src/i18n/en.json';
const generatePseudo = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Generating pseudo messages...',
  logFileName: 'jutro-generate-pseudo-cli.log',
  name: 'runGeneratePseudo'
}).addStep(async ({
  pseudoType,
  outputFileName,
  inputFile = defaultInputFile
}) => {
  const pseudolizer = new _i18n.Pseudolizer();
  pseudolizer.setOutputFileName(outputFileName);
  pseudolizer.setPseudoType(pseudoType);
  pseudolizer.setFilePathPatterns([inputFile]);
  pseudolizer.pseudolizeFiles();
  (0, _logging.logGreen)(`generated pseudo translations to file: ${outputFileName}`);
}).addStep({
  action: async ({
    logFileName
  }) => ({
    successLogFileName: `${logFileName}`
  }),
  props: {
    title: 'Finishing pseudo message generation'
  }
});
exports.generatePseudo = generatePseudo;
//# sourceMappingURL=generate-pseudo.js.map