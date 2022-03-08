"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = exports.setConfig = void 0;

var _config = require("@jutro/config");

var _constants = require("./constants");

const setConfig = config => {
  (0, _config.loadConfiguration)({
    localeSettings: {
      availableLocales: config.locales.map(locale => locale.id),
      availableLanguages: config.languages.map(lang => lang.id),
      preferredLocale: config.locale,
      preferredLanguage: config.language,
      defaultCountryCode: 'US',
      defaultPhoneCountry: 'US'
    }
  });
};

exports.setConfig = setConfig;

const getConfig = (i18nGlobals, i18nParams) => ({ ..._constants.DEFAULT_CONFIG,
  ...i18nParams,
  ...i18nGlobals
});

exports.getConfig = getConfig;
//# sourceMappingURL=config.js.map