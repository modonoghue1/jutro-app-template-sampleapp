"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  description: 'Move components from @jutro/lab-preview-intl-phone-number to @jutro/components',
  execute: source => source.migrateImportSpecifier('IntlPhoneNumberField', '@jutro/components', '@jutro/lab-preview-intl-phone-number').migrateImportSpecifier('PhoneNumberValue', '@jutro/components', '@jutro/lab-preview-intl-phone-number').migrateImportSpecifier('FormattedPhoneNumber', '@jutro/components', '@jutro/lab-preview-intl-phone-number')
}, {
  description: "Remove Chevron's component 'align' prop. Missing for 6.0.0.",
  execute: source => source.removeComponentProp('Chevron', 'align')
}, {
  description: 'Rename DateTimeZoneField props',
  execute: source => source.renameComponentProp('DateTimeZoneField', 'timeZoneLabel', 'labelTimeZone').renameComponentProp('DateTimeZoneField', 'timeZoneSecondaryLabel', 'secondaryLabelTimeZone').renameComponentProp('DateTimeZoneField', 'timeZoneTooltip', 'tooltipTimeZone').renameComponentProp('DateTimeZoneField', 'timeZoneHideLabel', 'hideLabelTimeZone')
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map