"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapValuesOfSizeInGrid = exports.removeDeprecatedAndMapNewPropsFromFileUpload = exports.mapHeaderInAccordionCard = exports.mapValuesOfSizeAndTypeInButton = exports.removeDeprecatedAndMapNewPropsFromVega = exports.removeDeprecatedPropsFromDataTable = exports.removeSizeProp = exports.actionTypes = void 0;
const actionTypes = {
  removeSizeProp: 'REMOVE_SIZE_PROP',
  removeDeprecatedPropsFromDataTable: 'REMOVE_DEFAULTPAGESIZE_PROP, REMOVE_DEFAULTSORTED_PROP',
  removeDeprecatedAndMapNewPropsFromVega: 'REMOVE_BACKGROUND_PROP, MAP_TOOLTIP_PROP_TO_ONTOOLTIP, MAP_ONPARSEERROR_PROP_TO_ONERROR, MAP_ENABLEHOVER_PROP_TO_HOVER',
  mapValuesOfSizeAndTypeInButton: 'MAP_TYPE_PROP, MAP_SIZE_PROP',
  mapHeaderInAccordionCard: 'MAP_HEADER_PROP_TO_TITLE_AND_RENDERHEADER',
  removeDeprecatedAndMapNewPropsFromFileUpload: 'MAP_BUTTONSIZE_PROP, MAP_MAXFILESIZE_PROP_TO_MAXFILESIZEKB, MAP_INCORRECTFILETYPEERROR_PROP_TO_INCORRECTFILETYPEMESSAGE, MAP_MAXFILESIZEMESSAGE_PROP_TO_MAXFILESIZEKBMESSAGE',
  mapValuesOfSizeInGrid: 'MAP_SIZE_PROP_GRID'
};
exports.actionTypes = actionTypes;

const removeSizeProp = () => ({
  type: actionTypes.removeSizeProp
});

exports.removeSizeProp = removeSizeProp;

const removeDeprecatedPropsFromDataTable = () => ({
  type: actionTypes.removeDeprecatedPropsFromDataTable
});

exports.removeDeprecatedPropsFromDataTable = removeDeprecatedPropsFromDataTable;

const removeDeprecatedAndMapNewPropsFromVega = () => ({
  type: actionTypes.removeDeprecatedAndMapNewPropsFromVega
});

exports.removeDeprecatedAndMapNewPropsFromVega = removeDeprecatedAndMapNewPropsFromVega;

const mapValuesOfSizeAndTypeInButton = () => ({
  type: actionTypes.mapValuesOfSizeAndTypeInButton
});

exports.mapValuesOfSizeAndTypeInButton = mapValuesOfSizeAndTypeInButton;

const removeDeprecatedAndMapNewPropsFromFileUpload = () => ({
  type: actionTypes.removeDeprecatedAndMapNewPropsFromFileUpload
});

exports.removeDeprecatedAndMapNewPropsFromFileUpload = removeDeprecatedAndMapNewPropsFromFileUpload;

const mapHeaderInAccordionCard = () => ({
  type: actionTypes.mapHeaderInAccordionCard
});

exports.mapHeaderInAccordionCard = mapHeaderInAccordionCard;

const mapValuesOfSizeInGrid = () => ({
  type: actionTypes.mapValuesOfSizeInGrid
});

exports.mapValuesOfSizeInGrid = mapValuesOfSizeInGrid;
//# sourceMappingURL=actions.js.map