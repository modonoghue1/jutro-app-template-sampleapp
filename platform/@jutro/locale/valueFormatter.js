import{PhoneNumberUtil}from"google-libphonenumber";import{log}from"@jutro/logger";export const formatPhoneNumberAndCountryCode=(phoneNumber,countryCodeIso2)=>{const phoneUtils=PhoneNumberUtil.getInstance();try{var _rawInput$getCountryC;const countryCode=(null===(_rawInput$getCountryC=phoneUtils.parseAndKeepRawInput(phoneNumber,countryCodeIso2).getCountryCode())||void 0===_rawInput$getCountryC?void 0:_rawInput$getCountryC.toString())||"";return[countryCode,phoneUtils.format(phoneUtils.parse(phoneNumber,countryCodeIso2))]}catch(error){return log.warning(`Unable to format phone number '${phoneNumber}': ${error.message}`),[]}};