"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jscodeshift = _interopRequireDefault(require("jscodeshift"));

var _default = [{
  description: 'Rename refreshOnLocaleChange to refreshOnLanguageChange prop in start function',
  include: 'src/index.js',
  execute: source => source.find(_jscodeshift.default.CallExpression, {
    callee: {
      name: 'start'
    }
  }).find(_jscodeshift.default.Identifier).filter(({
    value
  }) => value && value.name.includes('refreshOnLocaleChange')).forEach(({
    value
  }) => {
    value.name = 'refreshOnLanguageChange';
  })
}, {
  description: 'Rename tipPlacement property to placement for Tooltip',
  execute: source => source.renameComponentProp('TooltipIcon', 'tipPlacement', 'placement')
}, {
  description: 'Change from Money to CurrencyValue component',
  execute: source => source.replaceImportSpecifierAndUsages('Money', 'CurrencyValue', '@jutro/components')
}, {
  description: 'Move title bars imports to @jutro/lab-preview-components',
  execute: source => source.renameImportDeclaration('@jutro/lab-preview-title-bars', '@jutro/lab-preview-components')
}, {
  description: 'Move settings card imports to @jutro/lab-preview-components',
  execute: source => source.renameImportDeclaration('@business-patterns/settings-card', '@jutro/lab-preview-components')
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map