"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useQueryParam = useQueryParam;
exports.setQueryParams = void 0;

var _urlSearchParams = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/url-search-params"));

var _data = require("@jutro/data");

var _api = require("@storybook/api");

const encodeQueryParam = value => value.replace(/\s/g, '-');

const setQueryParams = params => {
  const searchParams = new _urlSearchParams.default(window.location.search);
  Object.entries(params).filter(([, value]) => !(0, _data.isEmptyValue)(value)).forEach(([key, value]) => searchParams.set(key, encodeQueryParam(value || '')));
  const queryParams = decodeURIComponent(searchParams.toString());
  const newRelativePathQuery = `${window.location.pathname}?${queryParams}`;
  window.history.replaceState(null, '', newRelativePathQuery);
  return searchParams;
};

exports.setQueryParams = setQueryParams;

function useQueryParam(key) {
  const api = (0, _api.useStorybookApi)();
  let searchParams = new _urlSearchParams.default(window.location.search);

  const setParam = value => {
    api.setQueryParams({
      [key]: value
    });
    searchParams = setQueryParams({
      [key]: value
    });
  };

  return [searchParams.get(key), setParam];
}
//# sourceMappingURL=useQueryParam.js.map