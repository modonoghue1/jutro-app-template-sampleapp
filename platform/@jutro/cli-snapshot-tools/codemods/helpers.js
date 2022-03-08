"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSimpleValue = exports.stripNewlines = void 0;

var _toAst = _interopRequireDefault(require("to-ast"));

var _jscodeshift = _interopRequireDefault(require("jscodeshift"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

const newLine = /\n|\r\n/gm;

const stripNewlines = input => input.replace(newLine, '');

exports.stripNewlines = stripNewlines;

const parseSimpleValue = value => {
  if ((0, _isUndefined.default)(value)) return _jscodeshift.default.identifier('undefined');
  return (0, _toAst.default)(value);
};

exports.parseSimpleValue = parseSimpleValue;
//# sourceMappingURL=helpers.js.map