'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewClaimSavedScreen {
  constructor() {
    this.claimSavedPromptInfo = (0, _testcafe.Selector)('#NewClaimSaved-NewClaimSavedScreen-NewClaimSavedDV-Header');
  }

  checkClaimSuccessfulyCreatedConfirmation() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var confirmationValue = yield _this.claimSavedPromptInfo.textContent;
      console.log(confirmationValue);
      yield _testcafe.t.expect(confirmationValue).match(/^Claim \d{3}-\d{2}-\d{6} has been successfully saved\./);
    })();
  }

}

module.exports = new NewClaimSavedScreen();