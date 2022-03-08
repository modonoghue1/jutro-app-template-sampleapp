'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _PCDesktopPage = _interopRequireDefault(require("../../OOTBpages/PCPages/PCDesktopPage.js"));

var _AccountSummaryPage = _interopRequireDefault(require("../../OOTBpages/PCPages/AccountSummaryPage.js"));

var _ActionsMenu = _interopRequireDefault(require("../../OOTBpages/PCPages/ActionsMenu.js"));

var _NewSubmissionsPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsPage.js"));

var _NewSubmissionsOfferingsPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsOfferingsPage.js"));

var _NewSubmissionsQualificationPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsQualificationPage.js"));

var _NewSubmissionsPolicyInfoPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsPolicyInfoPage.js"));

var _NewSubmissionsBusinessownersLinePage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsBusinessownersLinePage.js"));

var _NewSubmissionsLocationsPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsLocationsPage.js"));

var _NewSubmissionsBuildingsPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsBuildingsPage.js"));

var _NewSubmissionsModifiersPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsModifiersPage.js"));

var _NewSubmissionsRiskAnalysisPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsRiskAnalysisPage.js"));

var _NewSubmissionsPolicyReviewPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsPolicyReviewPage.js"));

var _NewSubmissionsQuotePage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/NewSubmissionsQuotePage.js"));

var _SubmissionBoundPage = _interopRequireDefault(require("../../OOTBpages/PCPages/NewPolicySubmission/SubmissionBoundPage.js"));

var _testcafe = require("testcafe");

class PCSubmissionSteps {
  constructor() {}

  executeAllSteps() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _PCDesktopPage.default.clickonAccountTab();
      yield _AccountSummaryPage.default.clickonActionsMenu();
      yield _ActionsMenu.default.clickonNewSubmissionOption();
      yield _NewSubmissionsPage.default.selectBusinessOwnerLOB();
      yield _NewSubmissionsOfferingsPage.default.clickNext();
      yield _NewSubmissionsQualificationPage.default.clickNext();
      yield _NewSubmissionsPolicyInfoPage.default.clickNext();
      yield _NewSubmissionsBusinessownersLinePage.default.selectSmallBusinessType("Apartment");
      yield _NewSubmissionsBusinessownersLinePage.default.clickNext();
      yield _NewSubmissionsLocationsPage.default.clickNext();
      yield _NewSubmissionsBuildingsPage.default.clickAddBuildingsButton();
      yield _NewSubmissionsBuildingsPage.default.setDescription("Building 007");
      yield _NewSubmissionsBuildingsPage.default.setBuildingClassCodeDropdown("0243 - Veterinarians Office - Office");
      yield _NewSubmissionsBuildingsPage.default.setBuildingLimit("10");
      yield _NewSubmissionsBuildingsPage.default.setBusinessPersonalPropertyLimit("10");
      yield _NewSubmissionsBuildingsPage.default.clickUpdateBuildingButton();
      yield _NewSubmissionsBuildingsPage.default.clickNext();
      yield _NewSubmissionsModifiersPage.default.clickNext();
      yield _NewSubmissionsRiskAnalysisPage.default.clickNext();
      yield _NewSubmissionsPolicyReviewPage.default.clickQuote();
    })();
  }

  clickonAccountTab() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _PCDesktopPage.default.clickonAccountTab();
    })();
  }

  clickonActionsMenu() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _AccountSummaryPage.default.clickonActionsMenu();
    })();
  }

  clickonNewSubmission() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _ActionsMenu.default.clickonNewSubmissionOption();
    })();
  }

  selectBusinessOwnerLOB() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsPage.default.selectBusinessOwnerLOB();
    })();
  }

  clickNextInNewSubmissionOfferingsPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsOfferingsPage.default.clickNext();
    })();
  }

  clickNextInNewSubmissionQualificationPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsQualificationPage.default.clickNext();
    })();
  }

  clickNextInNewSubmissionsPolicyInfoPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsPolicyInfoPage.default.clickNext();
    })();
  }

  clickNextInNewSubmissionsBusinessownersLinePage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBusinessownersLinePage.default.clickNext();
    })();
  }

  selectSmallBusinessTypeInBusinessownersLine(type) {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBusinessownersLinePage.default.selectSmallBusinessType(type);
    })();
  }

  clickNextInNewSubmissionsLocationsPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsLocationsPage.default.clickNext();
    })();
  }

  clickNextInNewSubmissionsBuildingsPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBuildingsPage.default.clickNext();
    })();
  }

  clickAddBuildingsButton() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBuildingsPage.default.clickAddBuildingsButton();
    })();
  }

  setBuildingDescription(text) {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBuildingsPage.default.setDescription(text);
    })();
  }

  setBuildingClassCodeDropdown(text) {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBuildingsPage.default.setBuildingClassCodeDropdown(text);
    })();
  }

  setBuildingLimit(text) {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBuildingsPage.default.setBuildingLimit(text);
    })();
  }

  setBuildingBusinessPersonalPropertyLimit(text) {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBuildingsPage.default.setBusinessPersonalPropertyLimit(text);
    })();
  }

  clickUpdateBuilding() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsBuildingsPage.default.clickUpdateBuildingButton();
    })();
  }

  clickNextInNewSubmissionsModifiersPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsModifiersPage.default.clickNext();
    })();
  }

  clickNextInNewSubmissionsRiskAnalysisPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsRiskAnalysisPage.default.clickNext();
    })();
  }

  clickQuoteInNewSubmissionsPolicyReviewPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsPolicyReviewPage.default.clickQuote();
    })();
  }

  clickIssuePolicyInNewSubmissionsQuotePage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _NewSubmissionsQuotePage.default.clickIssuePolicy();
    })();
  }

  storePolicyNumberInSubmissionBoundPage() {
    return (0, _asyncToGenerator2.default)(function* () {
      yield _SubmissionBoundPage.default.storePolicyNumber();
    })();
  }

}

module.exports = new PCSubmissionSteps(); //To help the user to create Policy Submission related steps which traverse through different pages.This is purely for helping the User to identify related steps to Policy Submissions.