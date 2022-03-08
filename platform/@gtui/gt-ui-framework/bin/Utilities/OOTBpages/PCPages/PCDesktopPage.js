'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class DesktopPage {
  constructor() {
    this.AccountTab = (0, _testcafe.Selector)("#TabBar-AccountTab > div.gw-action--inner.gw-hasDivider");
  }

  clickonAccountTab() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.AccountTab);
    })();
  }

}

module.exports = new DesktopPage();