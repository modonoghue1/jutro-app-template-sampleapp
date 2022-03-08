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
Object.defineProperty(exports, "folderStructure", {
  enumerable: true,
  get: function () {
    return _folderStructure.default;
  }
});
Object.defineProperty(exports, "cssMods", {
  enumerable: true,
  get: function () {
    return _cssmods.cssMods;
  }
});
exports.diff = exports.codemods = exports.uiMetadata = exports.name = exports.version = void 0;

var _packageTemplate = _interopRequireDefault(require("./package-template.json"));

var _folderStructure = _interopRequireDefault(require("./folder-structure.json"));

var uiMetadata = _interopRequireWildcard(require("./uiMetadataMigration"));

exports.uiMetadata = uiMetadata;

var codemods = _interopRequireWildcard(require("./codemods"));

exports.codemods = codemods;

var diff = _interopRequireWildcard(require("./diffs"));

exports.diff = diff;

var _cssmods = require("./cssmods");

const name = _packageTemplate.default.name,
      version = _packageTemplate.default.version;
exports.version = version;
exports.name = name;
//# sourceMappingURL=index.js.map