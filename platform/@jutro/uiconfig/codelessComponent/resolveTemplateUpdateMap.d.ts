/**
 * Resolves ui-metadata template update map, given parametrized ui-metadata object.
 * Traverses the ui-metadata tree to discover variables placeholders and produces the mapping
 * between variables names and arrays of paths within that given ui-metadata, where these variables
 * should further be replaced with their corresponding values from components' instances
 *
 * @param {object} componentTemplate - parametrized ui-metadata structure
 *
 * @returns {object} - Mapping between variables names and arrays of paths within the given structure, where these variables reside
 */
export function resolveTemplateUpdateMap(componentTemplate: object): object;
export const DYNAMIC_INDEX_REGEX: RegExp;
export function wrapDynamicIndex(index: any): string;
