"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = void 0;

var _components = require("@storybook/components");

var _react = _interopRequireDefault(require("react"));

var _icons = require("./icons");

const Icon = ({
  icon
}) => {
  if (icon && _icons.icons[icon]) {
    return _react.default.createElement("svg", {
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, _react.default.createElement("path", {
      d: _icons.icons[icon],
      fill: "currentColor",
      fillRule: "nonzero"
    }));
  }

  return _react.default.createElement(_components.Icons, {
    icon: icon
  });
};

exports.Icon = Icon;
Icon.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Icon"
};
Icon.__docgenInfo = {
  componentName: "Icon",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "Icon",
  methods: [],
  actualName: "Icon"
};
//# sourceMappingURL=Icon.js.map