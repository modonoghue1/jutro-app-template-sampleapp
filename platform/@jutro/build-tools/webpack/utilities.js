const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const merge = require('webpack-merge');

const logger = require('./logger');
const localSourceConfiguration = require('./webpack.local');

exports.cleanBuildDirectory = function cleanBuildDirectory(applicationContext) {
    const distDirectory = path.resolve(path.join(applicationContext, 'dist'));
    const buildDirectory = path.resolve(path.join(distDirectory, 'build'));
    rimraf.sync(distDirectory);
    fs.mkdirSync(distDirectory);
    fs.mkdirSync(buildDirectory);
};

exports.setupLocalSourceOverrides = function setupLocalSourceOverrides(
    cliArgs,
    originalConfiguration
) {
    let result = originalConfiguration;

    if (cliArgs.jutroPath) {
        result = merge(originalConfiguration, localSourceConfiguration);
    }

    return result;
};

exports.setupLocalConfigurationOverrides = function setupLocalConfigurationOverrides(
    cliArgs,
    originalConfiguration,
    applicationContext
) {
    let result = originalConfiguration;

    if (cliArgs.webpackOverridePath) {
        const webpackOverridePath = path.resolve(
            path.join(applicationContext, cliArgs.webpackOverridePath)
        );
        const overrideConfiguration = require(webpackOverridePath);

        result = merge(originalConfiguration, overrideConfiguration);
    }

    return result;
};

exports.saveJson = function saveJson(applicationContext, filename, data) {
    logger.log(`Writing File: ${filename}`);
    try {
        fs.writeFileSync(
            path.resolve(
                path.join(applicationContext, 'dist', 'build', filename)
            ),
            JSON.stringify(data),
            { recursive: true }
        );
    } catch (error) {
        logger.log(`Error: ${error}`);
    }
};
