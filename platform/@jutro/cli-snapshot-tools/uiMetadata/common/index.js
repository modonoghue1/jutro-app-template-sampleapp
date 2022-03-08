"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require("./actions");

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _actions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _actions[key];
    }
  });
});

var _reducer = require("./reducer");

Object.keys(_reducer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _reducer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reducer[key];
    }
  });
});
//# sourceMappingURL=index.js.map