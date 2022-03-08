"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyAtRulesChanges = void 0;

const removeImport = (atRule, imports) => {
  var _imports$changes, _imports$changes$remo;

  if (!imports) {
    return;
  }

  (_imports$changes = imports.changes) === null || _imports$changes === void 0 ? void 0 : (_imports$changes$remo = _imports$changes.removals) === null || _imports$changes$remo === void 0 ? void 0 : _imports$changes$remo.forEach(toBeRemoved => {
    if (atRule.params.includes(toBeRemoved)) {
      atRule.remove();
    }
  });
};

const handleImportsRemovals = (css, atRules, selectors) => {
  css.walkAtRules(atRule => {
    const selector = atRule.parent.selector || atRule.parent.type;

    if (selectors.indexOf(selector) > -1) {
      if (atRule.name === 'import') {
        removeImport(atRule, atRules[selector].filter(({
          ruleName
        }) => ruleName === 'import')[0]);
      }
    }
  });
};

const applyAtRulesChanges = (css, atRules) => {
  if (!atRules) {
    return;
  }

  const atRulesSelectors = Object.keys(atRules);
  handleImportsRemovals(css, atRules, atRulesSelectors);
};

exports.applyAtRulesChanges = applyAtRulesChanges;
//# sourceMappingURL=applyAtRulesChanges.js.map