"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18nTool = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _LocaleSelector = require("./LocaleSelector");

var _LanguageSelector = require("./LanguageSelector");

var _constants = require("../constants");

var _useI18nState3 = require("../hooks/useI18nState");

var _useQueryParam5 = require("../../utils/useQueryParam");

const I18nTool = () => {
  const _useQueryParam = (0, _useQueryParam5.useQueryParam)(_constants.LOCALE_QUERY_KEY),
        _useQueryParam2 = (0, _slicedToArray2.default)(_useQueryParam, 2),
        localeQuery = _useQueryParam2[0],
        setLocaleQuery = _useQueryParam2[1];

  const _useQueryParam3 = (0, _useQueryParam5.useQueryParam)(_constants.LANGUAGE_QUERY_KEY),
        _useQueryParam4 = (0, _slicedToArray2.default)(_useQueryParam3, 2),
        languageQuery = _useQueryParam4[0],
        setLanguageQuery = _useQueryParam4[1];

  const _useI18nState = (0, _useI18nState3.useI18nState)(),
        _useI18nState2 = (0, _slicedToArray2.default)(_useI18nState, 2),
        _useI18nState2$ = _useI18nState2[0],
        activeLanguage = _useI18nState2$.language,
        activeLocale = _useI18nState2$.locale,
        languages = _useI18nState2$.languages,
        locales = _useI18nState2$.locales,
        setI18nState = _useI18nState2[1];

  const localeChange = locale => {
    setLocaleQuery(locale);
    setI18nState({
      language: activeLanguage,
      locale
    });
  };

  const languageChange = language => {
    setI18nState({
      locale: activeLocale,
      language
    });
    setLanguageQuery(language);
  };

  if (localeQuery && localeQuery !== activeLocale) {
    setI18nState({
      language: activeLanguage,
      locale: localeQuery
    });
  }

  if (languageQuery && languageQuery !== activeLanguage) {
    setI18nState({
      locale: activeLocale,
      language: languageQuery
    });
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_LocaleSelector.LocaleSelector, {
    locale: activeLocale,
    onLocaleChange: localeChange,
    locales: locales
  }), _react.default.createElement(_LanguageSelector.LanguageSelector, {
    language: activeLanguage,
    onLanguageChange: languageChange,
    languages: languages
  }), _react.default.createElement(_components.Separator, null));
};

exports.I18nTool = I18nTool;
I18nTool.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "I18nTool"
};
I18nTool.__docgenInfo = {
  componentName: "I18nTool",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "I18nTool",
  methods: [],
  actualName: "I18nTool"
};
//# sourceMappingURL=I18nTool.js.map