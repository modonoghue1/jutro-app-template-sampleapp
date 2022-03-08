"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.name = void 0;

var _packageTemplate = _interopRequireDefault(require("./package-template.json"));

const version = _packageTemplate.default.version;
exports.version = version;
const name = _packageTemplate.default.name;
exports.name = name;
//# sourceMappingURL=index.js.map