"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flatten = _interopRequireDefault(require("lodash/flatten"));

const previousVersionMigrations = {
  '1.0.3': [{
    description: 'Remove components which were moved to ApplicationRoot',
    exclude: 'src/index.js',
    execute: source => source.removeComponentUsage('RouteTracker').removeComponentUsage('ToastProvider').removeComponentUsage('ModalProvider')
  }, {
    description: 'Migrate analytics config to jutro packages',
    include: 'src/index.js',
    execute: source => source.removeImportDeclaration('@jutro/events').removeImportDeclaration('trackingConfig').removeVariableDeclaration('gaTrackingId').removeVariableDeclaration('mixpanelTrackingId').removeIdentifier('gaTrackingId').removeIdentifier('mixpanelTrackingId').removeCallExpression('initDefaultGA').removeCallExpression('initDefaultMixpanel')
  }],
  '2.0.1': [{
    description: 'Refactor modal2/new usages to modal-next',
    include: 'src/**/*',
    exclude: 'src/index.js',
    execute: source => source.renameComponent('ModalNew', 'ModalNext')
  }]
};
const allPreviousVersionMigrations = (0, _flatten.default)(Object.values(previousVersionMigrations));
var _default = allPreviousVersionMigrations;
exports.default = _default;
//# sourceMappingURL=migration.js.map