/**
 * Maps errors to an error category and a knockoutPath
 * @param {string} errorCode - The code to use for the mapping
 * @returns {object} - The object has two properties categoryMapping and knockoutPath
 */
export function getErrorCategory(errorCode: string): object;
/**
 * setErrorCategoryKnockoutMaps
 * @param {object} appErrorCategories
 * @param {object} appKnockoutPaths
 */
export function setErrorCategoryKnockoutMaps(appErrorCategories: object, appKnockoutPaths: object): void;
