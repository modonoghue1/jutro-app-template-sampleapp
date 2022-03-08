const {
    modifyStyleLoaderRules,
    modulesOverride,
} = require('./styleOverrideRules');
const loaders = require('./loaders');

module.exports = {
    modifyStyleLoaderRules,
    loaders,
    modulesOverride,
};
