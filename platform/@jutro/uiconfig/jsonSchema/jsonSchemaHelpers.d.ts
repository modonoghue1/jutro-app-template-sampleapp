/**
 * Extract a subset of elements from a schema
 *
 * @param {object} schema - source JSON schema for extraction
 * @param {string} targetDefinition - definition key to extract
 * @param {object} schemaProps - additional props to add to top schema element (eg. $id, title, description)
 * @returns {object} reduced JSON schema
 */
export function extractSubSchema(schema: object, targetDefinition: string, schemaProps: object): object;
/**
 * Generate uiMetadata using dataProps from json schema.
 * Expect to call JsonFormValidator's 'dataProps()' method and pass the results here
 *
 * @param {object} dataProps - data props extracted from schema
 * @param {object} [contentLayout] - layout metadata for content
 * @returns {Array<any>} array of uiMetadata to pair with dataProps for rendering
 */
export function generateUIFromSchema(dataProps: object, contentLayout?: object): Array<any>;
