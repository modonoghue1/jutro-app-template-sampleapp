/**
 * Sets up API accessor based on the given schema data
 *
 * @param {object} schema - Schema object defining what operations can be performed for the associated data model
 * @param {string} target - Target URL
 * @param {object} restService - Instance of rest service (e.g. from @jutro/transport)
 * @returns {object} - API helper for accessing the service based on given schema
 *
 * @deprecated
 */
export function extractAPIFromSchema(schema: object, target: string, restService: object): object;
