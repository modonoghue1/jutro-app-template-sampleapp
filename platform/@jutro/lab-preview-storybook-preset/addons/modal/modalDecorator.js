"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalDecorator = void 0;

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _components = require("@jutro/components");

var _Story = require("../utils/Story");

const modalDecorator = (0, _addons.makeDecorator)({
  name: 'jutro/modal-next',
  parameterName: 'modal',
  wrapper: (storyFn, context) => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_components.ModalNextProvider, null, _react.default.createElement(_Story.Story, {
    storyFn: storyFn,
    context: context
  })), _react.default.createElement("div", {
    id: "modalRoot"
  }))
});
exports.modalDecorator = modalDecorator;
//# sourceMappingURL=modalDecorator.js.map