/**
 * Formats the given phone number if country code is passed with phonenumber
 *
 * @param {string} phoneNumber - The phone number with country code to format
 * @param {string} countryCodeIso2 - Country code in iso2 string format upper or lower case
 * @returns {string} - Array with country code at 0 and formatted phone number at 1 position
 */
export declare const formatPhoneNumberAndCountryCode: (phoneNumber: string, countryCodeIso2: string) => string[];
