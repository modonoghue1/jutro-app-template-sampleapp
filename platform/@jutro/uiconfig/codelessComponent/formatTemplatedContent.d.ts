/**
 * Resolves information needed for inserting metadata content templated with pre-rendered react nodes
 * (children) into given ui-metadata structure, based on the provided path
 *
 * @param {object} template - parametrized ui-metadata structure
 * @param {string} path - target path within template ui-metadata where nodes should be inserted
 * @param {[]} children - pre-rendered react nodes to be inserted
 *
 * @returns {object} - templated content and path, at which it should be inserted
 */
export function formatTemplatedContent(template: object, path: string, children: []): object;
