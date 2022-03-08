import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import { useState, useEffect, useRef, cloneElement } from 'react';
import isString from "lodash/fp/isString";
export var resolveGoogleMapsApiKey = function resolveGoogleMapsApiKey() {
  return process.env.STORYBOOK_GOOGLE_MAPS_API_KEY;
};
export var isValueOption = function isValueOption(value) {
  return !isString(value) && ((value === null || value === void 0 ? void 0 : value.code) && (value === null || value === void 0 ? void 0 : value.name) || (value === null || value === void 0 ? void 0 : value.id) && (value === null || value === void 0 ? void 0 : value.displayName));
};
export var mapValuesToOptions = function mapValuesToOptions(values) {
  return values.every(isValueOption) && values || _mapInstanceProperty(values).call(values, function (value) {
    return {
      code: value.toLowerCase(),
      name: value
    };
  });
};
export var isVisible = function isVisible() {
  var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return condition ? undefined : false;
};
export var stateDecoratorFactory = function stateDecoratorFactory(valueName, callbackName) {
  return function (story, _ref) {
    var args = _ref.args;
    var argsValue = args[valueName];

    var _useState = useState(argsValue),
        _useState2 = _slicedToArray(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

    var onValueChange = function onValueChange(newValue) {
      setValue(newValue);
      args[callbackName](newValue);
    };

    var isFirstRun = useRef(true);
    useEffect(function () {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }

      setValue(argsValue);
    }, [argsValue]);
    return cloneElement(story(), {
      [valueName]: value,
      [callbackName]: onValueChange
    });
  };
};
//# sourceMappingURL=index.js.map