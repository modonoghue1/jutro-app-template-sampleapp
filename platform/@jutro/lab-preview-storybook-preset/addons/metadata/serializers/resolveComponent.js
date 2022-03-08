"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unboxComponentType = unboxComponentType;
exports.resolveComponent = resolveComponent;

var _react = require("react");

var _isString = _interopRequireDefault(require("lodash/isString"));

var _uimetadata = require("@jutro/uimetadata");

var _uiconfig = require("@jutro/uiconfig");

function unboxComponentType(component) {
  if ((0, _isString.default)(component)) {
    return component;
  }

  const wrapper = component.WrappedComponent;

  if (wrapper) {
    return unboxComponentType(wrapper);
  }

  return component;
}

const extractOriginalComponent = component => {
  if (component === _react.Fragment) return undefined;

  if (component.type || component.render) {
    const internalComponent = extractOriginalComponent(component.type || component.render);

    if (!internalComponent) {
      return undefined;
    }

    internalComponent.__docgenInfo = component === null || component === void 0 ? void 0 : component.__docgenInfo;
    return internalComponent;
  }

  return component;
};

function resolveComponent(componentName) {
  if ((0, _uimetadata.isSupportedHTMLElement)(componentName)) {
    return componentName;
  }

  const componentDef = (0, _uiconfig.resolveComponentFromName)(componentName);

  if (!componentDef) {
    return undefined;
  }

  return extractOriginalComponent(unboxComponentType(componentDef.component));
}
//# sourceMappingURL=resolveComponent.js.map