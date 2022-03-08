'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onApplication = exports.adjustBaseHref = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _RestRequestUtils = _interopRequireDefault(require("../../RestRequestHelper/RestRequestUtils"));

var _ISLoginPage = _interopRequireDefault(require("../../OOTBpages/CommonPages/ISLoginPage.js"));

var _TabBarWidget = _interopRequireDefault(require("../../OOTBpages/CommonPages/TabBarWidget"));

var _ISApps = require("./ISApps");

var _testcafe = require("testcafe");

/**
 * This function changes the value of the href attribute of the base tag to the window.location href (root href).
 *
 * TestCafe is not able to perform UI actions that trigger communication to the Pebbles server, showing the following error
 * in the browser console: “Failed to load resource: the server responded with a status of 404 (Not Found)”.
 * To workaround the issue, {@link onApplication.navigateToApp} calls {@link adjustBaseHref},
 * which changes the value of base.href from baseUrl + '/resources/' to window.location.href.
 *
 * For example,
 *  https://<hostname>/resources/
 *  will be changed to:
 *  https://<hostname>/BillingCenter.do
 *
 * It fixes the error -- however, keep in mind that changing the base.href will affect some functionality of the Pebbles UI.
 * Calls that require getting resources from the WebResourcesDir, for example, changing UI themes, getting TemplatePanelContents
 * images will be affected. For more details, {@see https://guidewirejira.atlassian.net/browse/PORT-16288}
 */
var adjustBaseHref = (0, _testcafe.ClientFunction)(() => {
  var baseTag = document.querySelector('base');
  baseTag.href = encodeURI(window.location.href);
});
exports.adjustBaseHref = adjustBaseHref;

class onApplication extends _ISApps.ISApps {
  constructor(APP_NAME) {
    super(APP_NAME);
    this.setCurrentApp(APP_NAME);
    this.currentRoleName = undefined;
    this.roles = new Map();
    return this;
  }

  loginWithDefaultUser() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var user = _this.getUserForRole('superuser');

      yield _this.loginWithUser(user.username, user.password);
    })();
  }

  loginWithUser(username, password) {
    var _arguments = arguments,
        _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var navigateToApp = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : true;

      _this2.resetCurrentRoleName();

      if (navigateToApp) {
        yield _this2.navigateToApp();
      }

      console.log('Logging into ' + _this2.currentApp + ' as user ' + username + ' with URL ' + _this2.getAppURL());
      yield _this2.verifyAppResponseStatus();
      yield _ISLoginPage.default.login(username, password);
    })();
  } // This uses the built-in TestCafe Roles functionality


  loginWithRole(roleName) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      console.log('Logging into ' + _this3.getCurrentApp() + ' using the ' + roleName + ' role');

      var currentRole = _this3.getRole(roleName);

      if (!currentRole) {
        console.error('Failed to log in using role ' + roleName);

        _this3.resetCurrentRoleName();

        return; // throw new Error('Failed to log in using role ' + roleName);
      }

      yield _testcafe.t.useRole(currentRole);

      _this3.resetCurrentRoleName(roleName); // This this call should be redundant but seems to be necessary


      yield _this3.navigateToApp();
    })();
  }

  loginWithSuperuserRole() {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this4.loginWithRole('superuser');
    })();
  }

  createRoleForUser(rolename, username, password) {
    var _this5 = this;

    if (!this.roles.has(rolename)) {
      console.log('Adding role for ' + rolename + ' (' + username + ')');
      this.roles.set(rolename, (0, _testcafe.Role)(this.getAppURL(), /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
        yield _this5.loginWithUser(username, password, false);
      })));
      this.appConfig.setUserRole(rolename, username, password);
      return this.roles.get(rolename);
    }
  }

  getRole(roleName) {
    if (!this.roles.has(roleName)) {
      // getUserForRole() will log an error for an unknown role
      var user = this.getUserForRole(roleName);

      if (user) {
        this.createRoleForUser(roleName, user.username, user.password);
      }
    }

    return this.roles.get(roleName);
  }

  resetCurrentRoleName() {
    var roleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    // ToDo: Implement TestCafe debug logging
    // console.debug("Setting current role name to " + roleName);
    this.currentRoleName = roleName;
  }

  usingRoleForLogin() {
    return this.currentRoleName !== undefined;
  }

  logout() {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      if (_this6.usingRoleForLogin()) {
        var currentUser = _this6.getUserForRole(_this6.currentRoleName);

        console.log('Logging out for role ' + _this6.currentRoleName + ' (' + currentUser.username + ')');

        _this6.resetCurrentRoleName();

        yield _testcafe.t.useRole(_testcafe.Role.anonymous());
      } else {
        console.log('Logging out using tab bar widget');
        yield _TabBarWidget.default.logout();
      }
    })();
  }

  navigateToApp() {
    var _this7 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _testcafe.t.expect(_this7.supportedPebblesBasedApps.includes(_this7.getCurrentApp())).eql(true, "Unknown application code: " + _this7.getCurrentApp());
      yield _this7.verifyAppResponseStatus();
      yield _testcafe.t.setNativeDialogHandler(() => true);
      yield _testcafe.t.navigateTo(_this7.getAppURL()).maximizeWindow();
      yield adjustBaseHref();
    })();
  }

  verifyAppResponseStatus() {
    var _this8 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var appUrl = _this8.getAppURL();

      var restResponse = yield _RestRequestUtils.default.doGetURLRequest(appUrl);
      yield _testcafe.t.expect(restResponse.statusCode).eql(200, "Failed to contact app server: " + _this8.getAppURL() + " (invalid response status)");
    })();
  }

}

exports.onApplication = onApplication;