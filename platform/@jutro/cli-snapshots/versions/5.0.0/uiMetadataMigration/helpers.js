"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridSizeMapping = exports.buttonSizeMapping = exports.buttonTypeMapping = exports.removedSizeComponentList = void 0;
const removedSizeComponentList = ['accordion', 'badge', 'breadcrumb', 'checkbox', 'checkboxgroup', 'chevron', 'colorpicker', 'currency', 'date', 'dropdownselect', 'fieldcomponent', 'fieldlabel', 'header', 'iconbutton', 'infolabel', 'input', 'inputmask', 'inputnumber', 'lookup', 'radiobutton', 'radiobuttoncard', 'stepper', 'switch', 'tag', 'textarea', 'toggle', 'tooltipicon', 'typeaheadmultiselect'];
exports.removedSizeComponentList = removedSizeComponentList;
const buttonTypeMapping = {
  primary: 'filled',
  neutral: 'filled',
  danger: 'filled',
  secondary: 'outlined',
  tertiary: 'text'
};
exports.buttonTypeMapping = buttonTypeMapping;
const buttonSizeMapping = {
  xsmall: 'small',
  large: 'medium',
  xlarge: 'medium'
};
exports.buttonSizeMapping = buttonSizeMapping;
const gridSizeMapping = {
  xsmall: 'small',
  xlarge: 'large'
};
exports.gridSizeMapping = gridSizeMapping;
//# sourceMappingURL=helpers.js.map