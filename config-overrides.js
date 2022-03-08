const { configureConfigOverrides } = require('@jutro/overrides');

const configItems = require('./configItems');

module.exports = configureConfigOverrides({ configItems });
