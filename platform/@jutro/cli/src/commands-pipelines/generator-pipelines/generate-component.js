"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateComponent = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _path = require("path");

var _pipelines = require("../../entities/pipelines");

var _appPackage = require("../../entities/app-package");

var _generators = require("../../entities/generators");

var _prompts = require("../../entities/prompts");

const generationMessages = {
  warnings: {
    jutroVersion: 'Could not parse the jutro application version',
    jutroApplicationPackage: 'Your package.json does not contain jutro dependencies'
  },
  errors: {
    emptyName: 'Name of component cannot be empty'
  }
};
const componentQuestions = [{
  type: 'text',
  name: 'name',
  message: 'Please provide the name of the new component',
  validate: name => (0, _prompts.validateName)(name)
}, {
  type: 'text',
  name: 'path',
  message: 'Please provide the path for component',
  initial: (0, _path.join)(process.cwd(), 'src', 'components'),
  validate: path => (0, _prompts.validatePathName)(path) ? true : "Invalid path (only alphanumeric and '-', '_', '@', '.', ':', '/', '\\' characters allowed)"
}];

const applicationValidationCheck = async () => {
  const pkg = (0, _appPackage.getConsumerApplicationPackage)();

  if ((0, _isNil.default)(pkg)) {
    await (0, _prompts.promptConfirmation)(generationMessages.warnings.jutroVersion);
    return;
  }

  const jutroVersion = (0, _appPackage.getConsumerApplicationVersion)();
  if ((0, _isNil.default)(jutroVersion)) await (0, _prompts.promptConfirmation)(generationMessages.warnings.jutroApplicationPackage);
};

const generateComponent = (0, _pipelines.PipelineWithLogs)({
  logStartMessage: 'Generate component',
  logFileName: 'jutro-component-generation.log'
}).setup(async ({
  skipCheck,
  templatesPath,
  name: componentName,
  path,
  type = 'component'
}) => {
  if (!skipCheck) await applicationValidationCheck();

  const _await$promptComponen = await (0, _prompts.promptComponentGeneration)(componentQuestions, {
    name: componentName,
    path
  }),
        name = _await$promptComponen.name,
        remainingArgs = (0, _objectWithoutProperties2.default)(_await$promptComponen, ["name"]);

  if (!name || name.length === 0) throw Error(generationMessages.errors.emptyName);
  await (0, _generators.generator)({
    config: ['components', type],
    args: remainingArgs,
    name: type === 'wizard' && !name.includes('Wizard') ? `${name}Wizard` : name,
    pathToTemplates: templatesPath
  });
});
exports.generateComponent = generateComponent;
//# sourceMappingURL=generate-component.js.map