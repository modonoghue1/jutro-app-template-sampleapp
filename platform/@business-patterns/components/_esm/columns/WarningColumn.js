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
import { Icon } from '@jutro/components';
import { Flex, FlexItem } from '@jutro/layout';
import { DisplayColumn } from '@jutro/datatable';
export var WarningColumn = function WarningColumn() {
  if (__DEV__) {
    throw new Error('Component <WarningColumn /> should never render');
  }

  return React.createElement(React.Fragment, null);
};

WarningColumn.defaultCell = function (row, rowId, _ref) {
  var _context;

  var id = _ref.id,
      path = _ref.path,
      warningPath = _ref.warningPath,
      visible = _ref.visible;

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

  var warning = get(row, warningPath);
  return React.createElement(Flex, {
    alignItems: "center",
    gap: "small"
  }, React.createElement(FlexItem, null, value), warning && React.createElement(Icon, {
    id: _concatInstanceProperty(_context = "".concat(id, "_")).call(_context, rowId, "_icon"),
    icon: "mi-warning"
  }));
};

WarningColumn.displayName = 'WarningColumn';
WarningColumn.defaultProps = _objectSpread(_objectSpread({}, DisplayColumn.defaultProps), {}, {
  renderCell: WarningColumn.defaultCell
});
//# sourceMappingURL=WarningColumn.js.map