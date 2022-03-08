export type MergeOptions = {
    /**
     * default message file name pattern
     */
    filenamePattern?: string | undefined;
    /**
     * output directory
     */
    outputDir?: string | undefined;
    /**
     * output file name
     */
    outputFileName?: string | undefined;
    /**
     * base path
     */
    basePath: string;
    /**
     * flag for capturing the log
     */
    isLogCaptured: boolean;
};
/**
 * @typedef {object} MergeOptions
 * @prop {string} [filenamePattern='./i18n/frontend&#47;**&#47;*.json'] default message file name pattern
 * @prop {string} [outputDir] output directory
 * @prop {string} [outputFileName='./i18n/messages.json'] output file name
 * @prop {string} basePath base path
 * @prop {boolean} isLogCaptured flag for capturing the log
 */
/**
 * Merges default messages for each component into one file and translations for other languages into one file.
 * @param {MergeOptions} options merge options
 */
export const mergeTranslations: any;
