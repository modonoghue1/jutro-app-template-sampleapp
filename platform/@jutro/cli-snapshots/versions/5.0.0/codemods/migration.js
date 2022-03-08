"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const dataTableColumnRegex = new RegExp('(Action|Display|Field|Money|Radio)Column');
var _default = [{
  description: 'delete import of loadLocaleData from @jutro/locale and remove imports from react-intl/locale-data',
  execute: source => source.removeImportSpecifier('loadLocaleData', '@jutro/locale').removeCallExpression('loadLocaleData').removeImportSpecifier('addLocaleData', '@jutro/locale').removeCallExpression('addLocaleData').removeImportDeclaration(null, new RegExp('react-intl/locale-data.*'))
}, {
  description: 'remove jutro packages no longer included since 5.0.0',
  execute: source => source.removeImportDeclaration('@jutro/editors').removeImportDeclaration('@jutro/i18n-tools').removeImportDeclaration('@jutro/version-tools').removeImportDeclaration('@jutro/translator').removeImportDeclaration('@jutro/state-management')
}, {
  description: 'remove size prop from jutro components',
  execute: source => source.removeComponentProp('Accordion', 'size').removeComponentProp('Avatar', 'size').removeComponentProp('Badge', 'size').removeComponentProp('BreadCrumb', 'size').removeComponentProp('CheckboxField', 'size').removeComponentProp('CheckboxGroupField', 'size').removeComponentProp('Chevron', 'size').removeComponentProp('ColorPicker', 'size').removeComponentProp('CurrencyField', 'size').removeComponentProp('DateField', 'size').removeComponentProp('DropdownSelectField', 'size').removeComponentProp('FieldLabel', 'size').removeComponentProp('Header', 'size').removeComponentProp('IconButton', 'size').removeComponentProp('InputField', 'size').removeComponentProp('InputMaskField', 'size').removeComponentProp('InputNumberField', 'size').removeComponentProp('LookupField', 'size').removeComponentProp('RadioButtonField', 'size').removeComponentProp('StepperField', 'size').removeComponentProp('SwitchField', 'size').removeComponentProp('TagCollection', 'size').removeComponentProp('TextAreaField', 'size').removeComponentProp('ToggleField', 'size').removeComponentProp('TooltipIcon', 'size').removeComponentProp('TypeaheadMultiSelectField', 'size')
}, {
  description: '@jutro/components - map deprecated props and remove unused',
  execute: source => source.renameComponentProp('Accordion', 'updateAccordionStates', 'onUpdateAccordionStates').renameComponentProp('AccordionCard', 'header', 'renderHeader').removeComponentProp('AccordionCard', 'chevronSizeOverride').renameComponentProp('LookupField', 'loadValues', 'onLoadValues').renameComponentProp('AsyncButtonLink', 'trigger', 'onTrigger').renameComponentProp('AsyncLink', 'trigger', 'onTrigger').renameComponentProp('FileUploadField', 'maxFileSize', 'maxFileSizeKB').removeComponentProp('FileUploadField', 'incorrectFileTypeError').removeComponentProp('FileUploadField', 'maxFileSizeMessage').renameComponentProp('ColorPicker', 'isOpen', 'isInitiallyOpen').removeComponentProp('DropdownMenuAvatar', 'buttonAvatarSize').removeComponentProp('DropdownMenuAvatar', 'headerAvatarSize').removeComponentProp('DropdownMenuAvatarHeader', 'headerAvatarSize').removeComponentProp('DropdownMenuAvatarContent', 'headerAvatarSize').removeComponentProp('Chevron', 'accordionOpenLabel').removeComponentProp('PopoverContainer', 'bodyClassName').removeComponentProp('PopoverContainer', 'footerClassName').removeComponentProp('PopoverContainer', 'bodyClassName').removeComponentProp('PopoverContainer', 'internalClassNames')
}, {
  description: '@jutro/floorplan - map deprecated props and remove unused',
  execute: source => source.renameComponentProp('AppFloorPlan', 'aside', 'rightSide')
}, {
  description: '@jutro/datatable - map deprecated props and remove unused',
  execute: source => source.removeComponentProp('DataTable', 'defaultPageSize').removeComponentProp('DataTable', 'defaultSorted').renameComponentProp('DataTable', 'filter', 'onFilter').renameComponentProp('DataTable', 'columnFilter', 'onColumnFilter').renameComponentProp('DataTable', 'expanderContent', 'renderExpanderContent').renameComponentProp('TableColumn', 'onHeader', 'renderHeader', dataTableColumnRegex).renameComponentProp('TableColumn', 'onCell', 'renderCell', dataTableColumnRegex).renameComponentProp('TableColumn', 'editCell', 'renderEditCell', dataTableColumnRegex).renameComponentProp('TableColumn', 'onEditCell', 'renderEditCell', dataTableColumnRegex).renameComponentProp('TableColumn', 'filter', 'onFilter', dataTableColumnRegex).renameComponentProp('Table', 'titleAction', 'renderTitleAction').renameComponentProp('Table', 'phoneCardComponent', 'renderPhoneCardComponent').renameComponentProp('JsonDataTable', 'dataSchemaExtension', 'onDataSchemaExtension')
}, {
  description: '@jutro/layout - map deprecated props and remove unused',
  execute: source => source.renameComponentProp('Flex', 'valignItems', 'alignItems').renameComponentProp('Flex', 'valignContent', 'alignContent').renameComponentProp('FlexItem', 'valign', 'alignSelf')
}, {
  description: '@jutro/router - map deprecated props and remove unused',
  execute: source => source.removeComponentProp('ApplicationHeader', 'isResponsiveOnTablet').removeComponentProp('ApplicationHeader', 'appSwitcherTitle').removeComponentProp('ApplicationHeader', 'appSwitcherRoutes').removeComponentProp('ApplicationHeader', 'appSwitcherItems')
}, {
  description: 'move AppSwitcher from @jutro/components to @jutro/router',
  execute: source => source.migrateImportSpecifier('AppSwitcher', '@jutro/router', '@jutro/components')
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map