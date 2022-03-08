"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ErrorPage = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _ToggleSwitch = require("../../components/ToggleSwitch.js");

var _ExperienceLobBasePage = require("./ExperienceLobBasePage");

class ErrorPage {
  constructor() {
    this.errorTitleHeader = (0, _testcafe.Selector)("#errorTitle");
    this.errorBody = (0, _testcafe.Selector)("#callUsText");
    this.homepageButton = (0, _testcafe.Selector)("button").withText("Return to Homepage");
  }

  readErrorTitle() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this.errorTitleHeader.innerText;
    })();
  }

  readErrorBody() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this2.errorBody.innerText;
    })();
  }

  selectReturnToHomepageButton() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this3.homepageButton);
    })();
  }

}

exports.ErrorPage = ErrorPage;

var _default = new ErrorPage();

exports.default = _default;