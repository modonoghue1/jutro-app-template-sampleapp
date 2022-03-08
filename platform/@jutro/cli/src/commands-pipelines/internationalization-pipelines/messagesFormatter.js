"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

exports.format = function (msgs) {
  const results = {};

  for (const _ref of Object.entries(msgs)) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2);

    const id = _ref2[0];
    const msg = _ref2[1];
    results[id] = msg.defaultMessage;
  }

  return results;
};
//# sourceMappingURL=messagesFormatter.js.map