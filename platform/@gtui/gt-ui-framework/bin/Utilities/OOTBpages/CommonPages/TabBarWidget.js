"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class TabBarWidget {
  constructor() {
    this.tabBarWidgetSetting = (0, _testcafe.Selector)('#gw-TabBarWidget--settings');
    this.tabBarLogoutTabBarLink = (0, _testcafe.Selector)('#TabBar-LogoutTabBarLink div');
  }

  logout() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.expect(_this.tabBarWidgetSetting.visible).ok('Tab bar widget visible');
      yield _testcafe.t.click(_this.tabBarWidgetSetting);
      yield _testcafe.t.click(_this.tabBarLogoutTabBarLink);
    })();
  }

}

module.exports = new TabBarWidget();