"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfNorthPanel = void 0;

var _testcafe = require("testcafe");

var _PcfTopNavTabBar = require("./PcfTopNavTabBar");

class PcfNorthPanel {
  constructor() {
    this.tabBar = new _PcfTopNavTabBar.PcfTopNavTabBar();
    this.logo = (0, _testcafe.Selector)('#gw-GuidewireLogoWidget');
    this.quickJump = (0, _testcafe.Selector)('div#QuickJump');
  }

}

exports.PcfNorthPanel = PcfNorthPanel;