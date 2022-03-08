'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewSubmissionsBusinessownersLinePage {
  constructor() {
    this.nextButton = (0, _testcafe.Selector)("#SubmissionWizard-Next > div > div.gw-label");
    this.smallBusinessTypeDropdown = (0, _testcafe.Selector)("#SubmissionWizard-LOBWizardStepGroup-LineWizardStepSet-BOPScreen-BOPLinePanelSet-BOPLineDV-SmallBusinessType > div > div > select");
    this.smallBusinessTypeOption = this.smallBusinessTypeDropdown.find('option');
  }

  clickNext() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.nextButton);
    })();
  }

  selectSmallBusinessType(type) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.smallBusinessTypeDropdown).click(_this2.smallBusinessTypeOption.withText(type));
    })();
  }

}

module.exports = new NewSubmissionsBusinessownersLinePage();