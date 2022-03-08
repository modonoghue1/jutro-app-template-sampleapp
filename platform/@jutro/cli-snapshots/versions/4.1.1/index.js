"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "template", {
  enumerable: true,
  get: function () {
    return _packageTemplate.default;
  }
});
exports.diff = exports.codemods = exports.uiMetadata = exports.version = exports.name = void 0;

var _packageTemplate = _interopRequireDefault(require("./package-template.json"));

var uiMetadata = _interopRequireWildcard(require("./uiMetadataMigration"));

exports.uiMetadata = uiMetadata;

var codemods = _interopRequireWildcard(require("./codemods"));

exports.codemods = codemods;

var diff = _interopRequireWildcard(require("./diffs"));

exports.diff = diff;
const name = _packageTemplate.default.name,
      version = _packageTemplate.default.version;
exports.version = version;
exports.name = name;
//# sourceMappingURL=index.js.map