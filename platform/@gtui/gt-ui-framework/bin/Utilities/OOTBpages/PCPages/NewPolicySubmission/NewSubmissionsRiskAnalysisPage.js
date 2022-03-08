'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewSubmissionsRiskAnalysisPage {
  constructor() {
    this.nextButton = (0, _testcafe.Selector)("#SubmissionWizard-Next > div > div.gw-label");
  }

  clickNext() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.nextButton);
    })();
  }

}

module.exports = new NewSubmissionsRiskAnalysisPage();