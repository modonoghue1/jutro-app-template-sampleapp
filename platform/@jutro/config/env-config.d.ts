/**
 * Loads the configuration.
 * @param {Record<string, any>} [config] - configuration object
 * @param {Record<string, any>} [params] - map of parameters to be used in mustache substitutions
 * @returns {Record<string, any>} - The configuration
 */
export function loadAndMergeConfiguration(config?: Record<string, any> | undefined, params?: Record<string, any> | undefined): Record<string, any>;
/**
 * Loads the configuration.
 * This function takes baseConfig as an input param--it is recommended that you use the new version of this function that does not take in baseConfig.
 * @param {Record<string, any>} [config] - configuration object
 * @param {Record<string, any>} [params] - map of parameters to be used in mustache substitutions
 * @param {Record<string, any>} [baseConfig] - baseConfig that should be merged with config
 * @returns {Record<string, any>} - The configuration
 */
export function loadConfiguration(config?: Record<string, any> | undefined, params?: Record<string, any> | undefined, baseConfig?: Record<string, any> | undefined): Record<string, any>;
/**
 * Returns the environment-based configuration.
 * @returns {Record<string, any>} - The configuration
 */
export default function getConfiguration(): Record<string, any>;
/**
 * Sets the environment-based configuration.
 * @param {Record<string, any>} config - The configuration
 */
export function setConfiguration(config: Record<string, any>): void;
/**
 * Resolves string values to boolean
 *
 * @param {string} path
 * @param {string} value
 * @param {boolean|string} [defaultValue]
 *
 * @returns {boolean|string}
 */
export function resolveValue(value: string): boolean | string;
/**
 * Returns the value of the configuration corresponding to
 * the object path given.
 * @param {string} path - The object path
 * @param {boolean|string|object|number} [defaultValue] - The default value if no value found at given path
 * @returns {object | string | boolean | number} - The configuration value
 * @throws {Error} - If `required` is true and value if undefined
 */
export function getConfigValue(path: string, defaultValue?: boolean | string | object | number): object | string | boolean | number;
/**
 * Returns the extended value of the configuration corresponding to
 * the object path given.
 * @param {string} path - The object path
 * @param {Record<string, any>} [extension] - The object to be merged into the configuration value
 * @returns {Record<string, any>} - The extended configuration value
 */
export function getAndExtendConfigValue(path: string, extension?: Record<string, any> | undefined): Record<string, any>;
/**
 * Checks if feature is enabled
 * @param {string} path
 * @returns {object}
 */
export function isFeatureEnabled(path: string): object;
