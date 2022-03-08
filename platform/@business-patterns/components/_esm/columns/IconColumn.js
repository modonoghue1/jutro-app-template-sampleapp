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
import { DisplayColumn } from '@jutro/datatable';
import { Flex, FlexItem } from '@jutro/layout';
export var IconColumn = function IconColumn() {
  if (__DEV__) {
    throw new Error('Component <IconColumn /> should never render');
  }

  return React.createElement(React.Fragment, null);
};

IconColumn.defaultCell = function (row, rowId, _ref) {
  var _context, _iconMap$value;

  var id = _ref.id,
      path = _ref.path,
      visible = _ref.visible,
      iconOnly = _ref.iconOnly,
      iconMap = _ref.iconMap;

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

  var icon = React.createElement(Icon, {
    id: _concatInstanceProperty(_context = "".concat(id, "_")).call(_context, rowId),
    icon: (_iconMap$value = iconMap[value]) !== null && _iconMap$value !== void 0 ? _iconMap$value : 'mi-help'
  });
  return iconOnly ? icon : React.createElement(Flex, {
    alignItems: "center"
  }, React.createElement(FlexItem, null, icon), React.createElement(FlexItem, null, value));
};

IconColumn.displayName = 'IconColumn';
IconColumn.defaultProps = _objectSpread(_objectSpread({}, DisplayColumn.defaultProps), {}, {
  iconMap: {},
  renderCell: IconColumn.defaultCell
});
//# sourceMappingURL=IconColumn.js.map