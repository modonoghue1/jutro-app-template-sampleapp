'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class CCDesktopPage {
  constructor() {
    this.ClaimTab = (0, _testcafe.Selector)("#TabBar-ClaimTab > div:nth-child(1) > div:nth-child(2)");
    this.ClaimTabExpandButton = (0, _testcafe.Selector)("#TabBar-ClaimTab > div[class='gw-action--expand-button']");
    this.NewClaim = (0, _testcafe.Selector)("#TabBar-ClaimTab-ClaimTab_FNOLWizard > div:nth-child(1) > div:nth-child(2)");
  }

  clickOnClaimTab() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.ClaimTab);
    })();
  }

  clickOnClaimExpandButtonAndThenNewClaim() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.ClaimTabExpandButton);
      yield _testcafe.t.click(_this2.NewClaim);
    })();
  }

}

module.exports = new CCDesktopPage();