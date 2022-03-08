/**
 * Uses metadata to validate a field
 *
 * @param {object} metadata - metadata for a field
 * @returns {boolean} true if field is valid
 */
export function validateFieldUsingMetadata(metadata: object): boolean;
/**
 * Uses metadata to validate fields in nested content
 *
 * @deprecated
 *
 * @param {object} contentMetadata - metadata for content; should be an array or contain 'content' array
 * @param {object} overrideProps - overrides to apply to metadata
 * @param {object} resolvers - resolver functions and maps to expand/update metadata
 * @param {Object} [rootMetadata={}] - root metadata to provide context for resolving full content (using refs)
 * @param {boolean} [skipHidden=true] - skip hidden content in results
 * @returns {boolean} true if content is valid
 */
export function validateContentFromMetadata(contentMetadata: object, overrideProps: object, resolvers: object, rootMetadata?: any, skipHidden?: boolean | undefined): boolean;
/**
 * Uses metadata to validate fields in nested content and returns metadata of invalid fields
 *
 * @param {object} contentMetadata - metadata for content; should be an array or contain 'content' array
 * @param {object} overrideProps - overrides to apply to metadata
 * @param {object} resolvers - resolver functions and maps to expand/update metadata
 * @param {Object} [rootMetadata={}] - root metadata to provide context for resolving full content (using refs)
 * @param {boolean} [skipHidden=true] - skip hidden content in results
 * @returns {Array<any>} metadata of invalid fields
 *
 * @example
 */
export function findInvalidFieldsFromMetadata(contentMetadata: object, overrideProps: object, resolvers: object, rootMetadata?: any, skipHidden?: boolean | undefined): Array<any>;
