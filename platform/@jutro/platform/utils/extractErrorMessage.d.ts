/**
 * Helper method that will extract an error message out of a variety of error-type objects
 *
 * @param {Record<string, any>} [error] - The error object from which to extract the message
 * @returns {string|undefined} - Returns the error message extracted from the object
 */
export default function extractErrorMessage(error?: Record<string, any> | undefined): string | undefined;
