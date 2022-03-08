"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postcss = exports.cssModsPostCSSPlugin = void 0;

var _applyAtRulesChanges = require("./applyAtRulesChanges");

const cssModsPostCSSPlugin = (opts = {}) => ({
  postcssPlugin: 'css-mods',

  Once(css) {
    (0, _applyAtRulesChanges.applyAtRulesChanges)(css, opts.atRules);
  }

});

exports.cssModsPostCSSPlugin = cssModsPostCSSPlugin;
const postcss = true;
exports.postcss = postcss;
//# sourceMappingURL=cssmodsPostcssPlugin.js.map