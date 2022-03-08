"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfCheckBox = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _PcfComponent = _interopRequireDefault(require("./PcfComponent"));

class Checkbox extends _PcfComponent.default {
  constructor(cssSelector) {
    for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }

    super(cssSelector, options);
    this.checkbox = this.component.find('input').withAttribute('type', 'checkbox');
  }

  isChecked() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this.checkbox.checked;
    })();
  }

  click() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.checkbox);
    })();
  }

  getValue() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this3.checkbox.innerText;
    })();
  }

}

var PcfCheckBox = function pcfCheckBoxFactory(selector) {
  for (var _len2 = arguments.length, options = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    options[_key2 - 1] = arguments[_key2];
  }

  return new Checkbox(selector, ...options);
};

exports.PcfCheckBox = PcfCheckBox;