"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

const _require = require('@jutro/cli-snapshot-tools'),
      createReducer = _require.createReducer;

const _require2 = require('./helpers'),
      casingMap = _require2.casingMap;

const _require3 = require('./actions'),
      actionTypes = _require3.actionTypes;

const convertDatePickerToDate = metadata => {
  if (metadata.component) {
    return { ...metadata,
      component: 'date'
    };
  }

  return metadata;
};

const fixComponentNameCasing = metadata => {
  if (metadata.component) {
    return { ...metadata,
      component: casingMap[metadata.component] || metadata.component
    };
  }

  return metadata;
};

const handlers = {
  [actionTypes.convertDatePickerToDate]: convertDatePickerToDate,
  [actionTypes.fixComponentNameCasing]: fixComponentNameCasing
};
const reducer = createReducer(handlers);
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map