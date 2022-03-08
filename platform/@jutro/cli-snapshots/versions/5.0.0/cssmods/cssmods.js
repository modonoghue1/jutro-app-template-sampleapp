"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'Theme.scss': {
    atRules: {
      root: [{
        ruleName: 'import',
        changes: {
          removals: ['jutro/wizard/hashedStyles', 'jutro/theme-styles/themesStyles', 'jutro/theme/hashedStyles', 'jutro/layout/hashedStyles'],
          additions: [{
            name: '~@jutro/theme/hashedStyles',
            insertAfter: 'jutro/components/hashedStyles'
          }, {
            name: '~@jutro/wizard-next/hashedStyles',
            insertAfter: 'jutro/datatable/hashedStyles'
          }, {
            name: '~@jutro/layout/hashedStyles',
            insertBefore: 'jutro/components/hashedStyles'
          }]
        }
      }]
    }
  },
  '^fonts.scss': {
    atRules: {
      root: [{
        ruleName: 'import',
        changes: {
          removals: ['font-awesome/vendor/font-awesome.scss']
        }
      }]
    }
  }
};
exports.default = _default;
//# sourceMappingURL=cssmods.js.map