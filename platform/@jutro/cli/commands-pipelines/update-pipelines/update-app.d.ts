/**
 * This script will bump the application package.json file,
 * install the dependencies, and print next steps for the user.
 * @param {object} config - object containing any configuration that you need to be shared across the steps.
 * @param {string} config.toVersion - the version chosen to update to.
 * @param {string} [config.packagePath = 'package.json'] - path to the package.json
 * @param {boolean} config.fromCi - if the pipeline is being executed from CI
 * @param {boolean} config.doNpmInstall - if the pipeline should execute a npm install
 * @param {string} config.dependencyInstallScript - script that will be executed if doNpmInstall is true
 * @param {Array<function>} [config.subPipelines = [
  *      migrate,
        updateApplicationDependencies,
        updateApplicationScripts,
        runSnapshotCodemods,
        updateConfigFiles,
    ]] - Array of subPipelines that will be executed on the pipeline
 */
export const updateApp: any;
