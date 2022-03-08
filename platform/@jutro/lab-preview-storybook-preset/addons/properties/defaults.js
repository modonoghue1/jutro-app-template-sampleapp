"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProperties = void 0;
const lifecycleStatuses = {
  stable: {
    backgroundColor: '#26c76d',
    icon: 'gw-check'
  },
  deprecated: {
    backgroundColor: '#ff0900',
    icon: 'alert',
    description: 'This component is deprecated and will be removed in an upcoming major version of Jutro.'
  },
  'Lab preview': {
    backgroundColor: '#2196f3',
    icon: 'beaker',
    description: 'This component or pattern is Lab Preview only and still in the R&D phase and likely to change. All components in Lab Preview are available to use in their current form, but are unsupported until final development and documentation is complete.'
  }
};
const responsivenessStatuses = {
  responsive: {
    backgroundColor: '#f0f3f6',
    color: '#28333f',
    icon: 'responsive',
    description: 'This component automatically adjusts to any screen size'
  },
  fixed: {
    backgroundColor: '#f0f3f6',
    color: '#28333f',
    icon: 'fixed',
    description: 'This component does not adjust to fit the screen'
  },
  adaptive: {
    backgroundColor: '#f0f3f6',
    color: '#28333f',
    icon: 'adaptive',
    description: 'This component does not adjust automatically to every screen size. Separate configuration for phone/tablet should be provided.'
  }
};
const defaultProperties = {
  lifecycle: lifecycleStatuses,
  responsiveness: responsivenessStatuses
};
exports.defaultProperties = defaultProperties;
//# sourceMappingURL=defaults.js.map