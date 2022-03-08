/**
 * @typedef {object} ExctractOptions
 * @prop {string} filenamePattern pattern for file look up
 * @prop {string} outputDir path to output directory
 * @prop {string} basePath base path
 * @prop {boolean} isLogCaptured flag for capturing the log
 */
/**
 * Extracts messages from modules into output dir
 * @param {ExctractOptions} options extract configuration
 */
export function extractMessagesJSX({ filenamePattern, outputDir, basePath, isLogCaptured, }: ExctractOptions): Promise<void>;
export type ExctractOptions = {
    /**
     * pattern for file look up
     */
    filenamePattern: string;
    /**
     * path to output directory
     */
    outputDir: string;
    /**
     * base path
     */
    basePath: string;
    /**
     * flag for capturing the log
     */
    isLogCaptured: boolean;
};
