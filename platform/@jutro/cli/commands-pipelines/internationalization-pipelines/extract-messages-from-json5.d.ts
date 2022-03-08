export type ExtractOptions = {
    /**
     * pattern for file look up
     */
    filenamePattern: string;
    /**
     * path to output directory
     */
    outputDir: string;
};
/**
 * @typedef {object} ExtractOptions
 * @prop {string} filenamePattern pattern for file look up
 * @prop {string} outputDir path to output directory
 */
/**
 * Extracts messages from metadata into output dir
 * @param {ExtractOptions} options extract configuration
 */
export const extractMessages: any;
