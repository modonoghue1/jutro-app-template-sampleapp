"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfSelectInput = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _PcfComponent = _interopRequireDefault(require("./PcfComponent"));

class SelectInput extends _PcfComponent.default {
  constructor(cssSelector) {
    for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }

    super(cssSelector, options);
    this.selectOptions = this.component.find('option'); // ToDo: Statically save the list of options in the constructor?
  }

  selectOptionByLabel(optionLabel) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.component).click(_this.selectOptions.withText(optionLabel));
    })();
  }

  selectOptionByValue(optionValue) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.component).click(_this2.selectOptions.withAttribute('value', optionValue));
    })();
  }

  selectFirstOption() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this3.selectOptionByValue(yield _this3.getOptions().first);
    })();
  }

  getNthOption(index) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this4.selectOptions.nth(index);
    })();
  } // Note that the option indexes are 0-based here


  selectNthOption(index) {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this5.component).click(yield _this5.getNthOption(index));
    })();
  }

  getNthOptionValue(index) {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this6.selectOptions.nth(index).value;
    })();
  } // ToDo: Add getOptionWithName() API?
  // Select the first option with a non-empty value


  selectFirstOptionWithValue() {
    var _this7 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      for (var i = 0; i < (yield _this7.getOptionsCount()); i++) {
        var nthOptionValue = yield _this7.selectOptions.nth(i).value;

        if (nthOptionValue.toString().length > 0) {
          yield _this7.selectOptionByValue(nthOptionValue);
          break;
        }
      }
    })();
  }

  getSelectedOption() {
    var _this8 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this8.component.find('option[selected]');
    })();
  }

  getSelectedOptionLabel() {
    var _this9 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this9.component.find('option[selected]').textContent;
    })();
  }

  getSelectedOptionValue() {
    var _this10 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this10.component.find('option[selected]').value;
    })();
  }

  getOptions() {
    var _this11 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var options = [];

      for (var i = 0; i < (yield _this11.selectOptions.count); i++) {
        options[i] = yield _this11.getNthOptionValue(i);
      }

      return options;
    })();
  }

  getOptionsCount() {
    var _this12 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this12.selectOptions.count;
    })();
  } // ToDo: Can we move this to the PcfComponent base class?


  getLabel() {
    var _this13 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this13.component.parent().find('.gw-label').innerText;
    })();
  }

  isMultiSelect() {
    var _this14 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _this14.component.find('option[selected]').hasAttribute('multiple');
    })();
  }

}

var PcfSelectInput = function pcfSelectInputFactory(selector) {
  for (var _len2 = arguments.length, options = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    options[_key2 - 1] = arguments[_key2];
  }

  return new SelectInput(selector, ...options);
};

exports.PcfSelectInput = PcfSelectInput;