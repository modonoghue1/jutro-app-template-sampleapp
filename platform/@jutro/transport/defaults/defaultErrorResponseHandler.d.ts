/**
 * Provides a basic error response handling functionality.
 * Return Promise.reject() to behave as an exception.
 * Return Promise.resolve() to behave as a valid response.
 *
 * @param {Response} response - response to be handled
 * @returns {Promise} returns resolved or rejected promise as desired
 */
export declare function defaultErrorResponseHandler(response: Response): Promise<never>;
