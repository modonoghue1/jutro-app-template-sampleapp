"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ExperienceLobBasePage = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _SelectBox = require("../../components/SelectBox.js");

class ExperienceLobBasePage {
  constructor() {
    this.nextButton = (0, _testcafe.Selector)("button").find("span").withText("Next");
    this.pageTitleHeader = (0, _testcafe.Selector)(".jut__Panel__title");
  }

  clickNextButton() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.nextButton);
    })();
  }

  readPageTitle() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this2.pageTitleHeader.innerText;
    })();
  }

}

exports.ExperienceLobBasePage = ExperienceLobBasePage;

var _default = new ExperienceLobBasePage();

exports.default = _default;