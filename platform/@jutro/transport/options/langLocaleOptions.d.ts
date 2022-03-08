import { Options } from '../common';
/**
 * Provides gw-language and gw-locale headers for requests
 *
 * @param {string} language
 * @param {string} locale
 * @returns {Record<string, any>}
 * @example
 * HttpRequestBuilder().addOptions(langLocaleOptions(language, locale)).build()
 */
export declare function langLocaleOptions(language: string, locale: string): Options;
