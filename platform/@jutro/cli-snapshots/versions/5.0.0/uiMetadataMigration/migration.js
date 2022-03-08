"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliSnapshotTools = require("@jutro/cli-snapshot-tools");

var _actions = require("./actions");

var _default = [{
  filter: () => true,
  actions: [(0, _actions.removeSizeProp)()]
}, {
  filter: (0, _cliSnapshotTools.createContainerFilter)('DataTable'),
  actions: [(0, _actions.removeDeprecatedPropsFromDataTable)()]
}, {
  filter: (0, _cliSnapshotTools.createElementFilter)('Vega'),
  actions: [(0, _actions.removeDeprecatedAndMapNewPropsFromVega)()]
}, {
  filter: (0, _cliSnapshotTools.createActionFilter)('Button'),
  actions: [(0, _actions.mapValuesOfSizeAndTypeInButton)()]
}, {
  filter: (0, _cliSnapshotTools.createContainerFilter)('AccordionCard'),
  actions: [(0, _actions.mapHeaderInAccordionCard)()]
}, {
  filter: (0, _cliSnapshotTools.createFieldFilter)('FileUpload'),
  actions: [(0, _actions.removeDeprecatedAndMapNewPropsFromFileUpload)()]
}, {
  filter: (0, _cliSnapshotTools.createLayoutFilter)('Grid'),
  actions: [(0, _actions.mapValuesOfSizeInGrid)()]
}];
exports.default = _default;
//# sourceMappingURL=migration.js.map