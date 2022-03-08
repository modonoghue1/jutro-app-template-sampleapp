"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMetadataFromFile = void 0;

var _commentJson = require("comment-json");

var _noop = _interopRequireDefault(require("lodash/noop"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _logging = require("../logging");

const getMetadataFromFile = file => {
  try {
    return (0, _commentJson.parse)(_fs.default.readFileSync(_path.default.resolve(process.cwd(), file)).toString());
  } catch (e) {
    try {
      if (__non_webpack_require__) (0, _noop.default)();
    } catch {
      global.__non_webpack_require__ = require;
    }

    (0, _logging.log)(`Special parsing required on file: ${file}`);
    return __non_webpack_require__(_path.default.resolve(process.cwd(), file));
  }
};

exports.getMetadataFromFile = getMetadataFromFile;
//# sourceMappingURL=getMetadataFromFile.js.map