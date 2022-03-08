"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withI18n = exports.I18nDecorator = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _addons = require("@storybook/addons");

var _locale = require("@jutro/locale");

var _logger = require("@jutro/logger");

var _en = _interopRequireDefault(require("@jutro/translations/lang-data/en.json"));

var _Story = require("../utils/Story");

var _constants = require("./constants");

var _config = require("./config");

const I18nDecorator = ({
  storyFn,
  context
}) => {
  const _useState = (0, _react.useState)(_en.default),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        messages = _useState2[0],
        setMessages = _useState2[1];

  const globals = context.globals,
        parameters = context.parameters;
  const config = (0, _config.getConfig)(globals[_constants.ADDON_ID], parameters[_constants.PARAM_KEY]);
  (0, _config.setConfig)(config);
  const locale = config.locale,
        language = config.language,
        translationsLoader = config.translationsLoader;

  const _useState3 = (0, _react.useState)(locale),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        polyfilledLocale = _useState4[0],
        setPolyfilledLocale = _useState4[1];

  (0, _react.useEffect)(() => {
    _locale.LocaleService.setCurrentLanguage(language);

    let isCancelled = false;

    if (!translationsLoader) {
      (0, _logger.warning)('No function to load the translations was provided');
      return () => {
        isCancelled = true;
      };
    }

    const loadMessages = async () => {
      try {
        const loadedMessages = await translationsLoader(language);
        if (!isCancelled) setMessages(loadedMessages);
      } catch (err) {
        (0, _logger.warning)(`Unable to load translations for lang: ${language}. Details: ${err}`);
      }
    };

    loadMessages();
    return () => {
      isCancelled = true;
    };
  }, [language]);
  (0, _react.useEffect)(() => {
    _locale.LocaleService.setCurrentLocale(locale);

    (0, _locale.polyfillDisplayNamesLocale)(locale).finally(() => {
      setPolyfilledLocale(locale);
    });
  }, [locale]);
  return _react.default.createElement(_locale.GlobalizationProvider, {
    key: `i18n-${language}-${polyfilledLocale}`,
    defaultLocale: polyfilledLocale,
    defaultLanguage: language,
    messages: messages
  }, _react.default.createElement(_Story.Story, {
    storyFn: storyFn,
    context: context
  }));
};

exports.I18nDecorator = I18nDecorator;
const withI18n = (0, _addons.makeDecorator)({
  name: 'withI18n',
  parameterName: _constants.PARAM_KEY,
  wrapper: (storyFn, context) => _react.default.createElement(I18nDecorator, {
    storyFn: storyFn,
    context: context
  })
});
exports.withI18n = withI18n;
I18nDecorator.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "I18nDecorator"
};
I18nDecorator.__docgenInfo = {
  componentName: "I18nDecorator",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "I18nDecorator",
  methods: [],
  actualName: "I18nDecorator"
};
//# sourceMappingURL=i18n.js.map