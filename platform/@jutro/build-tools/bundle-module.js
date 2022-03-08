#!/usr/bin/env node
const path = require('path');
const cliArgs = require('minimist')(process.argv.slice(2));
const { mkdir } = require('fs');
const rimraf = require('rimraf');
const { ncp } = require('ncp');

ncp.limit = 16;
const { modulePath } = cliArgs;
const source = path.join(modulePath);
const destination = path.join(modulePath, 'dist');

const cleanDist = callback => {
    rimraf(destination, () => {
        // eslint-disable-next-line no-console
        console.log('Success:Clean:@jutro');

        mkdir(destination, err => {
            if (err) {
                callback(err);
            } else {
                callback(null, {});
            }
        });
    });
};

const copyOptions = {
    filter: filePath => {
        const isNotDist = filePath.indexOf('dist') === -1;
        const isNotNodeModules = filePath.indexOf('node_modules') === -1;
        const isNotPackageLock = filePath.indexOf('package-lock.json') === -1;
        const isNotMocks = !/__mocks__|__local_mocks__/.test(filePath);
        const isNotTests = filePath.indexOf('__tests__') === -1;
        return (
            isNotDist &&
            isNotNodeModules &&
            isNotPackageLock &&
            isNotTests &&
            isNotMocks
        );
    },
};

cleanDist(() => {
    ncp(source, destination, copyOptions, err => {
        if (err) {
            // eslint-disable-next-line no-console, prefer-template
            console.log(`Copy:Error:@Jutro/${modulePath}`);
        }
        // eslint-disable-next-line no-console, prefer-template
        console.log(`Copy:Success:@Jutro/${modulePath}`);
    });
});
