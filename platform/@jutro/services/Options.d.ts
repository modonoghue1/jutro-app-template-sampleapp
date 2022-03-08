/**
 * Utility class to handle execution of conditional
 * code based upon the presence of configured option.
 */
export default class Options {
    /**
     * Creates a new option.
     * @param {object} options - The options to configure
     */
    constructor(options: object);
    options: any;
    /**
     * Executes a callback based on the presence of an option.
     * @param {string} optionName - The option name (key in object)
     * @param {(option:object) => void} callback - The callback function
     */
    onOption(optionName: string, callback: (option: object) => void): void;
}
