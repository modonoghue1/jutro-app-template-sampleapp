"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AboutYourBusiness = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _SelectBox = require("../../components/SelectBox.js");

var _ExperienceLobBasePage = require("./ExperienceLobBasePage");

class AboutYourBusiness extends _ExperienceLobBasePage.ExperienceLobBasePage {
  constructor() {
    super();
    this.ageGroupSelectBox = new _SelectBox.SelectBox("#ageGroup");
  }

  selectAgeGroup(value) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.ageGroupSelectBox.chooseOption(value);
    })();
  }

  completeAboutYourBusinessFormUsingRequiredValues(dataTable) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this2.selectAgeGroup(dataTable.AgeGroup);
      yield _this2.clickNextButton();
    })();
  }

}

exports.AboutYourBusiness = AboutYourBusiness;

var _default = new AboutYourBusiness();

exports.default = _default;