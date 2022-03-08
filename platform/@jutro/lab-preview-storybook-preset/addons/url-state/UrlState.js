"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _coreEvents = require("@storybook/core-events");

var _useQueryParam = require("../utils/useQueryParam");

const UrlState = () => {
  const api = (0, _api.useStorybookApi)();
  (0, _react.useEffect)(() => {
    const listener = api.on(_coreEvents.STORY_CHANGED, () => {
      (0, _useQueryParam.setQueryParams)(api.getUrlState().queryParams);
    });
    return () => api.off(_coreEvents.STORY_CHANGED, listener);
  }, [api]);
  return _react.default.createElement(_react.default.Fragment, null);
};

exports.UrlState = UrlState;
UrlState.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "UrlState"
};
UrlState.__docgenInfo = {
  componentName: "UrlState",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "UrlState",
  methods: [],
  actualName: "UrlState"
};
//# sourceMappingURL=UrlState.js.map