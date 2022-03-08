"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfButton = void 0;

var _PcfComponent = _interopRequireDefault(require("./PcfComponent"));

class Button extends _PcfComponent.default {
  constructor(cssSelector) {
    for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }

    super(cssSelector, options);
  } // ToDo: Bare-bones implementation for POC. Fill in API later.
  // getLabel()


}

var PcfButton = function pcfButtonFactory(selector) {
  for (var _len2 = arguments.length, options = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    options[_key2 - 1] = arguments[_key2];
  }

  return new Button(selector, ...options);
};

exports.PcfButton = PcfButton;