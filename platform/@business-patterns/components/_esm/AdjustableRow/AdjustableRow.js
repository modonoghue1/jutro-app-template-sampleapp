import React from 'react';
import { Grid, useBreakpoint } from '@jutro/layout';
export var AdjustableRow = function AdjustableRow(props) {
  var _useBreakpoint = useBreakpoint(props, true),
      breakpointProps = _useBreakpoint.breakpointProps;

  return React.createElement(Grid, {
    columns: breakpointProps.spec
  }, props.children);
};
var fullWidthConfig = {
  spec: ['1fr']
};
AdjustableRow.displayName = 'AdjustableRow';
AdjustableRow.defaultProps = {
  phone: fullWidthConfig,
  phoneWide: fullWidthConfig
};
//# sourceMappingURL=AdjustableRow.js.map