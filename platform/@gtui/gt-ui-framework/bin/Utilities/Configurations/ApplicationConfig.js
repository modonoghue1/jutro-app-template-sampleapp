"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationConfig = void 0;

var {
  getValueForConfigProperty,
  readJson5File
} = require('./ConfigUtils');

var defaultUserRolesConfigFile = 'config/userRoles.json5';

class User {
  constructor(usr, pwd) {
    this.username = usr;
    this.password = pwd;
  }

}

class ApplicationConfig {
  constructor(appName) {
    this.appName = appName;
    this.userRoles = new Map();
    this.rolesConfigFile = defaultUserRolesConfigFile;
    this.rolesConfigFileHasBeenRead = false;
  }

  getAppUrl() {
    var configKey = this.appName + '_URL';
    return getValueForConfigProperty(configKey);
  }

  getUserForRole(roleName) {
    if (!this.rolesConfigFileHasBeenRead) {
      this.readRoles(this.rolesConfigFile);
    }

    if (!this.userRoles.has(roleName)) {
      console.error('Failed to find ' + roleName + ' role for app ' + this.appName);
      return null;
    }

    return this.userRoles.get(roleName);
  }

  setUserRole(rolename, username, password) {
    this.userRoles.set(rolename, new User(username, password));
  }

  getAppUsername() {
    var configKey = this.appName + '_USERNAME';
    return getValueForConfigProperty(configKey);
  }

  getAppPassword() {
    var configKey = this.appName + '_PASSWORD';
    return getValueForConfigProperty(configKey);
  }

  hasLoginCredentials() {
    if (this.getAppUsername() && this.getAppPassword() && this.getAppUrl()) {
      return true;
    } else {
      console.log("Unable to login to app. Missing credential config for " + this.appName);
      return false;
    }
  }

  readRoles(configFile) {
    console.log('Reading ' + this.appName + ' roles from ' + configFile);
    var roleData = readJson5File(configFile);

    for (var roles of roleData.roles[this.appName]) {
      this.setUserRole(roles.userrole, roles.username, roles.password);
    }

    this.rolesConfigFileHasBeenRead = true;
  } // API for testing


  setRolesConfigFile(configFile) {
    this.rolesConfigFile = configFile;
  }

}

exports.ApplicationConfig = ApplicationConfig;