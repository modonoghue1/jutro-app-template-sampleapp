import { Languagekey } from './locale';
export declare const LOCALE_SERVICE_ID = "locale";
export declare const LOCALE_URL_PARAM = "selectedLocale";
export declare const LANGUAGE_URL_PARAM = "selectedLanguage";
declare type localeCallbackType = {
    (locale: string): void;
};
declare type LocaleSettings = {
    getAvailableLanguages: () => Array<string>;
    getAvailableLocales: () => Array<string>;
    getPreferredLanguage: () => string | null;
    getPreferredLocale: () => string | null;
    getDefaultCountryCode: () => string | null;
    getDefaultPhoneCountry: () => string | null;
};
declare type PartialCountries = {
    country: string;
    native: string;
    locale: string;
    language?: string;
    english: string;
};
/**
 * Maps the locale codes to the native language translation of the locale.
 * Checks if language code only first and if not, checks for language code with country code.
 *
 * @param {string} locale - The preferred locale
 * @returns {string} - locale translated to native language with option of region specific
 */
export declare const getNativeLocaleLanguage: (locale: Languagekey) => string | undefined;
/**
 * @param {object} locale - The locale with language to filter by
 * @returns {Array<PartialCountries>} - An array containing all countries which use that language
 */
export declare const getAllCountriesUsingLanguage: (locale: string) => Array<PartialCountries>;
/**
 * @param {string} locale - The locale for the country
 * @returns {string} - The native country name
 */
export declare const getCountryNameFromLocale: (locale: string) => string | undefined;
/**
 * Get the default country code as defined by the application settings implementation
 * or the application config
 *
 * @returns {string}
 */
export declare const getDefaultCountryCode: () => string | null;
/**
 * Get the default currency as defined by the application settings implementation
 * or the application config
 *
 * @returns {string}
 */
export declare const getDefaultCurrency: () => string;
/**
 * Service for providing locale-based functionality, such as formatting dates, or
 * getting locale information.
 */
export declare class LocaleService {
    localeChangeListeners: Array<localeCallbackType>;
    languageChangeListeners: Array<localeCallbackType>;
    currentLocale: string;
    currentLanguage: string;
    storedLanguageWasRead: boolean;
    storedLocaleWasRead: boolean;
    constructor();
    get settings(): LocaleSettings;
    /**
     * Gets the current locale.
     * @returns {string} - The current locale
     */
    get locale(): string;
    /**
     * Sets the new locale, and fires the event to
     * any listeners.
     * @param {string} newLocale - The new locale
     */
    set locale(newLocale: string);
    /**
     * Gets the current language.
     * @returns {string} - The current language
     */
    get language(): string;
    /**
     * Sets the new language, and fires the event to
     * any listeners.
     * @param {string} newLanguage - The new language
     */
    set language(newLanguage: string);
    getAvailableLocales(): Array<string>;
    getAvailableLanguages(): Array<string>;
    /**
     * Returns the country code to use, e.g., in an address in the view model.
     * Will use the configured locale country or the application default.
     * @returns {string} - The country code
     */
    getCountry(): string | null;
    /**
     * Returns the country code from the currently configured locale, or
     * undefined if that information is unavailable.
     * @returns {string} - The country code from the current locale
     */
    getCurrentCountry(): string | undefined;
    /**
     * Returns the current locale, as configured by the user.
     * @returns {string} - The locale
     */
    getCurrentLocale(skipLocalStoragePersistence?: boolean): string;
    /**
     * Returns the current language, as configured by the user.
     * @returns {string} - The language
     */
    getCurrentLanguage(skipLocalStoragePersistence?: boolean): string;
    /**
     * Returns the user's stored locale preference.
     * @returns {string | null}
     */
    getStoredLocale(): string | null;
    /**
     * Returns the user's stored language preference.
     * @returns {string | null}
     */
    getStoredLanguage(): string | null;
    /**
     * Sets the locale for the current user.
     * @param {string} newLocale - The locale
     * @param {boolean} skipLocalStoragePersistence - prevents to use local storage
     */
    setCurrentLocale(newLocale: string, skipLocalStoragePersistence?: boolean): void;
    /**
     * Sets the language for the current user.
     * @param {string} newLanguage - The language
     * @param {boolean} skipLocalStoragePersistence - prevents to use local storage
     */
    setCurrentLanguage(newLanguage: string, skipLocalStoragePersistence?: boolean): void;
    /**
     * Adds a callback listener to locale change events.
     * @param {(locale:string) => void} callback - The listener
     */
    onLocaleChange(callback: localeCallbackType): void;
    /**
     * Adds a callback listener to language change events.
     * @param {(locale:string) => void} callback - The listener
     */
    onLanguageChange(callback: localeCallbackType): void;
    /**
     * Returns the configured phone region (country) from the application
     * configuration.
     * @returns {string} - The phone country code as configured by the application
     */
    getConfiguredPhoneRegion(): string | null;
}
declare const _default: any;
export default _default;
