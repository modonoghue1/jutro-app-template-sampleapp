"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyCssSnapshot = void 0;

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssScss = _interopRequireDefault(require("postcss-scss"));

var _cssmodsPostcssPlugin = require("./cssmodsPostcssPlugin");

const applyCssSnapshot = ({
  css,
  snapshot,
  from
}) => (0, _postcss.default)([(0, _cssmodsPostcssPlugin.cssModsPostCSSPlugin)({
  atRules: snapshot.atRules
})]).process(css, {
  from,
  parser: _postcssScss.default,
  syntax: _postcssScss.default
});

exports.applyCssSnapshot = applyCssSnapshot;
//# sourceMappingURL=applyCssSnapshot.js.map