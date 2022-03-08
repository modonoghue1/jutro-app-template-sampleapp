const configProvider = require('./configProvider');
const configKeys = require('./configKeys');

module.exports = {
    ...configProvider,
    ...configKeys,
};
