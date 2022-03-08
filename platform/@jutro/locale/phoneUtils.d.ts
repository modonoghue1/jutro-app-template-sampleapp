import { PhoneNumberType } from 'google-libphonenumber';
/**
 * Return an example phone number for the given country code or null if a number cannot be found.
 *
 * @param {string} countryCode a valid country code, for example 'FR'
 * @param {number} phoneNumberType values correspond to the PhoneNumberType enum in libphonenumber
 * @returns {string} a formatted example phone number or null if cannot be found
 */
export declare const getSamplePhoneNumber: (countryCode: string, phoneNumberType: PhoneNumberType) => string | null;
/**
 * @param {string} countryCode a valid country code, for example 'FR'
 * @returns {string}
 */
export declare const getPrefixForCountry: (countryCode: string) => string;
/**
 * Verify if the provided phone number is valid for the given country
 *
 * @param {string} phoneNumber phone number to validate
 * @param {string} countryCode a valid country code, for example 'FR'
 * @returns {boolean} true if the number is valid
 */
export declare const isValidatePhoneNumber: (phoneNumber: string, countryCode: string) => boolean;
