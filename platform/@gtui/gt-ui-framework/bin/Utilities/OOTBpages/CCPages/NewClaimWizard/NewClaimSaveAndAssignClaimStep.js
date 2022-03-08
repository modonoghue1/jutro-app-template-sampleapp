'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewClaimSaveAndAssignClaimStep {
  constructor() {
    this.finishButton = (0, _testcafe.Selector)('#FNOLWizard-Finish > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)');
  }

  clickFinishButton() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.finishButton);
    })();
  }

}

module.exports = new NewClaimSaveAndAssignClaimStep();