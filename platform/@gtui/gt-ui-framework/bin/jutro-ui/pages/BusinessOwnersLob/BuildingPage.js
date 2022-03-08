"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BuildingPage = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _SelectBox = require("../../components/SelectBox.js");

var _ExperienceLobBasePage = require("./ExperienceLobBasePage");

class BuildingPage extends _ExperienceLobBasePage.ExperienceLobBasePage {
  constructor() {
    super();
    this.alarmSelectBox = new _SelectBox.SelectBox("#alarm");
  }

  completeBuildingFormUsingRequiredValues(dataTable) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.selectAlarm(dataTable.Alarm);
      yield _this.clickNextButton();
    })();
  }

  selectAlarm(value) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this2.alarmSelectBox.chooseOption(value);
    })();
  }

}

exports.BuildingPage = BuildingPage;

var _default = new BuildingPage();

exports.default = _default;