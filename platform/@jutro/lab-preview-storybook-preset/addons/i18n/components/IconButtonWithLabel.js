"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButtonWithLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _theming = require("@storybook/theming");

const StyledIconButton = (0, _theming.styled)(_components.IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center'
}));

const IconButtonLabel = _theming.styled.div(({
  theme: storybookTheme
}) => ({
  fontSize: storybookTheme.typography.size.s1,
  marginLeft: 10
}));

const IconButtonWithLabel = ({
  id,
  title,
  activeItem,
  icon
}) => _react.default.createElement(StyledIconButton, {
  key: id,
  title: title
}, _react.default.createElement(_components.Icons, {
  icon: icon
}), _react.default.createElement(IconButtonLabel, null, activeItem));

exports.IconButtonWithLabel = IconButtonWithLabel;
IconButtonWithLabel.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "IconButtonWithLabel"
};
IconButtonWithLabel.__docgenInfo = {
  componentName: "IconButtonWithLabel",
  packageName: "@jutro/lab-preview-storybook-preset",
  description: "",
  displayName: "IconButtonWithLabel",
  methods: [],
  actualName: "IconButtonWithLabel"
};
//# sourceMappingURL=IconButtonWithLabel.js.map