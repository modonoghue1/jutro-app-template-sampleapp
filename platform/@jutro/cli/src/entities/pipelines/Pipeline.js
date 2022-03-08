"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pipeline = Pipeline;

var _isObject = _interopRequireDefault(require("lodash/isObject"));

const emptyFunction = () => {};

const executeSteps = async (steps, initialPipelineValue, initialBeforeOutput, config, setup, beforeEach, afterEach) => {
  let lastValue = initialPipelineValue;
  let lastBeforeOutput = initialBeforeOutput;
  const setupConfig = await setup(config, lastValue);

  if (setupConfig === null) {
    return undefined;
  }

  const finalConfig = (0, _isObject.default)(setupConfig) ? { ...config,
    ...setupConfig
  } : config;

  for await (const step of steps) {
    lastBeforeOutput = await beforeEach(finalConfig, lastValue, step.props);
    lastValue = step.action ? await step.action(finalConfig, lastValue, lastBeforeOutput) : await step(finalConfig, lastValue, lastBeforeOutput);
    await afterEach(finalConfig, lastValue, lastBeforeOutput);
  }

  return lastValue;
};

function Pipeline(config, customPipelineExecution) {
  let pipelineConfig = config;
  let steps = [];
  let executeSetup = emptyFunction;
  let executeBeforeEach = emptyFunction;
  let executeAfterEach = emptyFunction;

  const defaultPipelineExecution = async (initialConfig = {}, initialValue, initialBeforeOutput) => {
    const globalConfig = { ...pipelineConfig,
      ...initialConfig
    };
    const lastValue = await executeSteps(steps, initialValue, initialBeforeOutput, globalConfig, executeSetup, executeBeforeEach, executeAfterEach);
    return lastValue;
  };

  const pipeline = customPipelineExecution ? customPipelineExecution(defaultPipelineExecution) : defaultPipelineExecution;
  Object.defineProperty(pipeline, 'name', {
    value: config === null || config === void 0 ? void 0 : config.name,
    writable: false
  });

  pipeline.setup = setupCallBack => {
    executeSetup = setupCallBack;
    return pipeline;
  };

  pipeline.addConfig = additionalConfig => {
    pipelineConfig = { ...pipelineConfig,
      ...additionalConfig
    };
    return pipeline;
  };

  pipeline.beforeEach = beforeEachCallBack => {
    executeBeforeEach = beforeEachCallBack;
    return pipeline;
  };

  pipeline.afterEach = afterEachCallBack => {
    executeAfterEach = afterEachCallBack;
    return pipeline;
  };

  pipeline.addStep = (...newSteps) => {
    steps = steps.concat(newSteps);
    return pipeline;
  };

  return pipeline;
}
//# sourceMappingURL=Pipeline.js.map