"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfTopNavTabBar = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class PcfTopNavTabBar {
  constructor() {
    this.tabs = (0, _testcafe.Selector)('.gw-TabWidget.gw-isTopLevelMenu');
  }

  clickTabWithName(name) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.getTabMenuContainer(name);

      if ((yield _this.tabMenuContainer.hasClass("gw-hasOpenSubMenu")) === false) {
        yield _testcafe.t.click(_this.tabMenuContainer.find(".gw-action--expand-button"));
      }
    })();
  }

  getTabMenuContainer(name) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      _this2.tabMenuContainer = (0, _testcafe.Selector)(_this2.tabs.withText(name));
    })();
  }

  openPageFromNavBar(tabMenu, pageName) {
    var _arguments = arguments,
        _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this3.clickTabWithName(tabMenu);

      for (var _len = _arguments.length, subMenuPath = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        subMenuPath[_key - 2] = _arguments[_key];
      }

      for (var subMenu of subMenuPath) {
        console.log(subMenu);
        yield _testcafe.t.hover((0, _testcafe.Selector)('.gw-TabWidget.gw-isTopLevelMenu.gw-hasOpenSubMenu').find(".gw-MenuItemWidget.gw-hasChildren").withText(subMenu));
      }

      yield _testcafe.t.click((0, _testcafe.Selector)('.gw-TabWidget.gw-isTopLevelMenu.gw-hasOpenSubMenu').find('.gw-action--inner').withAttribute("aria-label", pageName));
    })();
  }

}

exports.PcfTopNavTabBar = PcfTopNavTabBar;