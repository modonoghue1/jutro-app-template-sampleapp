export type PseudoType = 'EXPANSION' | 'SHERLOCK' | 'BOTH';
export type PseudoOptions = {
    /**
     * type of generated translation
     */
    pseudoType: PseudoType;
    /**
     * path to output file
     */
    outputFileName: string;
    /**
     * path to input file
     */
    inputFile?: string | undefined;
};
/** @typedef { 'EXPANSION' | 'SHERLOCK' | 'BOTH' } PseudoType */
/**
 * @typedef {object} PseudoOptions
 * @prop {PseudoType} pseudoType type of generated translation
 * @prop {string} outputFileName path to output file
 * @prop {string} [inputFile] path to input file
 */
/**
 * Generates pseudo translations
 * @param {PseudoOptions} options options
 */
export const generatePseudo: any;
