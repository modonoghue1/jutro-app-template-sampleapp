"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConsumerApplicationPackage = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _logging = require("../logging");

const getConsumerApplicationPackage = (source = 'package.json') => {
  try {
    return _fsExtra.default.readJSONSync(source);
  } catch (e) {
    (0, _logging.logRed)(`Could not find a ${source} file. Make sure you are running this command from the correct directory`);
    return null;
  }
};

exports.getConsumerApplicationPackage = getConsumerApplicationPackage;
//# sourceMappingURL=getConsumerApplicationPackage.js.map