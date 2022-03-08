"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OccupancyPage = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _ToggleSwitch = require("../../components/ToggleSwitch.js");

var _ExperienceLobBasePage = require("./ExperienceLobBasePage");

class OccupancyPage extends _ExperienceLobBasePage.ExperienceLobBasePage {
  constructor() {
    super();
    this.communicableDiseaseToggle = new _ToggleSwitch.ToggleSwitch("#coverageToggle_FBPLineFBPExclDiseaseCoverage");
    this.actsOfTerrorismToggleSwitch = new _ToggleSwitch.ToggleSwitch("#coverageToggle_FBPLineFBPExclCertTerrorCoverage");
  }

  selectCommunicableDiseaseCoverage() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.communicableDiseaseToggle.selectSwitch();
    })();
  }

  selectActsOfTerrorismCoverage() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this2.actsOfTerrorismToggleSwitch.selectSwitch();
    })();
  }

  selectCoverages(coveragesRawDataTable) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      for (var coverage of coveragesRawDataTable) {
        yield _this3.selectCoverage(coverage[0]);
      }

      yield _this3.clickNextButton();
    })();
  }

  selectCoverage(coverage) {
    return (0, _asyncToGenerator2.default)(function* () {
      var coverageSwitch = _ToggleSwitch.ToggleSwitch.initaliseToggleSwitchUsingLabel(coverage);

      yield coverageSwitch.selectSwitch();
    })();
  }

}

exports.OccupancyPage = OccupancyPage;

var _default = new OccupancyPage();

exports.default = _default;