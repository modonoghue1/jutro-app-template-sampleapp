require('dotenv/config');

const { getBaseConfig, getFullConfig } = require('./utils');
const runtAuditsTestFlow = require('./testAudits');

module.exports = {
    runLighthouseAudits: async ({
        config: configPath,
        headless,
        includePages,
        excludePages,
    }) => {
        const baseConfig = getBaseConfig(configPath);

        const config = getFullConfig(baseConfig);

        return runtAuditsTestFlow({
            config,
            headless,
            includePages,
            excludePages,
        });
    },
};
