#!/usr/bin/env node
const cliArgs = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const utilities = require('./webpack/utilities');
let developmentConfiguration = require('./webpack/webpack.dev');
const logger = require('./webpack/logger');

const applicationContext = process.cwd() || null;

function initialize() {
    cleanBuildDirectory();
    manageConfigurationOverrides();
    saveBuildConfiguration();

    logger.prettyPrintObject('Webpack Configuration', developmentConfiguration);

    runWebpack();
}

function cleanBuildDirectory() {
    utilities.cleanBuildDirectory(applicationContext);
}

function manageConfigurationOverrides() {
    developmentConfiguration = utilities.setupLocalSourceOverrides(
        cliArgs,
        developmentConfiguration
    );
    developmentConfiguration = utilities.setupLocalConfigurationOverrides(
        cliArgs,
        developmentConfiguration,
        applicationContext
    );
}

function saveBuildConfiguration() {
    utilities.saveJson(
        applicationContext,
        'webpackConfiguration.json',
        developmentConfiguration
    );
}

function runWebpack() {
    const compiler = webpack(developmentConfiguration);
    const devServerOptions = developmentConfiguration.devServer;
    const server = new WebpackDevServer(compiler, devServerOptions);
    const serverProtocol = devServerOptions.https ? 'https' : 'http';
    const serverHost = devServerOptions.host;
    const serverPort = devServerOptions.port;
    const serverUrl = `${serverProtocol}://${serverHost}:${serverPort}`;

    server.listen(devServerOptions.port, devServerOptions.host, () => {
        logger.log(`Starting server on ${serverUrl}`);
    });
}

initialize();
