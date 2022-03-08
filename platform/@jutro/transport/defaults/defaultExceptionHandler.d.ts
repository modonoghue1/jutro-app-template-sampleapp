/**
 * Provides a basic exception handling functionality.
 * Return Promise.reject() to behave as an exception.
 * Return Promise.resolve() to behave as a valid response.
 *
 * @param {Error} err - exception to be handled
 * @returns {Promise} returns resolved or rejected promise as desired
 */
export declare function defaultExceptionHandler(err: Error): Promise<never>;
