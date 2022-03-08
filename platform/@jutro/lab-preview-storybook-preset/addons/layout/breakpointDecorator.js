"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breakpointDecorator = void 0;

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _layout = require("@jutro/layout");

var _Story = require("../utils/Story");

const breakpointDecorator = (0, _addons.makeDecorator)({
  name: 'jutro/layout-breakpoint',
  parameterName: 'breakpoint',
  wrapper: (storyFn, context) => _react.default.createElement(_layout.BreakpointTracker, null, _react.default.createElement(_Story.Story, {
    storyFn: storyFn,
    context: context
  }))
});
exports.breakpointDecorator = breakpointDecorator;
//# sourceMappingURL=breakpointDecorator.js.map