'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class ActionsMenu {
  constructor() {
    this.NewSubmissionOption = (0, _testcafe.Selector)("#AccountFile-AccountFileMenuActions-AccountFileMenuActions_Create-AccountFileMenuActions_NewSubmission > div");
  }

  clickonNewSubmissionOption() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.click(_this.NewSubmissionOption);
    })();
  }

}

module.exports = new ActionsMenu();