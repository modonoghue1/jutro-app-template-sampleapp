"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeprecatedPackageRecommendation = void 0;

const getDeprecatedPackageRecommendation = message => message && message.match(/<.+>/) ? message.match(/<.+>/)[0].replace(/<|>/g, '') : 'another package';

exports.getDeprecatedPackageRecommendation = getDeprecatedPackageRecommendation;
//# sourceMappingURL=getDeprecatedPackageRecommendation.js.map