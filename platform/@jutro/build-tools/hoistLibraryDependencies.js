const { readdirSync, readFileSync } = require('fs');
const { spawn, exec } = require('child_process');
const path = require('path');
const { each, assign, pickBy } = require('lodash');
const cliArgs = require('minimist')(process.argv.slice(2));
const logger = require('./webpack/logger');

const applicationContext = process.cwd() || null;

const jutroLibraryPath = path.resolve(path.join(cliArgs.jutroPath));

let libraryDependencies = {};

function initialize() {
    const libraryModuleList = listChildDirectories(jutroLibraryPath);

    libraryDependencies = buildLocalDependencyMap(libraryDependencies);
    buildLibraryDependencyMap(
        jutroLibraryPath,
        libraryModuleList,
        libraryDependencies
    );
    libraryDependencies = filterOutInternalDependencies(libraryDependencies);
    installDependenciesInWorkspace(libraryDependencies);
}

function listChildDirectories(source) {
    return readdirSync(source, { withFileTypes: true })
        .filter(result => result.isDirectory())
        .map(result => result.name);
}

function buildLocalDependencyMap(dependencyMap) {
    const filename = path.resolve(path.join('package.json'));
    const rawFileData = readFileSync(filename);
    const packageDetails = JSON.parse(rawFileData, null, 2);

    return assign(
        dependencyMap,
        packageDetails.dependencies,
        packageDetails.devDependencies
    );
}

function buildLibraryDependencyMap(libraryPath, moduleList, dependencyMap) {
    each(moduleList, moduleName => {
        const filename = path.resolve(
            path.join(libraryPath, moduleName, 'package.json')
        );
        const rawFileData = readFileSync(filename);
        const packageDetails = JSON.parse(rawFileData, null, 2);

        // eslint-disable-next-line no-param-reassign
        dependencyMap = assign(
            dependencyMap,
            packageDetails.dependencies,
            packageDetails.devDependencies
        );
    });
}

function filterOutInternalDependencies(dependencyMap) {
    return pickBy(
        dependencyMap,
        (dependencyVersion, dependencyName) =>
            dependencyName.indexOf('@jutro/') === -1
    );
}

function linkInternalModule(moduleName) {
    exec(
        `npm link @jutro/${moduleName}`,
        { cwd: applicationContext },
        (error, stderr, stdout) => {
            if (error) {
                logger.log(`ERROR MESSAGE ${error.message}`);
                logger.log(`ERROR STACK ${error.stack}`);
                process.exit(1);
            } else {
                logger.log(stdout.toString().trim());
                logger.log(`NPM Link @jutro/${moduleName} Complete`);
            }
        }
    );
}

function installDependenciesInWorkspace(dependencyMap) {
    // dont forget trailing space
    let installCommand =
        'install --no-save --ignore-scripts --no-optional --no-audit ';

    each(dependencyMap, (dependencyVersion, dependencyName) => {
        installCommand += `${dependencyName}@${dependencyVersion} `;
    });

    const npmTaskCommand = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
    const npmTaskSpawn = spawn(npmTaskCommand, installCommand.split(' '));
    logger.log(`Running ${installCommand}`);

    process.on('exit', () => {
        logger.log(`parent process exited so killing child process`);
        npmTaskSpawn.kill();
    });

    npmTaskSpawn.stdout.on('data', data => {
        logger.log(data.toString());
    });

    npmTaskSpawn.stderr.on('data', data => {
        logger.log(data.toString());
    });

    npmTaskSpawn.on('error', err => {
        logger.log('Failed to start subprocess.');
        logger.log(err);
    });

    npmTaskSpawn.on('close', code => {
        if (code !== 0) {
            logger.log(`Error(${code}) \n`);
            process.exit(code);
        }

        logger.log(`child process exited with code ${code}`);
        logger.log(`✓ Closing child process - \n`);

        linkInternalModule('build-tools');
        linkInternalModule('i18n-tools');

        npmTaskSpawn.kill();
    });
}

initialize();
