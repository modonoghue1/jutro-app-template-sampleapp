'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewClaimBasicInformationStep {
  constructor() {
    this.nameDropdown = (0, _testcafe.Selector)("#FNOLWizard-FullWizardStepSet-FNOLWizard_BasicInfoScreen-PanelRow-BasicInfoDetailViewPanelDV-ReportedBy_Name > div:nth-child(1) > div:nth-child(1) > select:nth-child(2)");
    this.nameTypeOption = this.nameDropdown.find('option');
    this.relationToInsuredDropdown = (0, _testcafe.Selector)("#FNOLWizard-FullWizardStepSet-FNOLWizard_BasicInfoScreen-PanelRow-BasicInfoDetailViewPanelDV-Claim_ReportedByType > div > div > select");
    this.relationToInsuredTypeOption = this.relationToInsuredDropdown.find('option');
    this.nextButton = (0, _testcafe.Selector)('#FNOLWizard-Next > div:nth-child(1) > div:nth-child(2)');
  }

  selectName() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.nameDropdown).click(_this.nameTypeOption.nth(1));
    })();
  }

  selectRelationToInsured(type) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.relationToInsuredDropdown).click(_this2.relationToInsuredTypeOption.withText(type));
    })();
  }

  clickNextButton() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this3.nextButton);
    })();
  }

}

module.exports = new NewClaimBasicInformationStep();