"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installUpdatedDependencies = void 0;

var _child_process = require("child_process");

var _logging = require("../logging");

const installUpdatedDependencies = (dependencyInstallScript = 'npm install') => {
  try {
    (0, _logging.logGreenAnnouncement)(dependencyInstallScript);
    (0, _child_process.execSync)(dependencyInstallScript, {
      stdio: 'inherit'
    });
    (0, _logging.logGreenAnnouncement)(`✓ ${dependencyInstallScript}`);
  } catch (err) {
    (0, _logging.logRed)(`A fatal error occured while trying to install updated dependencies
            ${err}`);
    process.exit(1);
  }
};

exports.installUpdatedDependencies = installUpdatedDependencies;
//# sourceMappingURL=installUpdatedDependencies.js.map