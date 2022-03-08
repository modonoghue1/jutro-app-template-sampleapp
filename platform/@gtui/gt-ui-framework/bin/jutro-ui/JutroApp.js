"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JutroApp = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _OktaLoginPage = require("./pages/OktaLoginPage");

var _testcafe = require("testcafe");

var _ApplicationConfig = require("../Utilities/Configurations/ApplicationConfig");

class JutroApp {
  constructor(appName) {
    this.appConfig = new _ApplicationConfig.ApplicationConfig(appName);
    this.roleForApplication = this.initializeOktaAuthRole();
  }

  loginThroughOkta() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var loginPage = new _OktaLoginPage.OktaLoginPage();
      yield loginPage.login(_this.appConfig.getAppUsername(), _this.appConfig.getAppPassword());
      yield _this.waitForOktaRedirects();
    })();
  }

  waitForOktaRedirects() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.wait(10000);
    })();
  }

  navigateToApp() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.navigateTo(_this2.appConfig.getAppUrl()).maximizeWindow();
    })();
  }

  loginWithRole() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.useRole(_this3.roleForApplication);
    })();
  }

  initializeOktaAuthRole() {
    var _this4 = this;

    if (this.appConfig.hasLoginCredentials()) {
      return (0, _testcafe.Role)(this.appConfig.getAppUrl(), /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
        yield _this4.loginThroughOkta();
        yield _this4.navigateToApp();
      }), {
        preserveUrl: true
      });
    }
  }

  getLoginRole() {
    return this.roleForApplication;
  }

}

exports.JutroApp = JutroApp;