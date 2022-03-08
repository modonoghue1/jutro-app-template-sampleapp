export type ValidationError = {
    /**
     * file path
     */
    file: string;
    /**
     * list of error messages
     */
    errorMessages: string[];
};
export type FileReadResult = {
    /**
     * file content
     */
    content?: Record<string, any> | undefined;
    /**
     * read error
     */
    error?: ValidationError | undefined;
};
/**
 * @typedef {object} ValidationError
 * @prop {string} file file path
 * @prop {string[]} errorMessages list of error messages
 */
/**
 * Validates list of metadata files
 *
 * @param {string[]} metadataFiles list of metadata files (paths) to validate
 * @param {string} schemaPath path to schema file
 * @returns {ValidationError[]} list of validation errors
 */
export function validate(metadataFiles: string[], schemaPath: string): ValidationError[];
