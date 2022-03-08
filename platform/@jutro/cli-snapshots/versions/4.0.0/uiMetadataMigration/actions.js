"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixComponentNameCasing = exports.convertDatePickerToDate = exports.actionTypes = void 0;
const actionTypes = {
  convertDatePickerToDate: '[ JUTRO 4.0.0 ] CONVERT_DATEPICKER_TO_DATE',
  fixComponentNameCasing: '[ JUTRO 4.0.0 ] FIX_COMPONENT_NAME_CASING'
};
exports.actionTypes = actionTypes;

const convertDatePickerToDate = () => ({
  type: actionTypes.convertDatePickerToDate
});

exports.convertDatePickerToDate = convertDatePickerToDate;

const fixComponentNameCasing = () => ({
  type: actionTypes.fixComponentNameCasing
});

exports.fixComponentNameCasing = fixComponentNameCasing;
//# sourceMappingURL=actions.js.map