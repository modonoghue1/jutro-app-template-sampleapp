"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OktaLoginPage = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class OktaLoginPage {
  constructor() {
    this.usernameTextBox = (0, _testcafe.Selector)("#idp-discovery-username");
    this.nextButton = (0, _testcafe.Selector)("#idp-discovery-submit");
    this.passwordTextBox = (0, _testcafe.Selector)("#okta-signin-password");
    this.signinButton = (0, _testcafe.Selector)("#okta-signin-submit");
  }

  login(username, password) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.enterUsername(username);
      yield _this.clickNextButton();
      yield _this.enterPassword(password);
      yield _this.clickSignInButton();
    })();
  }

  enterUsername(username) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this2.usernameTextBox, username);
    })();
  }

  clickNextButton() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this3.nextButton);
    })();
  }

  enterPassword(password) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this4.passwordTextBox, password);
    })();
  }

  clickSignInButton() {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this5.signinButton);
    })();
  }

}

exports.OktaLoginPage = OktaLoginPage;