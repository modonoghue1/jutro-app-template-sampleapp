import "core-js/modules/web.dom-collections.for-each.js";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import React from 'react';
import get from "lodash/get";
import { InfoLabel } from '@jutro/components';
import { DisplayColumn } from '@jutro/datatable';
export var StatusColumn = function StatusColumn() {
  if (__DEV__) {
    throw new Error('Component <StatusColumn /> should never render');
  }

  return React.createElement(React.Fragment, null);
};

StatusColumn.defaultCell = function (row, rowId, _ref) {
  var _statusMap$value, _context;

  var id = _ref.id,
      path = _ref.path,
      visible = _ref.visible,
      statusMap = _ref.statusMap;

  if (visible === false) {
    return null;
  }

  var value = get(row, path);

  if (!value) {
    return DisplayColumn.defaultCell(row, rowId, {
      id: id,
      path: path
    });
  }

  var infoType = (_statusMap$value = statusMap[value]) !== null && _statusMap$value !== void 0 ? _statusMap$value : 'info';
  return React.createElement("div", null, React.createElement(InfoLabel, {
    id: _concatInstanceProperty(_context = "".concat(id, "_")).call(_context, rowId),
    type: infoType
  }, value));
};

StatusColumn.displayName = 'StatusColumn';
StatusColumn.defaultProps = _objectSpread(_objectSpread({}, DisplayColumn.defaultProps), {}, {
  statusMap: {},
  renderCell: StatusColumn.defaultCell
});
//# sourceMappingURL=StatusColumn.js.map