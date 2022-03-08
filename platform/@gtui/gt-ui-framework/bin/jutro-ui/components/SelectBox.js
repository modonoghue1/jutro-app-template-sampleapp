"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectBox = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class SelectBox {
  constructor(selector) {
    this.rootContainer = (0, _testcafe.Selector)(selector);
  }

  chooseOption(option) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.rootContainer.find(".jut__TypeaheadMultiSelectField__control"));
      yield _testcafe.t.click(_this.rootContainer.find("div").withText(option));
    })();
  }

}

exports.SelectBox = SelectBox;