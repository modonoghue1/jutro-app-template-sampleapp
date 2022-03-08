"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jscodeshift = _interopRequireDefault(require("jscodeshift"));

var _default = [{
  description: 'Move components from @jutro/lab-preview-date to @jutro/components',
  execute: source => source.migrateImportSpecifier('DateRangeField', '@jutro/components', '@jutro/lab-preview-date').migrateImportSpecifier('DateTimeField', '@jutro/components', '@jutro/lab-preview-date').migrateImportSpecifier('DateTimeZoneField', '@jutro/components', '@jutro/lab-preview-date')
}, {
  description: 'Rename DateTimeField props',
  execute: source => source.renameComponentProp('DateTimeField', 'onTimeBlur', 'onBlurTime').renameComponentProp('DateTimeField', 'onTimeFocus', 'onFocusTime')
}, {
  description: 'Rename refreshOnLanguageChange to refreshOnLanguageOrLocaleChange prop in start function',
  include: 'src/index.js',
  execute: source => source.find(_jscodeshift.default.CallExpression, {
    callee: {
      name: 'start'
    }
  }).find(_jscodeshift.default.Identifier).filter(({
    value
  }) => value && value.name.includes('refreshOnLanguageChange')).forEach(({
    value
  }) => {
    value.name = 'refreshOnLanguageOrLocaleChange';
  })
}, {
  description: 'Rename Collapse props',
  execute: source => source.renameComponentProp('Collapse', 'onOpened', 'onEntered').renameComponentProp('Collapse', 'onClosed', 'onExited').renameComponentProp('Collapse', 'delay', 'timeout').find(_jscodeshift.default.JSXOpeningElement, n => n.name.name === 'Collapse').renameIdentifier('show', 'enter').renameIdentifier('hide', 'exit')
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map