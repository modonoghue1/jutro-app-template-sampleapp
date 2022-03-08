const { get } = require('lodash');

/**
 * Extract target definition from schema
 *
 * @param {object} schema - source JSON schema for extraction
 * @param {string} targetDefinition - definition key to extract
 * @returns {object} JSON schema snippet
 */
function extractTargetDefinition(schema, targetDefinition) {
    const isOpenAPI = !!schema.openapi;
    const adjustedTarget = targetDefinition.replace(/\//g, '~1');

    let newSchema;

    if (isOpenAPI) {
        newSchema = get(schema.components.schemas, adjustedTarget);
    } else {
        newSchema = get(schema.definitions, adjustedTarget);
    }

    return newSchema;
}

module.exports = { extractTargetDefinition };
