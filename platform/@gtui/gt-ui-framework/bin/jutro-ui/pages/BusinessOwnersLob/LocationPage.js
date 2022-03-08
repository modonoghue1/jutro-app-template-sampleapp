"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LocationPage = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _SelectBox = require("../../components/SelectBox.js");

var _ExperienceLobBasePage = require("./ExperienceLobBasePage");

class LocationPage extends _ExperienceLobBasePage.ExperienceLobBasePage {
  constructor() {
    super();
    this.addressLine1TextBox = (0, _testcafe.Selector)("#addressLine1");
    this.cityTextBox = (0, _testcafe.Selector)("#city");
    this.postalCodeTextBox = (0, _testcafe.Selector)("#postalCode");
    this.stateSelectBox = new _SelectBox.SelectBox("#state");
  }

  completeLocationFormUsingRequiredValues(dataTable) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.enterAddressLine1(dataTable.AddressLine1);
      yield _this.enterCity(dataTable.City);
      yield _this.enterPostalCode(dataTable.ZipCode);
      yield _this.selectState(dataTable.State);
      yield _this.clickNextButton();
    })();
  }

  enterAddressLine1(value) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this2.addressLine1TextBox(), value);
    })();
  }

  enterCity(value) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this3.cityTextBox(), value);
    })();
  }

  enterPostalCode(value) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this4.postalCodeTextBox(), value);
    })();
  }

  selectState(value) {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this5.stateSelectBox.chooseOption(value);
    })();
  }

}

exports.LocationPage = LocationPage;

var _default = new LocationPage();

exports.default = _default;