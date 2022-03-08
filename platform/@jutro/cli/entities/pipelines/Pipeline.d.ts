/**
 * Creates a pipeline function that allows the user to add steps, setup, beforeEach, afterEach.
 * @param {object} config - object containing any configuration that you need to be shared across the steps.
 * @param {function} customPipelineExecution - function that can be provided if the user wants to create a custom pipeline execution.
 *
 * @returns {function} pipeline
 */
export function Pipeline(config: object, customPipelineExecution: Function): Function;
