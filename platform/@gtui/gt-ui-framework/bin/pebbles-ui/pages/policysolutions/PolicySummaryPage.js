"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _testcafe = require("testcafe");

var _PcfPageBase = require("../common/PcfPageBase");

var POLICY_SUMMARY_DVTILE = "PolicyFile_Summary-PolicyOverviewDashboard-PolicyDetailsDetailViewTile";

class PolicySummaryPage extends _PcfPageBase.PcfPageBase {
  constructor() {
    super();
    this.claims = (0, _testcafe.Selector)('#PolicyFile_Summary-PolicyOverviewDashboard-ClaimsPolicyListViewTile-ClaimsPolicyListViewTile_LV');
    this.claimNumber = (0, _testcafe.Selector)('div#PolicyFile_Summary-PolicyOverviewDashboard-ClaimsPolicyListViewTile-ClaimsPolicyListViewTile_LV-0-Number');
    this.billing = (0, _testcafe.Selector)('PolicyFile-MenuLinks-PolicyFile_PolicyFile_Billing');
    this.policyFileMenuInfoBar = (0, _testcafe.Selector)("#PolicyFile-PolicyFileMenuInfoBar");
  }

  getAccountNumber() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this.policyFileMenuInfoBar.child("#PolicyFile-PolicyFileMenuInfoBar-AccountNumber").child("div").nth(1).innerText;
    })();
  }

}

var _default = new PolicySummaryPage();

exports.default = _default;