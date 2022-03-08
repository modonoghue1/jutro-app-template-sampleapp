import { Locale } from 'date-fns';
/**
 * Loads locale date data from date-fns. It takes the shape xx-XX where xx is the ISO 639-1
 * code of the language, and XX is the ISO 3166-1 alpha-2 code of the country. If the locale
 * for the country code is not found, it will try to fall back to the language code only.
 * E.g.: If mexican spanish is not available (es-MX), it will fall back to spanish (es).
 *
 * @param {string} locale Code of the locale to be loaded. Ex: 'en-US', 'pl'
 * @returns {Locale} Date-fns locale date helpers for the specified locale
 */
export declare const getDateLocale: (locale: string) => Locale;
