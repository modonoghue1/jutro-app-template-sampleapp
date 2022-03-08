'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewClaimAddClaimInformationStep {
  constructor() {
    this.lossCauseDropdown = (0, _testcafe.Selector)("#FNOLWizard-FullWizardStepSet-FNOLWizard_NewLossDetailsScreen-NewLossDetailsGeneralLiabilityDV-Claim_LossCause > div > div > select");
    this.lossCauseTypeOption = this.lossCauseDropdown.find('option');
    this.nextButton = (0, _testcafe.Selector)('#FNOLWizard-Next > div:nth-child(1) > div:nth-child(2)');
  }

  selectLossCause(type) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.lossCauseDropdown).click(_this.lossCauseTypeOption.withText(type));
    })();
  }

  clickNextButton() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.nextButton);
    })();
  }

}

module.exports = new NewClaimAddClaimInformationStep();