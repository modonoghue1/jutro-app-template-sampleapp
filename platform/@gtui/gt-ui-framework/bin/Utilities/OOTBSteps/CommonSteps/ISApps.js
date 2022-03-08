"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISApps = void 0;

var _ApplicationConfig = require("../../Configurations/ApplicationConfig");

class ISApps {
  constructor(appName) {
    this.currentApp = appName;
    this.appConfig = new _ApplicationConfig.ApplicationConfig(appName); // ToDo: Get these from config file

    this.supportedPebblesBasedApps = ["PC", "CC", "BC", "CM"];
    this.supportedApps = this.supportedPebblesBasedApps.concat(["ConsumerApp"]);
  }

  getSupportedApps() {
    return this.supportedApps;
  }

  setCurrentApp(appName) {
    this.currentApp = appName;
  }

  getCurrentApp() {
    return this.currentApp;
  }

  getAppHostname() {
    var appUrl = this.getAppURL();
    var appUrlSplit = appUrl.split("/");
    return appUrlSplit[2];
  }

  getAppURL() {
    return this.appConfig.getAppUrl();
  }

  getUserForRole(roleName) {
    return this.appConfig.getUserForRole(roleName);
  } // API for testing


  setTestRolesConfig() {
    this.appConfig.setRolesConfigFile('test/resources/testUserRoles.json5');
  }

}

exports.ISApps = ISApps;