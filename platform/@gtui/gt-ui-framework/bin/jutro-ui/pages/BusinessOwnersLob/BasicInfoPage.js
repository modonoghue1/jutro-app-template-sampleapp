"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BasicInfoPage = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _SelectBox = require("../../components/SelectBox.js");

var _ExperienceLobBasePage = require("./ExperienceLobBasePage");

class BasicInfoPage extends _ExperienceLobBasePage.ExperienceLobBasePage {
  constructor() {
    super();
    this.buisnessNameTextBox = (0, _testcafe.Selector)("#insuredName");
    this.emailAddressTextBox = (0, _testcafe.Selector)("#emailAddress");
    this.organizationTypeSelectBox = new _SelectBox.SelectBox("#AccountOrgType");
    this.addressLine1TextBox = (0, _testcafe.Selector)("#addressLine1");
    this.cityTextBox = (0, _testcafe.Selector)("#city");
    this.zipCodeTextBox = (0, _testcafe.Selector)("#postalCode");
    this.countrySelectBox = new _SelectBox.SelectBox("#country");
    this.stateSelectBox = new _SelectBox.SelectBox("#state");
    this.nextButton = (0, _testcafe.Selector)("button").find("span").withText("Next");
  }

  completeBasicInfoForm(dataTable) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.enterBusinessName(dataTable.BusinessName);
      yield _this.enterEmailAddressName(dataTable.EmailAddress);
      yield _this.selectOrganisationType(dataTable.OrganisationType);
      yield _this.enterAddressLine1(dataTable.AddressLine1);
      yield _this.enterCity(dataTable.City);
      yield _this.enterZipCode(dataTable.ZipCode);
      yield _this.selectCountry(dataTable.Country);
      yield _this.selectState(dataTable.State);
      yield _this.clickNextButton();
    })();
  }

  enterBusinessName(value) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this2.buisnessNameTextBox(), value);
    })();
  }

  enterEmailAddressName(value) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this3.emailAddressTextBox(), value);
    })();
  }

  selectOrganisationType(value) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this4.organizationTypeSelectBox.chooseOption(value);
    })();
  }

  enterAddressLine1(value) {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this5.addressLine1TextBox(), value);
    })();
  }

  enterCity(value) {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this6.cityTextBox(), value);
    })();
  }

  enterZipCode(value) {
    var _this7 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this7.zipCodeTextBox(), value);
    })();
  }

  selectCountry(value) {
    var _this8 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this8.countrySelectBox.chooseOption(value);
    })();
  }

  selectState(value) {
    var _this9 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this9.stateSelectBox.chooseOption(value);
    })();
  }

}

exports.BasicInfoPage = BasicInfoPage;

var _default = new BasicInfoPage();

exports.default = _default;