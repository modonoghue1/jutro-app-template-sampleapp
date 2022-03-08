'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewSubmissionsBuildingsPage {
  constructor() {
    this.nextButton = (0, _testcafe.Selector)("#SubmissionWizard-Next > div > div.gw-label");
    this.addBuilding = (0, _testcafe.Selector)("#SubmissionWizard-LOBWizardStepGroup-LineWizardStepSet-BOPBuildingsScreen-BOPBuildingsCV-BOPLocationBuildingsPanelSet-BOPLocationBuildingsLV_tb-Add > div > div.gw-label");
    this.descriptionSelector = (0, _testcafe.Selector)("#BOPBuildingPopup-BOPSingleBuildingDetailScreen-BOPBuilding_DetailsDV-Description > div > input[type=text]");
    this.buildingClassCodeSelector = (0, _testcafe.Selector)("#BOPBuildingPopup-BOPSingleBuildingDetailScreen-BOPBuilding_DetailsDV-BOPBuildingClassCodeRange > div.gw-vw--value > div > select");
    this.buildingClassCodeOptionSelector = this.buildingClassCodeSelector.find('option');
    this.buildingLimitSelector = (0, _testcafe.Selector)("#BOPBuildingPopup-BOPSingleBuildingDetailScreen-BOPBuilding_DetailsDV-0-CoverageInputSet-CovPatternInputGroup-BOPBldgCovLimit-CovTermDirectInputSet-DirectTermInput > div > input[type=text]");
    this.businessPersonalPropertyLimitSelector = (0, _testcafe.Selector)("#BOPBuildingPopup-BOPSingleBuildingDetailScreen-BOPBuilding_DetailsDV-1-CoverageInputSet-CovPatternInputGroup-BOPPersonalPropCovLimit-CovTermDirectInputSet-DirectTermInput > div > input[type=text]");
    this.updateBuildingSelector = (0, _testcafe.Selector)("#BOPBuildingPopup-BOPSingleBuildingDetailScreen-Update > div > div.gw-label");
  }

  clickNext() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.nextButton);
    })();
  }

  clickAddBuildingsButton() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this2.addBuilding);
    })();
  }

  setDescription(text) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this3.descriptionSelector, text);
    })();
  }

  setBuildingClassCodeDropdown(text) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this4.buildingClassCodeSelector).click(_this4.buildingClassCodeOptionSelector.withText(text));
    })();
  }

  setBuildingLimit(text) {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this5.buildingLimitSelector, text);
    })();
  }

  setBusinessPersonalPropertyLimit(text) {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.typeText(_this6.businessPersonalPropertyLimitSelector, text);
    })();
  }

  clickUpdateBuildingButton() {
    var _this7 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this7.updateBuildingSelector);
    })();
  }

}

module.exports = new NewSubmissionsBuildingsPage();