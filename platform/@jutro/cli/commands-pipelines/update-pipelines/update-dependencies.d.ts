/**
 * This script will bump the application package.json file,
 * install the dependencies, and print next steps for the user.
 * @param {object} config - object containing any configuration that you need to be shared across the steps.
 * @param {string} config.toVersion - the version chosen to update to.
 * @param {string} [config.packagePath = 'package.json'] - path to the package.json
 * @param {boolean} config.fromCi - if the pipeline is being executed from CI
 * @param {boolean} config.doNpmInstall - if the pipeline should execute a npm install
 * @param {boolean} config.skipVcs - if the pipeline should skip VCS branch creation
 * @param {string} config.branchName - the name of the created VCS branch
 * @param {string} config.dependencyInstallScript - script that will be executed if doNpmInstall is true
 * @param {Array<object>} config.snapshots - the snapshot objects to be used during the upgrade
 */
export const updateDependencies: any;
