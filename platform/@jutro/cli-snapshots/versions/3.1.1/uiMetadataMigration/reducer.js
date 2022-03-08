"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

const joinArray = pathArray => pathArray.join('.');

const getNestedArrayPath = path => {
  let formattedPath;

  if (Array.isArray(path[0]) && path.length === 3) {
    const _path = (0, _slicedToArray2.default)(path, 3),
          object = _path[0],
          index = _path[1],
          property = _path[2];

    formattedPath = object[index][property];
  } else {
    formattedPath = joinArray(path);
  }

  return formattedPath;
};

const getFormattedPath = path => Array.isArray(path) ? getNestedArrayPath(path) : path;

const convertPathArrayToString = metadata => {
  if (metadata.componentProps && metadata.componentProps.path) {
    const path = metadata.componentProps.path;
    return { ...metadata,
      componentProps: { ...metadata.componentProps,
        path: getFormattedPath(path)
      }
    };
  }

  return metadata;
};

const handlers = {
  [_actions.actionTypes.convertPathArrayToString]: convertPathArrayToString
};
const reducer = (0, _cliSnapshotTools.createReducer)(handlers);
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map