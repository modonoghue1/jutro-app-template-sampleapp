"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocsLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _clientLogger = require("@storybook/client-logger");

var _addons = require("@storybook/addons");

var _constants = require("./constants");

const IconButtonWithLabel = (0, _theming.styled)(_components.IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center'
}));

const IconButtonLabel = _theming.styled.div(({
  theme: storybookTheme
}) => ({
  fontSize: storybookTheme.typography.size.s1,
  marginLeft: 10
}));

const DocsLink = () => {
  var _addons$getConfig, _addons$getConfig$doc;

  const api = (0, _api.useStorybookApi)();

  const _useParameter = (0, _api.useParameter)(_constants.PARAM_KEY, {}),
        _useParameter$disable = _useParameter.disable,
        disable = _useParameter$disable === void 0 ? false : _useParameter$disable,
        templateUrl = _useParameter.templateUrl,
        docsId = _useParameter.docsId;

  const defaultGetDocsLink = (_addons$getConfig = _addons.addons.getConfig()) === null || _addons$getConfig === void 0 ? void 0 : (_addons$getConfig$doc = _addons$getConfig.docsLink) === null || _addons$getConfig$doc === void 0 ? void 0 : _addons$getConfig$doc.getDocsLink;
  if (disable) return null;

  if (!templateUrl && !defaultGetDocsLink) {
    _clientLogger.logger.warn(`[${_constants.ADDON_TITLE}] Cannot generate link to documentation. Please provide docsLink.getDocsLink function in addons config or define docsLink.templateUrl in story parameters`);

    return null;
  }

  const getHref = () => {
    var _api$getCurrentStoryD;

    const storyId = (_api$getCurrentStoryD = api.getCurrentStoryData()) === null || _api$getCurrentStoryD === void 0 ? void 0 : _api$getCurrentStoryD.id;
    const componentIdMatch = /^(.+)--.*$/.exec(storyId);
    const componentId = docsId || (componentIdMatch === null || componentIdMatch === void 0 ? void 0 : componentIdMatch[1]);

    if (componentId) {
      if (templateUrl) {
        return templateUrl.replace('*ID*', componentId);
      }

      return defaultGetDocsLink(componentId);
    }

    return null;
  };

  const href = getHref();
  return href ? _react.default.createElement(_react.default.Fragment, {
    key: "docs-link"
  }, _react.default.createElement(IconButtonWithLabel, {
    title: "Go to documentation page for this component",
    href: href,
    target: "_blank"
  }, _react.default.createElement(_components.Icons, {
    icon: "link"
  }), _react.default.createElement(IconButtonLabel, null, "Read the docs")), _react.default.createElement(_components.Separator, null)) : null;
};

exports.DocsLink = DocsLink;
DocsLink.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "DocsLink"
};
DocsLink.__docgenInfo = {
  componentName: "DocsLink",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "DocsLink",
  methods: [],
  actualName: "DocsLink"
};
//# sourceMappingURL=DocsLink.js.map