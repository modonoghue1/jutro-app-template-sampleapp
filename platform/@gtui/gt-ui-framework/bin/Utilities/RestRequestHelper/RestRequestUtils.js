"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _https = _interopRequireDefault(require("https"));

var _EnvVarsSetting = require("../Configurations/EnvVarsSetting");

var doGetAndReturnResponse = options => new Promise((resolve, reject) => {
  _https.default.get(options, res => {
    var statusCode = res.statusCode;
    var headers = res.headers;
    res.setEncoding('utf8');
    var rawBody = '';
    res.on('data', chunk => {
      rawBody += chunk;
    });
    res.on('end', () => {
      var body = JSON.parse(rawBody);
      resolve({
        statusCode,
        headers,
        rawBody,
        body
      });
    });
  }).on('error', e => reject(e));
});

var doGetURLResponse = url => new Promise((resolve, reject) => {
  _https.default.get(url, res => {
    var {
      statusCode
    } = res;
    var contentType = res.headers['content-type'];
    res.setEncoding('utf8');
    var rawData = '';
    res.on('data', chunk => {
      rawData += chunk;
    });
    res.on('end', () => resolve({
      statusCode,
      contentType,
      rawData
    }));
  }).on('error', e => reject(e));
});

var doPostAndReturnResponse = (options, requestBody) => new Promise((resolve, reject) => {
  var request = _https.default.request(options, res => {
    var statusCode = res.statusCode;
    var headers = res.headers;
    res.setEncoding('utf8');
    var responseBody = '';
    res.on('data', chunk => {
      responseBody += chunk;
    });
    res.on('end', () => resolve({
      statusCode,
      headers,
      responseBody
    }));
  }).on('error', e => reject(e));

  request.write(requestBody);
  request.end();
});

class RestRequestUtils {
  doGetRequest(hostname, path, username, password, headers) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      console.log("Doing GET request");

      var options = _this.generateOptionsForRequest(hostname, path, 'GET', username, password, headers);

      return yield doGetAndReturnResponse(options);
    })();
  }

  doGetURLRequest(appUrl) {
    return (0, _asyncToGenerator2.default)(function* () {
      return yield doGetURLResponse(appUrl);
    })();
  }

  doGetRequestWithDefaultSuUser(hostname, path, headers) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this2.doGetRequest(hostname, path, _EnvVarsSetting.DEFAULT_SU_USERNAME, _EnvVarsSetting.DEFAULT_SU_PASSWORD, headers);
    })();
  }

  doPostRequest(hostname, path, username, password, requestBody, headers) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      console.log("Doing POST request");

      var options = _this3.generateOptionsForRequest(hostname, path, 'POST', username, password, headers);

      return yield doPostAndReturnResponse(options, requestBody);
    })();
  }

  doPostRequestWithDefaultSuUser(hostname, path, requestBody, headers) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return yield _this4.doPostRequest(hostname, path, _EnvVarsSetting.DEFAULT_SU_USERNAME, _EnvVarsSetting.DEFAULT_SU_PASSWORD, requestBody, headers);
    })();
  }

  generateOptionsForRequest(hostname, path, method, username, password, headers) {
    if (headers == null) {
      headers = {};
    }

    headers.Authorization = this.generateAuthorizationHeader(username, password);
    return {
      "hostname": hostname,
      "port": 443,
      "path": path,
      "method": method,
      "headers": headers
    };
  }

  generateAuthorizationHeader(username, password) {
    return 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
  }

}

module.exports = new RestRequestUtils();