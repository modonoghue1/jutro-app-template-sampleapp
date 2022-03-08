"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _CCDesktopPage = _interopRequireDefault(require("../../OOTBpages/CCPages/CCDesktopPage.js"));

var _NewClaimSearchOrCreatePolicyStep = _interopRequireDefault(require("../../OOTBpages/CCPages/NewClaimWizard/NewClaimSearchOrCreatePolicyStep.js"));

var _NewClaimBasicInformationStep = _interopRequireDefault(require("../../OOTBpages/CCPages/NewClaimWizard/NewClaimBasicInformationStep.js"));

var _NewClaimAddClaimInformationStep = _interopRequireDefault(require("../../OOTBpages/CCPages/NewClaimWizard/NewClaimAddClaimInformationStep.js"));

var _NewClaimSaveAndAssignClaimStep = _interopRequireDefault(require("../../OOTBpages/CCPages/NewClaimWizard/NewClaimSaveAndAssignClaimStep.js"));

var _NewClaimSavedScreen = _interopRequireDefault(require("../../OOTBpages/CCPages/NewClaimWizard/NewClaimSavedScreen.js"));

class ClaimSubmissionSteps {
  constructor() {}

  clickOnNewClaim() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _CCDesktopPage.default.clickOnClaimExpandButtonAndThenNewClaim();
    })();
  }

  typeCreatedPolicyNumber() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimSearchOrCreatePolicyStep.default.typePreviouslyCreatedPolicyNumber();
    })();
  }

  clickSearchButton() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimSearchOrCreatePolicyStep.default.clickSearchButton();
    })();
  }

  clickLossDateCalendarIcon() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimSearchOrCreatePolicyStep.default.clickLossDateCalendarIcon();
    })();
  }

  clickLossDateCalendarTodayIcon() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimSearchOrCreatePolicyStep.default.clickLossDateCalendarTodayIcon();
    })();
  }

  clickNextButtonInSearchOrRefactorPolicy() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimSearchOrCreatePolicyStep.default.clickNextButton();
    })();
  }

  selectName() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimBasicInformationStep.default.selectName();
    })();
  }

  selectRelationToInsured(type) {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimBasicInformationStep.default.selectRelationToInsured(type);
    })();
  }

  clickNextButtonInBasicInformation() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimBasicInformationStep.default.clickNextButton();
    })();
  }

  selectLossCause(type) {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimAddClaimInformationStep.default.selectLossCause(type);
    })();
  }

  clickNextButtonInAddClaimInformation() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimAddClaimInformationStep.default.clickNextButton();
    })();
  }

  clickFinishButtonInSaveAndAssignClaim() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimSaveAndAssignClaimStep.default.clickFinishButton();
    })();
  }

  checkClaimSuccessfulyCreatedConfirmation() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewClaimSavedScreen.default.checkClaimSuccessfulyCreatedConfirmation();
    })();
  }

}

module.exports = new ClaimSubmissionSteps();