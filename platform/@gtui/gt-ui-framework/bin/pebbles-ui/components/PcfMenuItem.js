"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfMenuItem = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class PcfMenuItem {
  constructor(menuRoot) {
    this.menuSelector = (0, _testcafe.Selector)(menuRoot);
    this.menuLabel = (0, _testcafe.Selector)('.gw-label');
    this.inner = '.gw-action--inner';
    this.expander = '.gw-action--expand-button';
    this.menuItem = '.gw-MenuItemWidget';
  }

  selectOptionFromMenuItem(option) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.expand();
      console.log("Selecting action: " + option);
      yield _testcafe.t.click(_this.menuSelector.find(_this.inner).withAttribute("aria-label", option));
    })();
  }

  selectMenuItemById(id) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this2.expand();
      yield _testcafe.t.click(_this2.menuSelector.find(id));
    })();
  }

  expandSubMenu(subMenuName) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.hover(_this3.menuSelector.withText(subMenuName));
    })();
  }

  expandSubMenuById(subMenuNameId) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.hover(_this4.menuSelector.find(subMenuNameId));
    })();
  }

  expandSubMenuByText(label) {
    return (0, _asyncToGenerator2.default)(function* () {
      var menuItems = (0, _testcafe.Selector)('div[data-gw-menu-group="Actions"] div[role="menuitem"] div[aria-hidden]');
      var labelToRegEx = label.replace(/\s/g, '.');
      console.log("Hover over: " + label);
      yield _testcafe.t.hover(menuItems.withText(new RegExp(labelToRegEx)));
    })();
  }

  expand() {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if ((yield _this5.isMenuExpanded()) === false) {
        yield _testcafe.t.click(_this5.menuSelector);
      }
    })();
  }

  collapse() {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if (yield _this6.isMenuExpanded()) {
        yield _testcafe.t.click(_this6.menuSelector);
      }
    })();
  }

  isMenuExpanded() {
    var _this7 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this7.menuSelector.hasClass('gw-hasOpenSubMenu');
    })();
  }

}

exports.PcfMenuItem = PcfMenuItem;