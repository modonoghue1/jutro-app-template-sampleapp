"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceImport = exports.shouldReplaceImport = exports.shouldRemoveImport = exports.shouldAddImport = exports.createImportRule = exports.addBefore = exports.addAfter = void 0;

var _postcss = require("postcss");

const createImportRule = importName => (0, _postcss.atRule)({
  name: 'import',
  params: `"${importName}"`
});

exports.createImportRule = createImportRule;

const addAfter = (atRuleNode, nodeImportName, additions) => {
  additions.filter(({
    insertAfter
  }) => nodeImportName.includes(insertAfter)).forEach(({
    name
  }) => {
    var _atRuleNode$next, _atRuleNode$next$para;

    if ((_atRuleNode$next = atRuleNode.next()) !== null && _atRuleNode$next !== void 0 && (_atRuleNode$next$para = _atRuleNode$next.params) !== null && _atRuleNode$next$para !== void 0 && _atRuleNode$next$para.includes(name)) {
      return;
    }

    atRuleNode.after(createImportRule(name));
  });
};

exports.addAfter = addAfter;

const addBefore = (atRuleNode, nodeImportName, additions) => {
  additions.filter(({
    insertBefore
  }) => nodeImportName.includes(insertBefore)).forEach(({
    name
  }) => {
    var _atRuleNode$prev, _atRuleNode$prev$para;

    if ((_atRuleNode$prev = atRuleNode.prev()) !== null && _atRuleNode$prev !== void 0 && (_atRuleNode$prev$para = _atRuleNode$prev.params) !== null && _atRuleNode$prev$para !== void 0 && _atRuleNode$prev$para.includes(name)) {
      return;
    }

    atRuleNode.before(createImportRule(name));
  });
};

exports.addBefore = addBefore;

const shouldAddImport = (nodeImportName, additions) => additions === null || additions === void 0 ? void 0 : additions.some(({
  insertBefore,
  insertAfter
}) => nodeImportName.includes(insertBefore) || nodeImportName.includes(insertAfter));

exports.shouldAddImport = shouldAddImport;

const shouldRemoveImport = (atRuleNode, nodeImportName, removals = [], additions = []) => {
  const toBeRemoved = removals.some(importName => nodeImportName.includes(importName));
  const isAddedByMods = additions.some(({
    name,
    insertBefore,
    insertAfter
  }) => {
    var _atRuleNode$next2, _atRuleNode$next2$par, _atRuleNode$prev2, _atRuleNode$prev2$par;

    return nodeImportName.includes(name) && (((_atRuleNode$next2 = atRuleNode.next()) === null || _atRuleNode$next2 === void 0 ? void 0 : (_atRuleNode$next2$par = _atRuleNode$next2.params) === null || _atRuleNode$next2$par === void 0 ? void 0 : _atRuleNode$next2$par.includes(insertBefore)) || ((_atRuleNode$prev2 = atRuleNode.prev()) === null || _atRuleNode$prev2 === void 0 ? void 0 : (_atRuleNode$prev2$par = _atRuleNode$prev2.params) === null || _atRuleNode$prev2$par === void 0 ? void 0 : _atRuleNode$prev2$par.includes(insertAfter)));
  });
  return toBeRemoved && !isAddedByMods;
};

exports.shouldRemoveImport = shouldRemoveImport;

const shouldReplaceImport = (nodeImportName, replacements = []) => replacements.some(({
  name
}) => nodeImportName.includes(name));

exports.shouldReplaceImport = shouldReplaceImport;

const replaceImport = (atRuleNode, nodeImportName, replacements = []) => {
  const replaceWith = replacements === null || replacements === void 0 ? void 0 : replacements.find(({
    name
  }) => nodeImportName.includes(name)).replaceWith;
  const newImportRule = createImportRule(replaceWith);
  atRuleNode.replaceWith(newImportRule);
};

exports.replaceImport = replaceImport;
//# sourceMappingURL=importHandlers.js.map