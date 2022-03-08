"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetadataPanel = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _constants = require("../constants");

var _MetadataTabs = require("./MetadataTabs");

const Container = _theming.styled.div(() => ({
  display: 'flex'
}));

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case _coreEvents.default.SET_CURRENT_STORY:
      {
        const storyId = action.payload.storyId;

        if (storyId === state.currentStory) {
          return state;
        }

        return {
          currentStory: storyId,
          data: undefined
        };
      }

    case _constants.EVENTS.GENERATED:
      {
        if (state.data === action.payload) {
          return state;
        }

        return { ...state,
          data: action.payload
        };
      }

    default:
      throw new Error('not supported action');
  }
};

const MetadataPanel = _react.default.memo(({
  active
}) => {
  const _React$useReducer = _react.default.useReducer(reducer, initialState),
        _React$useReducer2 = (0, _slicedToArray2.default)(_React$useReducer, 2),
        data = _React$useReducer2[0].data,
        dispatch = _React$useReducer2[1];

  const dispatchEvent = _react.default.useCallback(eventName => eventData => {
    dispatch({
      type: eventName,
      payload: eventData
    });
  }, []);

  (0, _api.useChannel)({
    [_coreEvents.default.SET_CURRENT_STORY]: dispatchEvent(_coreEvents.default.SET_CURRENT_STORY),
    [_constants.EVENTS.GENERATED]: dispatchEvent(_constants.EVENTS.GENERATED)
  }, []);

  if (!active) {
    return null;
  }

  return _react.default.createElement(Container, null, !data ? _react.default.createElement(_components.Loader, null) : _react.default.createElement(_MetadataTabs.MetadataTabs, {
    data: data
  }));
});

exports.MetadataPanel = MetadataPanel;
//# sourceMappingURL=MetadataPanel.js.map