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

class PCAccountScenario {
  constructor() {}

  getContactsForAccount(accountId) {
    return (0, _asyncToGenerator2.default)(function* () {
      var path = '/rest/account/v1/accounts/' + accountId + '/contacts?pageSize=100';
      return yield _RestRequestUtils.default.doGetRequestWithDefaultSuUser(pcApp.getAppHostname(), path);
    })();
  }

  addContactToAnAccount(accountId, contactDataTable) {
    return (0, _asyncToGenerator2.default)(function* () {
      var path = '/rest/account/v1/accounts/' + accountId + '/contacts';
      var post_data = JSON.stringify({
        "data": {
          "attributes": {
            "contactSubtype": contactDataTable.contactSubtype,
            "firstName": contactDataTable.firstName,
            "lastName": contactDataTable.lastName,
            "primaryAddress": {
              "addressLine1": contactDataTable.addressLine1,
              "city": contactDataTable.city,
              "country": {
                "code": contactDataTable.country
              },
              "postalCode": contactDataTable.postalCode,
              "state": {
                "code": contactDataTable.state
              }
            }
          }
        }
      });
      return yield _RestRequestUtils.default.doPostRequestWithDefaultSuUser(pcApp.getAppHostname(), path, post_data, {
        'Content-Type': 'application/json'
      });
    })();
  }

}

var _default = new PCAccountScenario();

exports.default = _default;