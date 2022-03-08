"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfComponent = exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class Component {
  constructor(cssSelector) {
    // ToDo: Add parameter to set default timeout value? Currently it's 30 seconds with seems too long.
    // this.component = Selector(cssSelector, { timeout: 5000 });
    this.component = (0, _testcafe.Selector)(cssSelector);
    this.defaultInputOptions = {
      paste: true,
      replace: true
    };
  } // ToDo: Support generic API implementations in the base class?


  getValue() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this.component.value;
    })();
  }

  click() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.component);
    })();
  } // May need to be overridden for some classes
  // (at least where the ID isn't sufficient to identify the DOM element)


  isAvailable() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var disabled = (yield _this3.component.hasAttribute("disabled")) || (yield _this3.component.hasAttribute("aria-disabled"));
      return disabled == null || !disabled;
    })();
  } // ToDo: Research implementation (e.g. not the same for all classes, not supported for PTF SelectInput)
  // async hasFocus() { return await this.component.find('div.gw-focus').exists; }


}

exports.default = Component;

var PcfComponent = function pcfComponent(selector) {
  for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    options[_key - 1] = arguments[_key];
  }

  return new Component(selector, ...options);
};

exports.PcfComponent = PcfComponent;