/**
 * Resolve any references that a metadata item may have.
 *
 * @param {Record<string, any>} item - metadata that may or may not have references
 * @param {Record<string, any>} rootMetadata - root metadata for resolving references
 * @returns {Record<string, any>} merged metadata for item
 */
export function resolveContentReference(item: Record<string, any>, rootMetadata: Record<string, any>): Record<string, any>;
/**
 * Combines metadata when one item '@ref' another.
 *
 * @param {Record<string, any>} targetItem - metadata for target item; can be 'undefined' if not target item to extend
 * @param {string} refKey - key for source item
 * @param {Record<string, any>} rootMetadata - root metadata for resolving references
 * @returns {Record<string, any>} merged metadata for item
 */
export function extendMetadata(targetItem: Record<string, any>, refKey: string, rootMetadata: Record<string, any>): Record<string, any>;
