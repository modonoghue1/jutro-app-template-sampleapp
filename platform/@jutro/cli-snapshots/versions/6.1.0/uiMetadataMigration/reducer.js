"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

const chevronRemoveAlignProp = metadata => {
  if (!metadata.componentProps) {
    return metadata;
  }

  const _metadata$componentPr = metadata.componentProps,
        align = _metadata$componentPr.align,
        componentProps = (0, _objectWithoutProperties2.default)(_metadata$componentPr, ["align"]);
  return { ...metadata,
    componentProps
  };
};

const dateTimeZoneFieldRenameProps = metadata => {
  if (!metadata.componentProps) {
    return metadata;
  }

  const _metadata$componentPr2 = metadata.componentProps,
        timeZoneLabel = _metadata$componentPr2.timeZoneLabel,
        timeZoneSecondaryLabel = _metadata$componentPr2.timeZoneSecondaryLabel,
        timeZoneTooltip = _metadata$componentPr2.timeZoneTooltip,
        timeZoneHideLabel = _metadata$componentPr2.timeZoneHideLabel,
        restProps = (0, _objectWithoutProperties2.default)(_metadata$componentPr2, ["timeZoneLabel", "timeZoneSecondaryLabel", "timeZoneTooltip", "timeZoneHideLabel"]);
  return { ...metadata,
    componentProps: {
      labelTimeZone: timeZoneLabel,
      secondaryLabelTimeZone: timeZoneSecondaryLabel,
      tooltipTimeZone: timeZoneTooltip,
      hideLabelTimeZone: timeZoneHideLabel,
      ...restProps
    }
  };
};

const reducer = (0, _cliSnapshotTools.createReducer)({
  [_actions.CHEVRON_REMOVE_ALIGN_PROP]: chevronRemoveAlignProp,
  [_actions.DATE_TIME_ZONE_RENAME_PROPS]: dateTimeZoneFieldRenameProps
});
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map