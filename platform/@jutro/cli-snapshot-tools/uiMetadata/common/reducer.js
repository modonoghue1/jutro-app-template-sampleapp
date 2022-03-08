"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = createReducer;
exports.removeComponentProp = exports.replaceComponentProp = exports.reducer = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _actions = require("./actions");

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const replaceComponentProp = (metadata, {
  oldProp,
  newProp
}) => {
  const _metadata$componentPr = metadata.componentProps,
        replacement = _metadata$componentPr[oldProp],
        componentProps = (0, _objectWithoutProperties2.default)(_metadata$componentPr, [oldProp].map(_toPropertyKey));

  if (replacement) {
    componentProps[newProp] = replacement;
  }

  return { ...metadata,
    componentProps: { ...componentProps
    }
  };
};

exports.replaceComponentProp = replaceComponentProp;

const removeComponentProp = (metadata, {
  prop
}) => {
  const _metadata$componentPr2 = metadata.componentProps,
        droppedProp = _metadata$componentPr2[prop],
        componentProps = (0, _objectWithoutProperties2.default)(_metadata$componentPr2, [prop].map(_toPropertyKey));
  return { ...metadata,
    componentProps
  };
};

exports.removeComponentProp = removeComponentProp;
const handlers = {
  [_actions.actionTypes.replaceComponentProp]: replaceComponentProp,
  [_actions.actionTypes.removeComponentProp]: removeComponentProp
};

function createReducer(versionHandlers) {
  const combinedHandlers = { ...handlers,
    ...versionHandlers
  };
  return function reducer(state, action) {
    if (Object.prototype.hasOwnProperty.call(combinedHandlers, action.type)) {
      const updateState = combinedHandlers[action.type];
      return updateState(state, action);
    }

    return state;
  };
}

const reducer = createReducer();
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map