/** @typedef {{ id: string, defaultMessage: string, description: string }} Id */
/**
 * Extracts ids from object with i18n messages
 * @param {Record<object, any>} obj object to traverse
 * @returns {Id[]} array of i18n message keys
 */
export function traverseAndExtracti18nMessageIds(obj: Record<object, any>): Id[];
export type Id = {
    id: string;
    defaultMessage: string;
    description: string;
};
