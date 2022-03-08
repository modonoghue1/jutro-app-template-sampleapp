"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useI18nState = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _api = require("@storybook/api");

var _constants = require("../constants");

var _config = require("../config");

const useI18nState = () => {
  const _useGlobals = (0, _api.useGlobals)(),
        _useGlobals2 = (0, _slicedToArray2.default)(_useGlobals, 2),
        globals = _useGlobals2[0],
        updateGlobals = _useGlobals2[1];

  const i18nParams = (0, _api.useParameter)(_constants.PARAM_KEY);

  const setI18nState = state => {
    updateGlobals({
      [_constants.ADDON_ID]: state
    });
  };

  return [(0, _config.getConfig)(globals[_constants.ADDON_ID], i18nParams), setI18nState];
};

exports.useI18nState = useI18nState;
//# sourceMappingURL=useI18nState.js.map