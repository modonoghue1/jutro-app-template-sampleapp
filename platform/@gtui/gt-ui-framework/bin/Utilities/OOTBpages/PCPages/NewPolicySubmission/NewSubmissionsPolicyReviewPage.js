'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewSubmissionsPolicyReviewPage {
  constructor() {
    this.quoteButton = (0, _testcafe.Selector)("#SubmissionWizard-SubmissionWizard_PolicyReviewScreen-JobWizardToolbarButtonSet-QuoteTypeToolbarButtonSet-Quote > div > div.gw-label");
  }

  clickQuote() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.quoteButton);
    })();
  }

}

module.exports = new NewSubmissionsPolicyReviewPage();