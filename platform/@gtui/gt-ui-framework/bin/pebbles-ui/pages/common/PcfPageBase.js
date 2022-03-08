"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcfPageBase = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _PcfWestPanel = require("../../components/PcfWestPanel");

var _PcfNorthPanel = require("../../components/PcfNorthPanel");

class PcfPageBase {
  constructor() {
    this.centerPanel = (0, _testcafe.Selector)("#gw-center-panel");
    this.titleBarWidget = (0, _testcafe.Selector)(".gw-TitleBarWidget.gw-isScreenTitle");
    this.westPanel = new _PcfWestPanel.PcfWestPanel();
    this.northPanel = new _PcfNorthPanel.PcfNorthPanel();
  }

  selectAction(action) {
    var _arguments = arguments,
        _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.westPanel.actionsMenu.expand();

      for (var _len = _arguments.length, subMenuPath = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        subMenuPath[_key - 1] = _arguments[_key];
      }

      for (var subMenu of subMenuPath) {
        yield _this.westPanel.actionsMenu.expandSubMenuByText(subMenu);
      }

      yield _this.westPanel.actionsMenu.selectOptionFromMenuItem(action);
    })();
  }

  runQuickJumpCommand(command) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this2.northPanel.quickJump, command).pressKey("enter");
    })();
  }

}

exports.PcfPageBase = PcfPageBase;