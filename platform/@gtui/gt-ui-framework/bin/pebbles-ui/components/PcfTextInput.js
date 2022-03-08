"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfTextInput = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _PcfComponent = _interopRequireDefault(require("./PcfComponent"));

class TextInput extends _PcfComponent.default {
  constructor(cssSelector) {
    for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }

    super(cssSelector, options);
    this.inputField = undefined;

    if (this.component.find('input') !== undefined) {
      this.inputField = this.component.find('input');
    }
  }

  getValue() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      // TODO: readonly fields can be located using `input` Selector. Try to create another component for readonly files or fallback on Selector
      if (yield _this.component.hasClass('gw-readonly')) {
        return yield _this.component.innerText;
      } else {
        return yield _this.inputField.value;
      }
    })();
  }

  setValue(value) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this2.inputField, value, _this2.defaultInputOptions);
    })();
  }

}

var PcfTextInput = function pcfTextInputFactory(selector) {
  for (var _len2 = arguments.length, options = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    options[_key2 - 1] = arguments[_key2];
  }

  return new TextInput(selector, ...options);
};

exports.PcfTextInput = PcfTextInput;