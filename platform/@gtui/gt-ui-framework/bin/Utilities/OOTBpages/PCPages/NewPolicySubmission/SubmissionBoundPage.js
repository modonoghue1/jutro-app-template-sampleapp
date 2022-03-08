'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

class SubmissionBoundPage {
  constructor() {}

  storePolicyNumber() {
    return (0, _asyncToGenerator2.default)(function* () {
      var policyNumber = yield (0, _testcafe.Selector)("div[data-gw-click='fireEvent id:JobComplete-JobCompleteScreen-JobCompleteDV-ViewPolicy']").textContent;
      process.env.PolicyNumber = policyNumber.match('\\d+');
      console.log("Policy Number is: " + process.env.PolicyNumber);
    })();
  }

}

module.exports = new SubmissionBoundPage();