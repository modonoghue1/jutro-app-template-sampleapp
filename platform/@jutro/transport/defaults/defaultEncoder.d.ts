import { Options } from '../common';
/**
 * Provides a basic payload encoder that will stringify the
 * payload using JSON.stringify if the json content type header is present
 *
 * @param {BodyInit|object} data - request payload
 * @returns {BodyInit} encoded payload
 *
 * @example
 * HttpRequestBuilder().addHandler(REQUEST_HANDLER_TYPE.ENCODE, defaultEncoder).build()
 */
export declare function defaultEncoder(data: BodyInit | Record<string, unknown>, options: Options): BodyInit;
