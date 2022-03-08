/**
 * Given a base template and an extension template, generate a new
 * package-template containing the values of the base as well
 * as any fields in the extension template which aren't defined in the base.
 * @param {Object} params -
 * @param {string} params.basePackagePath - the path to the base template (if not provided uses jutro version template)
 * @param {string} params.extensionPackagePath - the path to the extending template
 * @param {boolean} params.fromCi - is command being run from CI
 * @param {Array<Object>} params.snapshots - snapshots to use for base template
 * @param {string} params.snapshotVersion - the snapshot version to use as a base template
 * @param {string} params.templateOutputDir - where the generated template should be output
 *
 */
export const generatePackageTemplate: any;
