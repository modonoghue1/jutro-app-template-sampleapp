"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersion = void 0;

var _package = _interopRequireDefault(require("../package.json"));

const getVersion = version => version === 'latest' ? _package.default.version : version;

exports.getVersion = getVersion;
//# sourceMappingURL=getVersion.js.map