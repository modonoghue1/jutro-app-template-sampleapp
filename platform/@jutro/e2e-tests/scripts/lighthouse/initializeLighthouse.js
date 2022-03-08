const { existsSync, promises } = require('fs');

const { resolveToolPath, resolveAppPath, getLhRcFilename } = require('./utils');

const { copyFile } = promises;

module.exports = {
    initializeLighthouse: () =>
        new Promise((resolvePromise, reject) => {
            const lhRcFilename = getLhRcFilename();

            const pathToLighthouseRc = resolveAppPath(lhRcFilename);

            if (existsSync(lhRcFilename)) {
                resolvePromise(
                    `Lighthouse configuration file "${pathToLighthouseRc}" already exists.`
                );
                return;
            }

            copyFile(resolveToolPath('defaultConfig.json'), pathToLighthouseRc)
                .then(() =>
                    resolvePromise(
                        'Lighthouse has been initialized with default configurations.'
                    )
                )
                .catch(reject);
        }),
};
