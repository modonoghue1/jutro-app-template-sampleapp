'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class AccountSummaryPage {
  constructor() {
    this.ActionsMenu = (0, _testcafe.Selector)("#AccountFile-AccountFileMenuActions");
  }

  clickonActionsMenu() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.ActionsMenu);
    })();
  }

}

module.exports = new AccountSummaryPage();