"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConsumerModuleVersion = void 0;

var _logging = require("../logging");

var _getConsumerApplicationVersion = require("./getConsumerApplicationVersion");

const getConsumerModuleVersion = packageFiles => {
  try {
    let moduleVersion;

    for (const file of packageFiles) {
      moduleVersion = (0, _getConsumerApplicationVersion.getConsumerApplicationVersion)(file);

      if (moduleVersion) {
        return moduleVersion;
      }
    }

    return null;
  } catch (e) {
    (0, _logging.logRed)(`Could not find a valid module version. Make sure you are running this command from the correct directory`);
    return null;
  }
};

exports.getConsumerModuleVersion = getConsumerModuleVersion;
//# sourceMappingURL=getConsumerModuleVersion.js.map