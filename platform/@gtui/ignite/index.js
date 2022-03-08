#! /usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

module.exports = function runIgnite(igniteArgs) {
    const jdeployScriptLocation = path.resolve(__dirname, 'jdeploy-bundle', 'jdeploy.js')
    igniteArgs.unshift(jdeployScriptLocation);
    const cmd = 'node';
    spawn(cmd, igniteArgs,{ stdio: 'inherit' });
}