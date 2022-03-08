/* eslint-disable no-console */

const { resolve } = require('path');
const { promises } = require('fs');
const { spawn } = require('child_process');
const {
    pipe,
    get,
    getOr,
    last,
    split,
    identity,
    mergeWith,
    merge,
    isPlainObject,
} = require('lodash/fp');

const { writeFile } = promises;

const getLhRcFilename = () => '.lighthouserc.json';

const pipePromises = (...fns) => input =>
    fns.reduce((acc, fn) => acc.then(fn), Promise.resolve(input));

const resolveAppPath = (...path) => resolve(process.cwd(), ...path);

const getReportPath = config =>
    getOr('./', 'lighthouseConfig.upload.outputDir', config);

const resolveToolPath = (...path) => resolve(__dirname, ...path);

const optionalUpdate = (condition, fn) => (condition ? fn : identity);

const normalizeUrl = (baseUrl, ...paths) =>
    paths.reduce((acc, path) => {
        if (acc.endsWith('/') && path.startsWith('/')) {
            return acc.concat(path.substr(1));
        }

        if (!acc.endsWith('/') && !path.startsWith('/')) {
            return acc.concat('/').concat(path);
        }

        return acc.concat(path);
    }, baseUrl);

// adding last line when writing a new file based on our prettier requirements
// for other styling requirements the file might be styled manually
// e.g more than 2 spaces indentation or ends with empty line
const adjustLastLine = str => (str.endsWith('\n') ? str : str.concat('\n'));

const writeToFile = (path, data) =>
    writeFile(path, adjustLastLine(JSON.stringify(data, null, 2)));

const getBaseEnvVar = pipe(split('.'), last, get);

const parseBaseUrl = url =>
    url.match(/^process.env.*/) ? getBaseEnvVar(url)(process.env) : url;

const getConfigPath = configPath => configPath ?? getLhRcFilename();

const getExtendedConfig = extensionPath =>
    require(resolveAppPath(extensionPath));

const getBaseConfig = configPath =>
    require(resolveAppPath(getConfigPath(configPath)));

const mergeConfigItems = (value, srcValue) => {
    if (Array.isArray(value)) {
        return value.concat(srcValue);
    }

    if (isPlainObject(value)) {
        return merge(value, srcValue);
    }

    return value;
};

const extendConfig = config =>
    mergeWith(mergeConfigItems, config, getExtendedConfig(config.extend));

const getFullConfig = config => (config.extend ? extendConfig(config) : config);

const runCommand = ({ command, alwaysResolve }) =>
    new Promise((resolvePromise, reject) => {
        const [cmd, ...args] = command.split(' ');

        try {
            const res = spawn(cmd, args, {
                env: process.env,
                cwd: process.cwd(),
                stdio: 'pipe',
                shell: true,
            });

            res.stdout.on('data', data => console.log(data.toString()));

            res.on('exit', code => {
                let successMessages = '';

                res.stdout.on('data', data => {
                    successMessages = data.toString();
                });

                if (code === 0 || alwaysResolve) {
                    resolvePromise(successMessages);
                }

                res.stderr.on('data', data => {
                    const stringData = data.toString();
                    console.log(stringData);
                    reject(stringData);
                });
            });

            res.on('error', reject);
        } catch (error) {
            reject(error);
        }
    });

module.exports = {
    pipePromises,
    resolveAppPath,
    resolveToolPath,
    optionalUpdate,
    normalizeUrl,
    writeToFile,
    parseBaseUrl,
    getLhRcFilename,
    getConfigPath,
    getReportPath,
    getExtendedConfig,
    getBaseConfig,
    getFullConfig,
    runCommand,
};
