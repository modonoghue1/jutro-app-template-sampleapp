"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _RestRequestUtils = _interopRequireDefault(require("../../Utilities/RestRequestHelper/RestRequestUtils"));

var _ISBaseStep = _interopRequireDefault(require("../../Utilities/OOTBSteps/CommonSteps/ISBaseStep"));

var pcApp = new _ISBaseStep.default("PC");

class PCPolicyScenarios {
  constructor() {}

  getListOfPoliciesForLob(lob) {
    return (0, _asyncToGenerator2.default)(function* () {
      var path = '/rest/policy/v1/policies?pageSize=100&filter=product:eq:' + lob + '&sort=-createdDate';
      return yield _RestRequestUtils.default.doGetRequestWithDefaultSuUser(pcApp.getAppHostname(), path);
    })();
  }

}

var _default = new PCPolicyScenarios();

exports.default = _default;