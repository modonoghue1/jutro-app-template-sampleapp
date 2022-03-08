"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlattenedDependencies = void 0;

const getFlattenedDependencies = (fieldsToCheck, templatePackage) => fieldsToCheck.reduce((acc, type) => ({ ...acc,
  ...templatePackage[type]
}), {});

exports.getFlattenedDependencies = getFlattenedDependencies;
//# sourceMappingURL=getFlattenedDependencies.js.map