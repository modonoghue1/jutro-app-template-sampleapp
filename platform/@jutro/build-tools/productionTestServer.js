const express = require('express');
const compression = require('compression');
const fallback = require('express-history-api-fallback');
const _ = require('lodash');
const path = require('path');
const proxy = require('http-proxy-middleware');
const devServerConfig = require('./webpack/config/devServerConfig');
const logger = require('./webpack/logger');

const applicationContext = process.cwd() || null;
const proxyConfig = devServerConfig.getProxyConfiguration();

const app = express();

app.use(
    compression({
        threshold: 0,
    })
);

const deployDirectory = path.resolve(path.join(applicationContext, 'dist'));

_.each(proxyConfig, (proxyUrl, pathToProxy) => {
    logger.log(`Proxy created: ${pathToProxy} -> ${proxyUrl}${pathToProxy}`);
    app.use(pathToProxy, proxy({ target: proxyUrl, changeOrigin: true }));
});

app.use(express.static(deployDirectory));
app.use(fallback('index.html', { root: deployDirectory }));

app.listen(3000);
logger.log(`Production Test Server Started on port 3000`);
