/**
 * Retrieve the version to migrate to based on param passed in, or by
 * prompting the user
 *
 * @param {string} toVersionParam
 * @param {Array<object>} allAvailableSnapshots
 * @returns {string} - chosen migration version
 */
export function getChosenVersion(toVersionParam: string, allAvailableSnapshots: Array<object>): string;
