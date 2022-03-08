"use strict";

const compareFunc = require('compare-func');

const _require = require('fs'),
      readFileSync = _require.readFileSync;

const _require2 = require('path'),
      resolve = _require2.resolve;

const writerOpts = getWriterOpts();
writerOpts.mainTemplate = readFileSync(resolve(__dirname, './templates/template.hbs'), 'utf-8');
writerOpts.headerPartial = readFileSync(resolve(__dirname, './templates/header.hbs'), 'utf-8');
writerOpts.commitPartial = readFileSync(resolve(__dirname, './templates/commit.hbs'), 'utf-8');
writerOpts.footerPartial = readFileSync(resolve(__dirname, './templates/footer.hbs'), 'utf-8');
module.exports = writerOpts;
const importantCommitTypes = {
  feat: 'Features',
  fix: 'Bug Fixes',
  perf: 'Performance Improvements',
  revert: 'Reverts'
};
const optionalCommitTypes = {
  docs: 'Documentation',
  refactor: 'Code Refactoring',
  test: 'Tests',
  chore: 'Auxiliary'
};
const allCommitTypes = { ...importantCommitTypes,
  ...optionalCommitTypes
};

function getWriterOpts() {
  return {
    transform: commit => {
      const discard = !commit.notes || commit.notes.length === 0;
      const commitTypes = discard ? importantCommitTypes : allCommitTypes;

      if (!commitTypes[commit.type]) {
        return undefined;
      }

      commit.type = commitTypes[commit.type];

      if (commit.scope === '*') {
        commit.scope = '';
      }

      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7);
      }

      return commit;
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  };
}
//# sourceMappingURL=writer-opts.js.map