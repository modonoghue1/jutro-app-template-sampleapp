'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class NewSubmissionsPage {
  constructor() {
    this.BOLOB = (0, _testcafe.Selector)("#NewSubmission-NewSubmissionScreen-ProductOffersDV-ProductSelectionLV-0-addSubmission");
  }

  selectBusinessOwnerLOB() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.BOLOB);
    })();
  }

}

module.exports = new NewSubmissionsPage();