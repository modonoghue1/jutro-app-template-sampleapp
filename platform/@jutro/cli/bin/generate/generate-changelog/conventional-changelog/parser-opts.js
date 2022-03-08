"use strict";

module.exports = {
  headerPattern: /^(\w*)(?:\((.*)\))?: (.*?)(?:\((\w+-\d+|_|)\))?$/,
  headerCorrespondence: ['type', 'scope', 'subject', 'issue'],
  noteKeywords: ['BREAKING CHANGE', 'OWNERSHIP CHANGE'],
  revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./
};
//# sourceMappingURL=parser-opts.js.map