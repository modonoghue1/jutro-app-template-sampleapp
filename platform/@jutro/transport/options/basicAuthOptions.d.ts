import { Options } from '../common';
/**
 * Creates basic auth options to pass into HttpRequestBuilder.
 * User name and password as base64 encoded
 *
 * @param {string} userName - user name
 * @param {string} password - password
 * @returns {Record<string, any>} options to pass into HttpRequestBuilder
 *
 * @example
 * HttpRequestBuilder().withOptions(basicAuthOptions('myUserName', 'myPassword')).build()
 */
export declare function basicAuthOptions(userName: string, password: string): Options;
