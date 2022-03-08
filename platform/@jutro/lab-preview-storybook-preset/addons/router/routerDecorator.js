"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerDecorator = void 0;

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _reactRouterDom = require("react-router-dom");

var _Story = require("../utils/Story");

const routerDecorator = (0, _addons.makeDecorator)({
  name: 'jutro/router',
  parameterName: 'router',
  wrapper: (storyFn, context) => _react.default.createElement(_reactRouterDom.MemoryRouter, null, _react.default.createElement(_Story.Story, {
    storyFn: storyFn,
    context: context
  }))
});
exports.routerDecorator = routerDecorator;
//# sourceMappingURL=routerDecorator.js.map