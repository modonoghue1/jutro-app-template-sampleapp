"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isJutroDependency = void 0;

const isJutroDependency = dependency => {
  const jutroDependencyMatch = new RegExp(/@jutro/);
  return jutroDependencyMatch.test(dependency);
};

exports.isJutroDependency = isJutroDependency;
//# sourceMappingURL=isJutroDependency.js.map