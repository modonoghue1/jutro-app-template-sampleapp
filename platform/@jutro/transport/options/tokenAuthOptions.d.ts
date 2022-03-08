import { Options } from '../common';
/**
 * Creates auth options using a bearer token to pass into HttpRequestBuilder.
 *
 * @param {string} accessToken - accessToken provided by authentication service, e.g Okta.
 * @returns {Options} options to pass into HttpRequestBuilder
 *
 * @example
 * HttpRequestBuilder().addOptions(tokenAuthOptions(accessToken)).build()
 */
export declare function tokenAuthOptions(accessToken?: string): Options | undefined;
