const fs = require('fs');
const path = require('path');
const logger = require('../webpack/logger');

const requiredDependencyList = [
    path.join('src', 'assets'),
    path.join('src', 'index.js'),
    path.join('src', 'Components'),
    path.join('src', 'Pages'),
];

const workingDirectory = process.cwd();

const hasFileSystemDependency = function hasFileSystemDependency(
    relativeDependencyPath,
    callback
) {
    const absoluteDependencyPath = path.resolve(
        path.join(workingDirectory, relativeDependencyPath)
    );

    fs.stat(absoluteDependencyPath, err => {
        if (err) {
            callback(err);
        } else {
            callback(null, true);
        }
    });
};

const hasDependency = function hasDependency(pathName) {
    hasFileSystemDependency(pathName, error => {
        if (error) {
            logger.log(
                `Project Validation Error: '${pathName}' Your changes are not in line with the recommended naming conventions. Using the recommended naming conventions makes future upgrades easier. To learn about the naming conventions, go to https://jutro.guidewire.com/docs/next/relnotes/u103#good-practices-nice-to-have or check your application documentation.`
            );
        } else {
            logger.log(`Project Validation Success: ${pathName}`);
        }
    });
};

requiredDependencyList.forEach(hasDependency);
