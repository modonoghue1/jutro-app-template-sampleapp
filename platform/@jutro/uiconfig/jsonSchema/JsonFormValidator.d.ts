/**
 * Replace message params (eg. 'text {myparam} more text') with values.
 *
 * @param {string} message - string with params to be parsed and replaced
 * @param {object} values - values of params to be replaced
 * @returns {string} - updated message string
 */
export function substituteMessageParams(message: string, values: object): string;
/**
 * JSON form validator
 *
 * This class can be used to validate json data against a schema and extract data props for
 * use with form rendering.
 *
 * @param {Function} [resolveDataType] - callback to resolve schema datatype; returns { datatype, component, otherProps }
 *
 */
export default class JsonFormValidator {
    constructor({ dataSchemaExtension, options, ValidationService }?: {
        dataSchemaExtension: any;
        options: any;
        ValidationService: any;
    });
    validationService: any;
    validator: any;
    customMessages: {};
    definitions: {};
    dataSchemaExtension: any;
    /**
     * Use schema to validate json data; if invalid, errorText() or errorMessagesByPath()
     * can be called to find out why.
     *
     * @param {object} schema - schema to extract data props from
     * @param {object} data - data to be used with the schema to determine data props
     * @returns {boolean} true if valid; false if invalid
     */
    validate(schema: object, data: object): boolean;
    /**
     * Extract error messages (grouped by full path) from recent validation
     *
     * @returns {object|undefined} map of full path to error messages
     */
    errorMessagesByPath(): object | undefined;
    /**
     * Extract error text from recent validation
     *
     * @returns {string} error text
     */
    errorText(): string;
    /**
     * Extract data props from schema for use with form metadata
     *
     * @param {object} schema - schema to extract data props from
     * @param {object} data - data to be used with the schema to determine data props
     * @param {Function} [resolveDataType] - callback to resolve schema datatype; returns { datatype, component, otherProps }
     * @param {object} [overrideDataProps={}] - override default data props
     * @returns {object} data props to include in form metadata rendering
     */
    dataProps(schema: object, data: object, resolveDataType?: Function | undefined, overrideDataProps?: object): object;
    components: any;
    /**
     * Find a reference
     *
     * @param {string} ref - reference path
     * @returns {object} definition at reference path
     */
    findReference(ref: string): object;
    /**
     * Resolve schema reference ($ref) in place
     *
     * @param {object} schema - json schema
     * @returns {object} schema with resolved reference
     */
    resolveReference(schema: object): object;
    /**
     * Extract message from error; apply custom message if available
     *
     * @param {object} error - error object from ajv validation
     * @param {string} path - full path to
     * @returns {Array<any>} error message array for path
     */
    getErrorMessage(error: object, path: string): Array<any>;
    /**
     * Extract data type from schema item
     *
     * @param {object} schemaItem - item from schema
     * @param {object} schemaItemProps - other props for schemaItem
     * @param {Function} [resolveDataType] - callback to resolve schema datatype; returns { datatype, component, otherProps }
     * @returns {object} datatype and other props (eg. availableValues)
     */
    getDataType(schemaItem: object, schemaItemProps: object, resolveDataType?: Function | undefined): object;
    /**
     * Extract 'required' setting from schema
     *
     * @param {string} key - data 'key' in schema
     * @param {object} required - schema 'required' json
     * @param {object} dependencies  - schema 'dependencies' json
     * @param {string} basePath - base path to use when calculating full path
     * @param {object} data - data to be used with the schema to determine data props
     * @returns {boolean} is key required
     */
    getIsRequired(key: string, required: object, dependencies: object, basePath: string, data: object): boolean;
    /**
     * Process schema to extract data props
     *
     * @param {object} schema - schema to extract data props from
     * @param {object} data - data to be used with the schema to determine data props
     * @param {object} dataProps - object to populate with extracted data props
     * @param {Function} [resolveDataType] - callback to resolve schema datatype; returns { datatype, component, otherProps }
     * @param {object} [basePath] - base path to use when calculating full path
     * @param {boolean} [hiddenByDependency] - should the data props be hidden because of dependency
     */
    processDataProps(schema: object, data: object, dataProps: object, resolveDataType?: Function | undefined, basePath?: object, hiddenByDependency?: boolean | undefined): void;
}
