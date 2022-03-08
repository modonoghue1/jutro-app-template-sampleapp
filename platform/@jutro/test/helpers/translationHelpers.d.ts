/**
 * Function to test whether text was translated.  If the `strOrWrapper` is a string, then that value
 * is used directly, otherwise it is treated as an enzyme wrapper object from which the `text()` is
 * obtained and then compared against the translation of the given `value`.
 *
 * @param {string|Record<string, any>} strOrWrapper - Either a string or if not, it is treated as an enzyme wrapper
 * @param {string|Record<string, any>} value - The value that will be translated for comparison
 * @param {Array<string>} [args] - String to interpolate
 * @param {Function} [translator] - Optional custom translator function used in the test
 */
export function textWasTranslated(strOrWrapper: string | Record<string, any>, value: string | Record<string, any>, args?: string[] | undefined, translator?: Function | undefined): void;
export const TEST_TRANSLATION_PREFIX: "Tx: ";
export function translatorForTests(key?: string | Record<string, any> | undefined): string;
export function translatorForTestsWithSuffix(key: any): any;
