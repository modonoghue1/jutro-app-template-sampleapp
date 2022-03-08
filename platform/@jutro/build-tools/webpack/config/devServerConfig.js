const path = require('path');
const cliArgs = require('minimist')(process.argv.slice(2));

const applicationContext = process.cwd() || null;
const csp =
    "default-src 'none'; base-uri 'self'; script-src 'self' 'unsafe-eval'; worker-src 'self' blob:; connect-src 'self' ws://localhost:8991; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; media-src 'self'; object-src 'self'; frame-src 'self' www.bing.com; frame-ancestors 'self'; plugin-types application/pdf; report-uri /contentSecurityPolicyReport;";
const logger = require('../logger');

function setupProxyUrl() {
    const proxyOverrideUrl = cliArgs.proxy || '';
    const isProxyOverrideEnabled = proxyOverrideUrl.length > 0;
    let proxyUrl;

    if (isProxyOverrideEnabled) {
        proxyUrl = proxyOverrideUrl;
    } else {
        proxyUrl = 'http://localhost:8080';
    }

    return proxyUrl;
}

function generateProxyConfiguration() {
    const proxyUrl = setupProxyUrl();

    logger.log('Setting up Proxy');
    logger.log(`Proxy Url Configured: ${proxyUrl}`);

    return {
        '/rest': proxyUrl,
        '/xml': proxyUrl,
    };
}

exports.generateDevServerConfig = function generateDevServerConfig() {
    const result = {
        contentBase: path.join(applicationContext, 'dist'),
        historyApiFallback: true,
        publicPath: '',
        port: 3000,
        host: '0.0.0.0',
        hot: true,
        https: false,
        overlay: {
            warnings: true,
            errors: true,
        },
        headers: {
            'Content-Security-Policy-Report-Only': csp,
            'X-Content-Security-Policy': csp,
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'SAMEORIGIN',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'no-referrer',
        },
        proxy: generateProxyConfiguration(),
    };
    return result;
};

exports.getProxyConfiguration = function getProxyConfiguration() {
    return generateProxyConfiguration();
};
