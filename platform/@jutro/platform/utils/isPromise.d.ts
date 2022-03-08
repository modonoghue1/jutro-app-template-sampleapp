/**
 * Using the `Promise.resolve()` check to see if the given `object` is a promise.
 *
 * @param {Record<string, any>} object - The object that is to be checked to see if it a promise
 * @returns {boolean} - True if the object is a promise, false otherwise
 */
export default function isPromise(object: unknown): object is Promise<unknown>;
