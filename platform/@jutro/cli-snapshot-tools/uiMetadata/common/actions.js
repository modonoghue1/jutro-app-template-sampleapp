"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeComponentPropAction = exports.replaceComponentPropAction = exports.actionTypes = void 0;
const actionTypes = {
  replaceComponentProp: '[ JUTRO ] REPLACE_COMPONENT_PROP',
  removeComponentProp: '[ JUTRO ] REMOVE_COMPONENT_PROP'
};
exports.actionTypes = actionTypes;

const replaceComponentPropAction = (oldProp, newProp) => ({
  oldProp,
  newProp,
  type: actionTypes.replaceComponentProp
});

exports.replaceComponentPropAction = replaceComponentPropAction;

const removeComponentPropAction = prop => ({
  prop,
  type: actionTypes.removeComponentProp
});

exports.removeComponentPropAction = removeComponentPropAction;
//# sourceMappingURL=actions.js.map