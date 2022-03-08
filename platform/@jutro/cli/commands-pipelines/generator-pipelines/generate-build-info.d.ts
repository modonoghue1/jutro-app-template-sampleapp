/**
 * Generate build information for the application to a JSON file which can be served as a static asset
 *
 * @param {object} config directory & file config, can be used to set the outputDir, and outputFile
 * @param {object} config.additionalBuildInfo additional properties to be included in the JSON file
 *
 * @example
 * generateBuildInfo({ APPLICATION_AUTHOR: 'Guidewire' }, { outputDir: './src/assets/static/folder', outputFile: 'build-details' })
 */
export const generateBuildInfo: any;
