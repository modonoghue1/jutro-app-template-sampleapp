"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OccupancyPage = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _SelectBox = require("../../components/SelectBox.js");

var _ExperienceLobBasePage = require("./ExperienceLobBasePage");

class OccupancyPage extends _ExperienceLobBasePage.ExperienceLobBasePage {
  constructor() {
    super();
    this.classificationCodeSelectBox = new _SelectBox.SelectBox("#classificationCode");
  }

  completeOccupancyFormUsingRequiredValues(dataTable) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.selectClassificationCode(dataTable.ClassificationCode);
      yield _this.clickNextButton();
    })();
  }

  selectClassificationCode(value) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this2.classificationCodeSelectBox.chooseOption(value);
    })();
  }

}

exports.OccupancyPage = OccupancyPage;

var _default = new OccupancyPage();

exports.default = _default;