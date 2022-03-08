"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleSwitch = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class ToggleSwitch {
  constructor(selector) {
    this.switch = (0, _testcafe.Selector)(selector).parent();
  }

  selectSwitch() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var isSelected = yield _this.switch.find("label").getAttribute("aria-checked");

      if (isSelected === "false") {
        yield _testcafe.t.click(_this.switch);
      }
    })();
  }

  static initaliseToggleSwitchUsingLabel(label) {
    return new ToggleSwitch((0, _testcafe.Selector)("span").withText(label).parent().parent().parent().find("input"));
  }

}

exports.ToggleSwitch = ToggleSwitch;