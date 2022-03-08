"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateApplicationConfiguration = updateApplicationConfiguration;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _fs = _interopRequireDefault(require("fs"));

var _logging = require("../logging");

function updateApplicationConfiguration(config) {
  const envFilePath = `${config.applicationDirectory}/.env`;
  const authEnabled = config.authEnabled,
        oktaIssuer = config.oktaIssuer,
        oktaScope = config.oktaScope,
        oktaClientId = config.oktaClientId,
        oktaRedirectBase = config.oktaRedirectBase,
        oktaRedirectPath = config.oktaRedirectPath,
        oktaPkceEnabled = config.oktaPkceEnabled,
        routerBasename = config.routerBasename,
        mixPanelEnabled = config.mixPanelEnabled,
        mixPanelId = config.mixPanelId,
        googleAnalyticsEnabled = config.googleAnalyticsEnabled,
        googleAnalyticsId = config.googleAnalyticsId,
        zipkinEnabled = config.zipkinEnabled,
        zipkinLocalServiceName = config.zipkinLocalServiceName,
        zipkinUrl = config.zipkinUrl,
        dataDogEnabled = config.dataDogEnabled,
        dataDogToken = config.dataDogToken,
        dataDogServiceName = config.dataDogServiceName,
        dataDogEnv = config.dataDogEnv,
        dataDogAppVersion = config.dataDogAppVersion;
  const configuration = {};

  if (routerBasename) {
    configuration.REACT_APP_JUTRO_ROUTER_BASENAME = routerBasename;
  }

  if (authEnabled) {
    configuration.REACT_APP_JUTRO_AUTH_ENABLED = authEnabled;
    configuration.REACT_APP_JUTRO_AUTH_ISSUER = oktaIssuer;
    configuration.REACT_APP_JUTRO_AUTH_SCOPE = oktaScope;
    configuration.REACT_APP_JUTRO_AUTH_CLIENT_ID = oktaClientId;
    configuration.REACT_APP_JUTRO_AUTH_REDIRECT_BASE = oktaRedirectBase;
    configuration.REACT_APP_JUTRO_AUTH_REDIRECT_PATH = oktaRedirectPath;
    configuration.REACT_APP_JUTRO_AUTH_PKCE_ENABLED = oktaPkceEnabled;
  }

  if (mixPanelEnabled) {
    configuration.REACT_APP_MIXPANEL_TRACKING_ID = mixPanelId;
  }

  if (googleAnalyticsEnabled) {
    configuration.REACT_APP_GA_TRACKING_ID = googleAnalyticsId;
  }

  if (dataDogEnabled) {
    configuration.REACT_APP_JUTRO_DATA_DOG_CLIENT_TOKEN = dataDogToken;
    configuration.REACT_APP_JUTRO_DATA_DOG_SERVICE_NAME = dataDogServiceName;
    configuration.REACT_APP_JUTRO_DATA_DOG_ENV = dataDogEnv;
    configuration.REACT_APP_JUTRO_DATA_DOG_APP_VERSION = dataDogAppVersion === 'none' ? "6.5.0" : dataDogAppVersion;
  }

  if (zipkinEnabled) {
    configuration.REACT_APP_JUTRO_ZIPKIN_URL = zipkinUrl;
    configuration.REACT_APP_ZIPKIN_LOCAL_SERVICE_NAME = zipkinLocalServiceName;
  }

  const initialConfigMap = {};
  const envConfigArray = [];

  const createConfigMap = configArray => {
    configArray.forEach(item => {
      const _item$split = item.split('='),
            _item$split2 = (0, _slicedToArray2.default)(_item$split, 2),
            envKey = _item$split2[0],
            value = _item$split2[1];

      initialConfigMap[envKey] = value;
    });
  };

  const covertConfigMapToArray = (objectMap, configArray) => Object.entries(objectMap).forEach(([key, value]) => {
    if (!key) {
      configArray.push(`\n`);
    } else if (!value) {
        configArray.push(`${key}\n`);
      } else {
        configArray.push(`${key}=${value}\n`);
      }
  });

  if (_fs.default.existsSync(envFilePath)) {
    const existingConfig = _fs.default.readFileSync(envFilePath).toString();

    const existingConfigList = existingConfig.split(/\r?\n/);
    createConfigMap(existingConfigList);
    const combinedConfigMap = { ...initialConfigMap,
      ...configuration
    };
    covertConfigMapToArray(combinedConfigMap, envConfigArray);
  }

  const newEnvConfig = Object.keys(configuration).map(key => `${key}=${configuration[key]}\n`).join('');
  const mergedEnvConfig = envConfigArray.length ? envConfigArray.join('') : newEnvConfig;

  _fs.default.writeFileSync(`${envFilePath}`, mergedEnvConfig.trim());

  (0, _logging.log)(`Config values written to ${envFilePath}: \n\n${mergedEnvConfig}`);
}
//# sourceMappingURL=updateApplicationConfiguration.js.map