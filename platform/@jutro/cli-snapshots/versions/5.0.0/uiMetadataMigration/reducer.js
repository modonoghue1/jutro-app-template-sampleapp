"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _omit = _interopRequireDefault(require("lodash/omit"));

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

var _helpers = require("./helpers");

const removeSizeProp = metadata => {
  if (metadata.component && _helpers.removedSizeComponentList.includes(metadata.component.toLowerCase())) {
    if (metadata.componentProps && metadata.componentProps.size) {
      metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'size');
      return metadata;
    }
  }

  return metadata;
};

const removeDeprecatedPropsFromDataTable = metadata => {
  if (metadata.componentProps) {
    metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'defaultSorted');
    metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'defaultPageSize');
    return metadata;
  }

  return metadata;
};

const removeDeprecatedAndMapNewPropsFromVega = metadata => {
  if (metadata.componentProps) {
    metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'background');

    if (!metadata.componentProps.onTooltip) {
      metadata.componentProps.onTooltip = metadata.componentProps.tooltip;
    }

    metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'tooltip');

    if (!metadata.componentProps.onError) {
      metadata.componentProps.onError = metadata.componentProps.onParseError;
    }

    metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'onParseError');

    if (!metadata.componentProps.hover) {
      metadata.componentProps.hover = metadata.componentProps.enableHover;
    }

    metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'enableHover');
    return metadata;
  }

  return metadata;
};

const mapValuesOfSizeAndTypeInButton = metadata => {
  if (metadata.componentProps) {
    if (metadata.componentProps.type) {
      Object.keys(_helpers.buttonTypeMapping).forEach(type => {
        if (metadata.componentProps.type === type) {
          metadata.componentProps.type = _helpers.buttonTypeMapping[type];
        }
      });
    }

    if (metadata.componentProps.size) {
      Object.keys(_helpers.buttonSizeMapping).forEach(size => {
        if (metadata.componentProps.size === size) {
          metadata.componentProps.size = _helpers.buttonSizeMapping[size];
        }
      });
    }

    return metadata;
  }

  return metadata;
};

const mapValuesOfSizeInGrid = metadata => {
  if (metadata.componentProps) {
    if (metadata.componentProps.gap) {
      Object.keys(_helpers.gridSizeMapping).forEach(gap => {
        if (metadata.componentProps.gap === gap) {
          metadata.componentProps.gap = _helpers.gridSizeMapping[gap];
        }
      });
    }

    return metadata;
  }

  return metadata;
};

const mapHeaderInAccordionCard = metadata => {
  if (metadata.componentProps) {
    if (!metadata.componentProps.renderHeader && typeof metadata.componentProps.header === 'string') {
      metadata.componentProps.renderHeader = metadata.componentProps.header;
    }

    if (!metadata.componentProps.title && typeof metadata.componentProps.header === 'object') {
      metadata.componentProps.title = metadata.componentProps.header;
    }

    metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'header');
    return metadata;
  }

  return metadata;
};

const removeDeprecatedAndMapNewPropsFromFileUpload = metadata => {
  if (metadata.componentProps) {
    if (metadata.componentProps.buttonSize) {
      Object.keys(_helpers.buttonSizeMapping).forEach(size => {
        if (metadata.componentProps.buttonSize === size) {
          metadata.componentProps.buttonSize = _helpers.buttonSizeMapping[size];
        }
      });
    }

    if (metadata.componentProps.messageProps) {
      if (!metadata.componentProps.messageProps.maxFileSizeKBMessage) {
        metadata.componentProps.messageProps.maxFileSizeKBMessage = metadata.componentProps.messageProps.maxFileSizeMessage;
      }

      metadata.componentProps.messageProps = (0, _omit.default)(metadata.componentProps.messageProps, 'maxFileSizeMessage');

      if (!metadata.componentProps.messageProps.incorrectFileTypeMessage) {
        metadata.componentProps.messageProps.incorrectFileTypeMessage = metadata.componentProps.incorrectFileTypeError;
      }

      metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'incorrectFileTypeError');
    }

    if (!metadata.componentProps.maxFileSizeKB) {
      metadata.componentProps.maxFileSizeKB = metadata.componentProps.maxFileSize;
    }

    metadata.componentProps = (0, _omit.default)(metadata.componentProps, 'maxFileSize');
    return metadata;
  }

  return metadata;
};

const handlers = {
  [_actions.actionTypes.removeSizeProp]: removeSizeProp,
  [_actions.actionTypes.removeDeprecatedPropsFromDataTable]: removeDeprecatedPropsFromDataTable,
  [_actions.actionTypes.removeDeprecatedAndMapNewPropsFromVega]: removeDeprecatedAndMapNewPropsFromVega,
  [_actions.actionTypes.mapValuesOfSizeAndTypeInButton]: mapValuesOfSizeAndTypeInButton,
  [_actions.actionTypes.mapHeaderInAccordionCard]: mapHeaderInAccordionCard,
  [_actions.actionTypes.removeDeprecatedAndMapNewPropsFromFileUpload]: removeDeprecatedAndMapNewPropsFromFileUpload,
  [_actions.actionTypes.mapValuesOfSizeInGrid]: mapValuesOfSizeInGrid
};
const reducer = (0, _cliSnapshotTools.createReducer)(handlers);
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map