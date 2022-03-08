#!/usr/bin/env node
const webpack = require('webpack');
const cliArgs = require('minimist')(process.argv.slice(2));
const utilities = require('./webpack/utilities');
let productionConfiguration = require('./webpack/webpack.prod');
const logger = require('./webpack/logger');

const applicationContext = process.cwd() || null;

function initialize() {
    cleanBuildDirectory();
    manageConfigurationOverrides();
    saveBuildConfiguration();
    runWebpack();
}

function cleanBuildDirectory() {
    utilities.cleanBuildDirectory(applicationContext);
}

function manageConfigurationOverrides() {
    productionConfiguration = utilities.setupLocalSourceOverrides(
        cliArgs,
        productionConfiguration
    );
    productionConfiguration = utilities.setupLocalConfigurationOverrides(
        cliArgs,
        productionConfiguration,
        applicationContext
    );
}

function saveBuildConfiguration() {
    utilities.saveJson(
        applicationContext,
        'webpackConfiguration.json',
        productionConfiguration
    );
}

function runWebpack() {
    webpack(productionConfiguration, onBuildComplete);
}

function onBuildComplete(err, stats) {
    if (err) {
        logger.log(`Error: ${err.error.details}`);
        logger.log(`ErrorStack: ${err.error.stack}`);
    } else if (stats) {
        if (stats.hasErrors()) {
            const compilationErrorStack = stats.compilation.errors.toString();
            logger.log(`Compilation Error: ${compilationErrorStack}`);
        } else {
            const buildOptions = {
                all: true,
                assets: true,
                builtAt: true,
                cached: true,
                cachedAssets: true,
                children: true,
                chunks: true,
                chunkGroups: true,
                chunkModules: true,
                chunkOrigins: true,
                source: true,
                entrypoints: true,
                depth: true,
                env: true,
                warnings: true,
                errors: true,
                errorDetails: true,
                usedExports: true,
                providedExports: true,
                optimizationBailout: true,
                publicPath: false,
                context: applicationContext,
                reasons: true,
                logging: true,
                exclude: false,
                maxModules: Infinity,
            };
            const buildStats = stats.toJson(buildOptions);

            utilities.saveJson(
                applicationContext,
                'buildStats.json',
                buildStats
            );

            logger.log(
                stats.toString({
                    colors: true,
                })
            );

            const buildDuratiion = `${parseInt(
                buildStats.time / 1000 / 60,
                10
            )} : ${parseInt((buildStats.time / 1000) % 60, 10).toFixed(2)}`;
            logger.log(`Build Completed: ${buildDuratiion}`);
        }
    }
}

function findModule(buildStats, search) {
    return buildStats.modules.filter(
        module => module.name.indexOf(search) !== -1
    );
}

// eslint-disable-next-line
function findJavascriptModule(buildStats, search) {
    const broadSearchList = findModule(search);

    return broadSearchList.filter(module => {
        const isNotSassFile = module.name.indexOf('.scss') === -1;
        const isNotCssFile = module.name.indexOf('.css') === -1;
        return isNotSassFile && isNotCssFile;
    });
}

// eslint-disable-next-line
function findWarning(buildStats, search) {
    return buildStats.warnings.filter(
        warning => warning.indexOf(search) !== -1
    );
}

initialize();
