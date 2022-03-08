'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _ISBaseStep = require("../../OOTBSteps/CommonSteps/ISBaseStep");

var Selector = (input, t) => {
  return (0, _testcafe.Selector)(input).with({
    boundTestRun: t
  });
};

var getCurrentUrl = (0, _testcafe.ClientFunction)(() => {
  return window.location.href;
});

class ISLoginPage {
  constructor() {
    this.LoginUserName = Selector('#Login-LoginScreen-LoginDV-username > div > input');
    this.LoginPassword = Selector('#Login-LoginScreen-LoginDV-password > div > input');
    this.SubmitButton = Selector('#Login-LoginScreen-LoginDV-submit > div');
  }

  login(username, password) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield (0, _ISBaseStep.adjustBaseHref)();
      yield _testcafe.t.typeText(_this.LoginUserName, username);
      yield _testcafe.t.typeText(_this.LoginPassword, password);
      yield _testcafe.t.click(_this.SubmitButton);
    })();
  }

}

module.exports = new ISLoginPage();