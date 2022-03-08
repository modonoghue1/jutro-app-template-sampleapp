export type ValidateOptions = {
    /**
     * filename pattern to lookup metadata files
     */
    fileNamePattern?: string | undefined;
    /**
     * path to schema file
     */
    schemaPath: string;
    /**
     * base path of package.json
     */
    basePath: string;
};
/**
 * @typedef {object} ValidateOptions
 * @prop {string} [fileNamePattern] filename pattern to lookup metadata files
 * @prop {string} schemaPath path to schema file
 * @prop {string} basePath base path of package.json
 */
/**
 * Validates all metadata files against schema
 *
 * @param {ValidateOptions} options validation options
 */
export const checkMetadata: any;
