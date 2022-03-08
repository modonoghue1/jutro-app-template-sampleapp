/**
 * This script will bump the application package.json file,
 * install the dependencies, and print next steps for the user.
 * @param {object} config - object containing any configuration that you need to be shared across the steps.
 * @param {string} config.toVersion - the version chosen to update to.
 * @param {string} config.fileNamePattern - file name pattern to be used to locate all the package.json files.
 * @param {boolean} config.fromCi - if the pipeline is being executed from CI
 * @param {boolean} config.doNpmInstall - if the pipeline should execute a npm install
 * @param {string} config.dependencyInstallScript - script that will be executed if doNpmInstall is true
 */
export const updateModule: any;
