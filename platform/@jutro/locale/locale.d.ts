import { languagesAll, countries } from 'countries-list';
import { Locale } from 'date-fns';
import { IntlShape } from './IntlProvider';
export declare type Languagekey = keyof typeof languagesAll;
export declare type Countrykey = keyof typeof countries;
export declare const getLanguageSubtag: (locale: string) => Languagekey | undefined;
/**
 * Extracts the country code from the given locale. Returns `undefined` if country code
 * is not defined in locale argument.
 * @param {string} locale - The locale, e.g. `en-US`
 * @returns {Countrykey|undefined} - The locale country code, or undefined if no country in locale argument
 */
export declare const getCountryCodeFromLocale: (locale: string) => Countrykey | undefined;
export declare const getLanguageFromLocale: (locale: string) => Languagekey | undefined;
/**
 * Returns the browser locale, or undefined if the browser locale cannot be found.
 * @returns {string} - The locale
 */
export declare const getBrowserLocale: () => string;
/**
 * Returns the browser language, or undefined if the browser locale cannot be found.
 * @returns {string} - The locale
 */
export declare const getBrowserLanguage: () => string;
/**
 * @param {string} locale
 * @returns {string}
 */
export declare const normalizeToUnderscoreLocale: (locale: string) => string;
/**
 * Quick validation if object is intlShape object
 *
 * @param {object} content - intl message id
 * @returns {boolean}
 */
export declare const isIntlShape: (content: IntlShape) => boolean;
/**
 * Provides a list of the long month names for a given date-fns locale
 *
 * @param {object} locale - the date-fns locale object
 * @returns {Array<any>} - an array of the long month names for the provided locale
 */
export declare const getFormattedMonthsForLocale: (locale: Locale) => Array<string>;
