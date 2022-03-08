"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _log = require("../logging/log");

let Logger = function () {
  function Logger(log) {
    (0, _classCallCheck2.default)(this, Logger);
    this.log = log;
  }

  (0, _createClass2.default)(Logger, [{
    key: "colorful",
    value: function colorful(msg) {
      (0, _log.log)(msg);
    }
  }, {
    key: "notice",
    value: function notice(msg) {
      (0, _log.logBlueBright)(msg);
    }
  }, {
    key: "warn",
    value: function warn(msg) {
      (0, _log.logYellow)(msg);
    }
  }, {
    key: "err",
    value: function err(msg) {
      (0, _log.logRed)(msg);
    }
  }, {
    key: "ok",
    value: function ok(msg) {
      (0, _log.logGreen)(msg);
    }
  }]);
  return Logger;
}();

exports.Logger = Logger;
//# sourceMappingURL=logger.js.map