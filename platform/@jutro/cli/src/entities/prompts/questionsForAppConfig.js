"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionsForAppConfig = void 0;

var _fs = require("fs");

var _utils = require("./utils");

const containsInvalidCharacters = input => {
  const validCharacters = new RegExp(/^[a-z0-9-_@]+$/i);
  return !validCharacters.test(input);
};

const stripInvalidCharacters = input => {
  const replace = new RegExp(/[^a-z0-9-_@\\/]/gi);
  return input.replace(replace, '');
};

const projectNameQuestions = presetValue => [{
  type: 'text',
  name: 'applicationName',
  message: 'Project name',
  validate: value => !!value && !containsInvalidCharacters(value) ? true : "Invalid project name (only alphanumeric and '-', '_', '@' characters allowed)",
  initial: presetValue ? () => stripInvalidCharacters(presetValue) : ''
}];

const projectPathQuestions = defaultApplicationDirectory => [{
  type: 'text',
  name: 'applicationDirectory',
  message: 'Project path',
  validate: value => !!value && ((0, _fs.existsSync)(value) || (0, _utils.validatePathName)(value)) ? true : "Invalid project name (only alphanumeric and '-', '_', '@', '.', '/', '\\' characters allowed)",
  initial: defaultApplicationDirectory
}];

const oktaQuestions = [{
  type: 'confirm',
  name: 'authEnabled',
  message: 'Enable Okta?',
  initial: ''
}, {
  type: prev => prev ? 'text' : null,
  name: 'oktaIssuer',
  message: 'Okta Issuer',
  validate: value => !!value,
  initial: ''
}, {
  type: (prev, values) => values.authEnabled ? 'text' : null,
  name: 'oktaScope',
  message: 'Okta Scope',
  initial: '',
  validate: value => {
    const pattern = new RegExp(/\w+(,\w+)*/g);
    return value === '' || pattern.test(value);
  },
  format: value => {
    if (value === '') {
      return value;
    }

    const pattern = new RegExp(/\w+(,\w+)*/g);
    return value.match(pattern).join();
  }
}, {
  type: (prev, values) => values.authEnabled ? 'text' : null,
  name: 'oktaClientId',
  message: 'Okta Client ID',
  validate: value => !!value,
  initial: ''
}, {
  type: (prev, values) => values.authEnabled ? 'text' : null,
  name: 'oktaRedirectBase',
  message: 'Okta Redirect Base',
  initial: 'http://localhost:3000',
  validate: value => !!value
}, {
  type: (prev, values) => values.authEnabled ? 'text' : null,
  name: 'oktaRedirectPath',
  message: 'Okta Redirect Path',
  initial: '/login',
  validate: value => !!value
}, {
  type: (prev, values) => values.authEnabled ? 'text' : null,
  name: 'oktaPkceEnabled',
  message: 'Enable Okta PKCE?',
  initial: ''
}];
const routerQuestions = [{
  type: 'text',
  name: 'routerBasename',
  message: 'Router Basename e.g /path OR /sub/path :',
  initial: '',
  validate: value => {
    const pattern = new RegExp(/^\/[/a-zA-Z0-9-]+[^/]$/g);
    return value === '' || pattern.test(value);
  }
}];
const mixPanelQuestions = [{
  type: 'confirm',
  name: 'mixPanelEnabled',
  message: 'Enable mixPanel analytics?',
  initial: ''
}, {
  type: prev => prev ? 'text' : null,
  name: 'mixPanelId',
  message: 'Mix Panel Tracking Id',
  validate: value => !!value,
  initial: ''
}];
const googleAnalyticsQuestions = [{
  type: 'confirm',
  name: 'googleAnalyticsEnabled',
  message: 'Enable Google Analytics?',
  initial: ''
}, {
  type: prev => prev ? 'text' : null,
  name: 'googleAnalyticsId',
  message: 'Google Analytics Tracking Id',
  validate: value => !!value,
  initial: ''
}];
const dataDogQuestions = [{
  type: 'confirm',
  name: 'dataDogEnabled',
  message: 'Enable Datadog?',
  initial: ''
}, {
  type: prev => prev ? 'text' : null,
  name: 'dataDogServiceName',
  message: 'Service name to be used for DataDog log',
  validate: value => !!value,
  initial: 'Jutro'
}, {
  type: (prev, values) => values.dataDogEnabled ? 'text' : null,
  name: 'dataDogToken',
  message: 'DataDog client token',
  validate: value => !!value,
  initial: ''
}, {
  type: (prev, values) => values.dataDogEnabled ? 'text' : null,
  name: 'dataDogEnv',
  message: 'DataDog environment (dev | prod )',
  validate: value => !!value,
  initial: 'dev'
}, {
  type: (prev, values) => values.dataDogEnabled ? 'text' : null,
  name: 'dataDogAppVersion',
  message: 'Application version',
  validate: value => !!value,
  initial: 'none'
}];
const questionsForAppConfig = {
  projectNameQuestions,
  projectPathQuestions,
  oktaQuestions,
  routerQuestions,
  mixPanelQuestions,
  googleAnalyticsQuestions,
  dataDogQuestions
};
exports.questionsForAppConfig = questionsForAppConfig;
//# sourceMappingURL=questionsForAppConfig.js.map