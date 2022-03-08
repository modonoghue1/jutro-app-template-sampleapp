"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

const dateTimeFieldRenameProps = metadata => {
  if (!metadata.componentProps) {
    return metadata;
  }

  const _metadata$componentPr = metadata.componentProps,
        onTimeBlur = _metadata$componentPr.onTimeBlur,
        onTimeFocus = _metadata$componentPr.onTimeFocus,
        restProps = (0, _objectWithoutProperties2.default)(_metadata$componentPr, ["onTimeBlur", "onTimeFocus"]);
  return { ...metadata,
    componentProps: {
      onBlurTime: onTimeBlur,
      onFocusTime: onTimeFocus,
      ...restProps
    }
  };
};

const reducer = (0, _cliSnapshotTools.createReducer)({
  [_actions.DATE_TIME_RENAME_PROPS]: dateTimeFieldRenameProps
});
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map