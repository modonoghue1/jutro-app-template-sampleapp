"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

const match = (expression, name) => (0, _get.default)(expression, ['callee', 'object', 'name']) === 'ModalNextProvider' && (0, _get.default)(expression, ['callee', 'property', 'name']) === name;

var _default = [{
  description: 'Replace references to Modal modal with ModalNext',
  execute: source => source.replaceImportSpecifier('Modal', 'ModalNext', '@jutro/components').removeComponentProp('Modal', 'backdrop').removeComponentProp('Modal', 'toggle').removeComponentProp('Modal', 'fullScreen').removeComponentProp('Modal', 'wide').removeComponentProp('Modal', 'onEnter').removeComponentProp('Modal', 'onExit').removeComponentProp('Modal', 'zIndex').removeComponentProp('Modal', 'resultDefer').removeComponentProp('Modal', 'popOver').removeComponentProp('Modal', 'popOverAlign').renameComponentProp('Modal', 'autoFocus', 'shouldFocusAfterRender').renameComponentProp('Modal', 'keyboard', 'shouldCloseOnEsc').renameComponentProp('Modal', 'backdropDismiss', 'shouldCloseOnOverlayClick').renameComponentProp('Modal', 'backdropDismiss', 'shouldCloseOnOverlayClick').renameComponentProp('Modal', 'onOpened', 'onAfterOpen').renameComponentProp('Modal', 'onClosed', 'onRequestClose').renameComponentProp('Modal', 'windowClass', 'className').renameComponentProp('Modal', 'wrapper', 'parentSelector').renameComponent('Modal', 'ModalNext').removeImportSpecifier('ModalProvider', '@jutro/components').removeComponentUsage('ModalProvider').replaceImportSpecifierAndUsages('ModalService', 'ModalNextProvider', '@jutro/components').replaceImportSpecifierAndUsages('ModalService', 'ModalNextProvider', 'figlet').renameCallExpression('showInfo', 'showModal', match).renameCallExpression('showEmail', 'showModal', match).renameCallExpression('showSuccess', 'showAlert', match).renameCallExpression('showFullScreenPopup', 'showModal', match).renameCallExpression('showPopover', 'showModal', match).renameCallExpression('showSimpleDialog', 'showModal', match).renameCallExpression('showWarning', 'showAlert', match).renameCallExpression('showError', 'showAlert', match)
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map