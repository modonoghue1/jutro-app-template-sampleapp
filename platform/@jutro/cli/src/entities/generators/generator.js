"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generator = generator;

var _hygen = require("hygen");

var _prompts = _interopRequireDefault(require("prompts"));

var _logger = require("./logger");

async function generator({
  args,
  config: [generate, action],
  name,
  pathToTemplates
}) {
  const runnerConfig = {
    templates: pathToTemplates,
    cwd: process.cwd(),
    logger: new _logger.Logger(console.log.bind(console)),
    createPrompter: () => _prompts.default,
    exec: executeGenerator,
    debug: !!process.env.DEBUG
  };
  const params = paramaterizeObject(args);
  const runnerArgs = [generate, action, name, ...params];
  return (0, _hygen.runner)(runnerArgs, runnerConfig);
}

function paramaterizeObject(obj) {
  return Object.entries(obj).reduce((params, [key, value]) => {
    if (value !== null || value !== undefined) params.push(`--${key}`, value);
    return params;
  }, []);
}

async function executeGenerator(execAction, body) {
  const opts = body && body.length > 0 ? {
    input: body
  } : {};
  return require('execa').shell(execAction, opts);
}
//# sourceMappingURL=generator.js.map