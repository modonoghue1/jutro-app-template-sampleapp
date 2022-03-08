/**
 * Tests whether a value is empty. Empty is defined as undefined, null, '' or NaN.
 * Cannot just test value because then it would miss `false` and `0` and other falsy
 * but legitimate values
 *
 * @param {*} value - value to test
 * @returns {boolean} true or false if value is empty
 */
export function isEmptyValue(value: any): boolean;
/**
 * Tests whether a value is nil. Nil is defined as undefined or null.
 *
 * @param {object} value - value to test
 * @returns {boolean} true or false if value is nil
 */
export function isNilValue(value: object): boolean;
/**
 * Tests whether or not two values are the same. Values are considered the same
 * if both are "empty" or they are strictly equivalent.
 *
 * @param {object} val1 - The first value to compare
 * @param {object} val2 - The second value to compare
 * @returns {boolean} - True if values are the same
 */
export function isValueSame(val1: object, val2: object): boolean;
/**
 * Get the value to display regarding field type.
 *
 * @param {string} fieldType HTML5 input type
 * @param {object} value
 *
 * @returns {object} value to render
 */
export function getValueForInput(fieldType: string, value: object): object;
/**
 * Tests whether value is a number.
 *
 * @param {object} n - value to test
 * @returns {boolean} true or false if value is number
 */
export function isNumber(n: object): boolean;
/**
 * Checks if string decimal representation of number is safe (no rounding after casting to number)
 *
 * @param {string} number - string representation of number
 * @returns {boolean}
 */
export function isSafeNumber(number: string): boolean;
/**
 * Get a regex to test for a given number of decimal places
 *
 * @param {*} decimals - the max number of decimal places to allow
 * @returns {RegExp} - a regex that tests for the given number of decimal places
 */
export function getDecimalRegex(decimals?: any): RegExp;
/**
 * Truncated a number to a given number of decimal places without rounding
 *
 * @param {*} value - the value to be truncated
 * @param {*} decimalPlaces - the number of decimal places to allow
 * @returns {number} - the truncated value
 */
export function truncateValue(value: any, decimalPlaces: any): number;
