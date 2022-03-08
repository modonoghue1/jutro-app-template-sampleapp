"use strict";

const fs = require('fs');

const _require = require('path'),
      join = _require.join;

const tempfile = require('tempfile');

const addStream = require('add-stream');

const conventionalChangelog = require('conventional-changelog');

const simpleGit = require('simple-git/promise');

const config = require('./conventional-changelog');

const createFileIfNotExists = filename => fs.closeSync(fs.openSync(filename, 'a'));

module.exports = async function generateChangeLog({
  workdir,
  forVersion,
  ignoredScopes,
  issuePrefixes
}) {
  const isGitRepo = await simpleGit(workdir).checkIsRepo();
  return new Promise((resolve, reject) => {
    if (!isGitRepo) {
      reject('Could not generate changelog - command must be run within a git repository.');
    }

    const changeLogFile = join(workdir, 'CHANGELOG.md');
    createFileIfNotExists(changeLogFile);
    const readStream = fs.createReadStream(changeLogFile);
    const options = {
      releaseCount: 1
    };
    const context = {
      version: forVersion
    };
    const gitRawCommitsOpts = {
      extendedRegexp: true,
      grep: `^[^(]+\\((${ignoredScopes.join('|')})\\)`,
      invertGrep: true
    };
    const changeLogStream = conventionalChangelog(options, context, gitRawCommitsOpts, { ...config.parserOpts,
      issuePrefixes
    }, config.writerOpts).on('error', reject);
    const tmp = tempfile();
    changeLogStream.pipe(addStream(readStream)).pipe(fs.createWriteStream(tmp)).on('finish', () => {
      fs.createReadStream(tmp).pipe(fs.createWriteStream(changeLogFile)).on('close', () => resolve('Changelog generated successfully.')).on('error', () => reject('Cannot save changelog to file.'));
    }).on('error', () => reject('Cannot generate changelog.'));
  });
};
//# sourceMappingURL=generateChangeLog.js.map