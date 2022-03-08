export default class SchemaValidator {
    /**
     * SchemaValidator
     * @param {Record<string, any>} schema
     */
    constructor(schema: Record<string, any>, ajvOptions?: {
        allErrors: boolean;
    });
    ajv: Ajv.Ajv;
    validator: Ajv.ValidateFunction;
    /**
     * returns string with unique errors
     *
     * @returns {string} unique errors in human readable form, one per line
     */
    getUniqueErrors(): string;
    validate(data: any): {
        valid: boolean | PromiseLike<any>;
        errorMessages: string | undefined;
    };
}
import Ajv from "ajv";
