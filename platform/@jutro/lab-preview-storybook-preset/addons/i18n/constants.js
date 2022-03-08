"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_CONFIG = exports.LANGUAGE_QUERY_KEY = exports.LOCALE_QUERY_KEY = exports.PARAM_KEY = exports.PANEL_ID = exports.ADDON_ID = void 0;
const ADDON_ID = 'Jutro-i18n';
exports.ADDON_ID = ADDON_ID;
const PANEL_ID = `${ADDON_ID}/panel`;
exports.PANEL_ID = PANEL_ID;
const PARAM_KEY = 'i18n';
exports.PARAM_KEY = PARAM_KEY;
const LOCALE_QUERY_KEY = 'loc';
exports.LOCALE_QUERY_KEY = LOCALE_QUERY_KEY;
const LANGUAGE_QUERY_KEY = 'ln';
exports.LANGUAGE_QUERY_KEY = LANGUAGE_QUERY_KEY;
const DEFAULT_CONFIG = {
  locale: 'en-US',
  language: 'en',
  locales: [{
    id: 'en-US',
    title: 'English (United States)'
  }, {
    id: 'af',
    title: 'Afrikaans'
  }, {
    id: 'af-NA',
    title: 'Afrikaans (Namibia)'
  }, {
    id: 'af-ZA',
    title: 'Afrikaans (South Africa)'
  }, {
    id: 'bg',
    title: 'Bulgarian'
  }, {
    id: 'bg-BG',
    title: 'Bulgarian (Bulgaria)'
  }, {
    id: 'da',
    title: 'Danish'
  }, {
    id: 'da-DK',
    title: 'Danish (Denmark)'
  }, {
    id: 'nl',
    title: 'Dutch'
  }, {
    id: 'nl-BE',
    title: 'Dutch (Belgium)'
  }, {
    id: 'nl-NL',
    title: 'Dutch (Netherlands)'
  }, {
    id: 'en',
    title: 'English'
  }, {
    id: 'en-AU',
    title: 'English (Australia)'
  }, {
    id: 'en-CA',
    title: 'English (Canada)'
  }, {
    id: 'en-HK',
    title: 'English (Hong Kong SAR China)'
  }, {
    id: 'en-IN',
    title: 'English (India)'
  }, {
    id: 'en-MT',
    title: 'English (Malta)'
  }, {
    id: 'en-NA',
    title: 'English (Namibia)'
  }, {
    id: 'en-NZ',
    title: 'English (New Zealand)'
  }, {
    id: 'en-PH',
    title: 'English (Philippines)'
  }, {
    id: 'en-SG',
    title: 'English (Singapore)'
  }, {
    id: 'en-ZA',
    title: 'English (South Africa)'
  }, {
    id: 'en-CH',
    title: 'English (Switzerland)'
  }, {
    id: 'en-GB',
    title: 'English (United Kingdom)'
  }, {
    id: 'en-US',
    title: 'English (United States)'
  }, {
    id: 'fil',
    title: 'Filipino'
  }, {
    id: 'fil-PH',
    title: 'Filipino (Philippines)'
  }, {
    id: 'fi',
    title: 'Finnish'
  }, {
    id: 'fi-FI',
    title: 'Finnish (Finland)'
  }, {
    id: 'fr',
    title: 'French'
  }, {
    id: 'fr-BE',
    title: 'French (Belgium)'
  }, {
    id: 'fr-CA',
    title: 'French (Canada)'
  }, {
    id: 'fr-FR',
    title: 'French (France)'
  }, {
    id: 'fr-CH',
    title: 'French (Switzerland)'
  }, {
    id: 'de',
    title: 'German'
  }, {
    id: 'de-AT',
    title: 'German (Austria)'
  }, {
    id: 'de-DE',
    title: 'German (Germany)'
  }, {
    id: 'de-CH',
    title: 'German (Switzerland)'
  }, {
    id: 'hi',
    title: 'Hindi'
  }, {
    id: 'hi-IN',
    title: 'Hindi (India)'
  }, {
    id: 'hu',
    title: 'Hungarian'
  }, {
    id: 'hu-HU',
    title: 'Hungarian (Hungary)'
  }, {
    id: 'id',
    title: 'Indonesian'
  }, {
    id: 'id-ID',
    title: 'Indonesian (Indonesia)'
  }, {
    id: 'it',
    title: 'Italian'
  }, {
    id: 'it-IT',
    title: 'Italian (Italy)'
  }, {
    id: 'it-CH',
    title: 'Italian (Switzerland)'
  }, {
    id: 'ja',
    title: 'Japanese'
  }, {
    id: 'ja-JP',
    title: 'Japanese (Japan)'
  }, {
    id: 'ms',
    title: 'Malay'
  }, {
    id: 'ms-MY',
    title: 'Malay (Malaysia)'
  }, {
    id: 'nb',
    title: 'Norwegian Bokmål'
  }, {
    id: 'nb-NO',
    title: 'Norwegian Bokmål (Norway)'
  }, {
    id: 'pl',
    title: 'Polish'
  }, {
    id: 'pl-PL',
    title: 'Polish (Poland)'
  }, {
    id: 'pt',
    title: 'Portuguese'
  }, {
    id: 'pt-BR',
    title: 'Portuguese (Brazil)'
  }, {
    id: 'pt-PT',
    title: 'Portuguese (Portugal)'
  }, {
    id: 'ro',
    title: 'Romanian'
  }, {
    id: 'ro-RO',
    title: 'Romanian (Romania)'
  }, {
    id: 'ru',
    title: 'Russian'
  }, {
    id: 'ru-RU',
    title: 'Russian (Russia)'
  }, {
    id: 'sk',
    title: 'Slovak'
  }, {
    id: 'sk-SK',
    title: 'Slovak (Slovakia)'
  }, {
    id: 'es',
    title: 'Spanish'
  }, {
    id: 'es-AR',
    title: 'Spanish (Argentina)'
  }, {
    id: 'es-CO',
    title: 'Spanish (Colombia)'
  }, {
    id: 'es-419',
    title: 'Spanish (Latin America)'
  }, {
    id: 'es-MX',
    title: 'Spanish (Mexico)'
  }, {
    id: 'es-ES',
    title: 'Spanish (Spain)'
  }, {
    id: 'es-US',
    title: 'Spanish (United States)'
  }, {
    id: 'es-UY',
    title: 'Spanish (Uruguay)'
  }, {
    id: 'sv',
    title: 'Swedish'
  }, {
    id: 'sv-SE',
    title: 'Swedish (Sweden)'
  }, {
    id: 'th',
    title: 'Thai'
  }, {
    id: 'th-TH',
    title: 'Thai (Thailand)'
  }],
  languages: [{
    id: 'en',
    title: 'English'
  }, {
    id: 'fr',
    title: 'Français'
  }, {
    id: 'de',
    title: 'Deutsch'
  }, {
    id: 'yy',
    title: 'Sherlock'
  }]
};
exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
//# sourceMappingURL=constants.js.map