/**
 * Based on the available snapshots, run those which are appropriate for the current version.
 * They will be ran sequentially.
 * This pipeline need to have it steps added where each step return a runner that will be executed on the proper version.
 *
 * @param {object} config - object containing any configuration that you need to be shared on all the functions executed on the pipeline.
 */
export const executeUpgradeRunners: any;
