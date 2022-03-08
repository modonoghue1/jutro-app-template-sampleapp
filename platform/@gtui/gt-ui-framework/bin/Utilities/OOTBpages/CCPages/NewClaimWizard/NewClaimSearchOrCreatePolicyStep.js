'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewClaimSearchOrCreatePolicyStep {
  constructor() {
    this.PolicyNumberTextField = (0, _testcafe.Selector)("#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-policyNumber > div:nth-child(1) > input:nth-child(1)");
    this.SearchButton = (0, _testcafe.Selector)("#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-Search");
    this.NextButton = (0, _testcafe.Selector)("#FNOLWizard-Next > div:nth-child(1) > div:nth-child(2)");
    this.LossDateCalendarIcon = (0, _testcafe.Selector)("#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-date_dateIcon");
    this.LossDateCalendarTodayIcon = (0, _testcafe.Selector)(".gw-datePicker--today");
  }

  typePreviouslyCreatedPolicyNumber() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this.PolicyNumberTextField, process.env.PolicyNumber);
    })();
  }

  clickSearchButton() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.SearchButton);
    })();
  }

  clickNextButton() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this3.NextButton);
    })();
  }

  clickLossDateCalendarIcon() {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this4.LossDateCalendarIcon);
    })();
  }

  clickLossDateCalendarTodayIcon() {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this5.LossDateCalendarTodayIcon);
    })();
  }

}

module.exports = new NewClaimSearchOrCreatePolicyStep();