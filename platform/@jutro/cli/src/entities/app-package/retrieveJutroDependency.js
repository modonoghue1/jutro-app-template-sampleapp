"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveJutroDependency = void 0;

var _isJutroDependency = require("./isJutroDependency");

const retrieveJutroDependency = dependencies => dependencies.find(_isJutroDependency.isJutroDependency);

exports.retrieveJutroDependency = retrieveJutroDependency;
//# sourceMappingURL=retrieveJutroDependency.js.map