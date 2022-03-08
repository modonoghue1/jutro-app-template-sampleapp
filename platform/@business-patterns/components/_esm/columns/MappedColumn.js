import "core-js/modules/web.dom-collections.for-each.js";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import get from "lodash/get";
import { DisplayColumn } from '@jutro/datatable';
export var MappedColumn = function MappedColumn() {
  if (__DEV__) {
    throw new Error('Component <MappedColumn /> should never render');
  }

  return React.createElement(React.Fragment, null);
};

MappedColumn.defaultCell = function (row, rowId, _ref) {
  var path = _ref.path,
      visible = _ref.visible,
      valueMap = _ref.valueMap;

  if (visible === false) {
    return null;
  }

  var value = get(row, path);
  var name = valueMap[value];

  if (name === undefined) {
    return DisplayColumn.defaultCell(row, rowId, {
      path: path
    });
  }

  return React.createElement("span", null, name);
};

MappedColumn.displayName = 'MappedColumn';
MappedColumn.defaultProps = _objectSpread(_objectSpread({}, DisplayColumn.defaultProps), {}, {
  valueMap: {},
  renderCell: MappedColumn.defaultCell
});
//# sourceMappingURL=MappedColumn.js.map