'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewSubmissionsQuotePage {
  constructor() {
    this.bindOptionsButton = (0, _testcafe.Selector)("#SubmissionWizard-SubmissionWizard_QuoteScreen-JobWizardToolbarButtonSet-BindOptions > div:nth-child(1) > div:nth-child(2)");
    this.issuePolicyUnderBindOptionsButton = (0, _testcafe.Selector)("#SubmissionWizard-SubmissionWizard_QuoteScreen-JobWizardToolbarButtonSet-BindOptions-BindAndIssue > div:nth-child(1) > div:nth-child(2)");
  }

  clickIssuePolicy() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.bindOptionsButton);
      yield _testcafe.t.click(_this.issuePolicyUnderBindOptionsButton);
    })();
  }

}

module.exports = new NewSubmissionsQuotePage();