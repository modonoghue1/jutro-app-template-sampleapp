import { HttpTransport } from './HttpTransport';
import { Options, Handlers } from './common';
/**
 * HttpRequest class
 */
export declare class HttpRequest {
    baseUrl: string;
    defaultOptions?: Options;
    transport: HttpTransport;
    handlers: Handlers;
    onEncode: (data: Record<string, unknown> | BodyInit, options: Options) => BodyInit;
    constructor(baseUrl: string, defaultOptions?: Options, handlerOverrides?: Handlers);
    /**
     * "GET" request
     *
     * @param {string} url - base url
     * @param {Record<string, any>} params - query params to add to base url
     * @param {Record<string, any>} [optionOverrides] - optional option overrides for simple overrides without having to create a new instance
     * @returns {Promise} fetch promise of request
     */
    get: (url: string, params: {
        [key: string]: string | string[];
    }, optionOverrides?: Options | undefined) => Promise<any>;
    /**
     * "POST" request
     *
     * @param {string} url - base url
     * @param {object} data - data to pass on to post; will be stringified
     * @param {Options} [optionOverrides] - optional option overrides for simple overrides without having to create a new instance
     * @returns {Promise} fetch promise of request
     */
    post: (url: string, data: Record<string, unknown> | BodyInit, optionOverrides?: Options | undefined) => Promise<any>;
    /**
     * "PUT" request
     *
     * @param {string} url - base url
     * @param {Record<string, any>} data - data to pass on to post; will be stringified
     * @param {Record<string, any>} [optionOverrides] - optional option overrides for simple overrides without having to create a new instance
     * @returns {Promise} fetch promise of request
     */
    put: (url: string, data: Record<string, unknown> | BodyInit, optionOverrides?: Options | undefined) => Promise<any>;
    /**
     * "PATCH" request
     *
     * @param {string} url - base url
     * @param {Record<string, any>} data - data to pass on to post; will be stringified
     * @param {Record<string, any>} [optionOverrides] - optional option overrides for simple overrides without having to create a new instance
     * @returns {Promise} fetch promise of request
     */
    patch: (url: string, data: Record<string, unknown> | BodyInit, optionOverrides?: Options | undefined) => Promise<any>;
    /**
     * "DELETE" request
     *
     * @param {string} url - base url
     * @param {Record<string, any>} data - data to pass on to post; will be stringified
     * @param {Record<string, any>} [optionOverrides] - optional option overrides for simple overrides without having to create a new instance
     * @returns {Promise} fetch promise of request
     */
    delete: (url: string, data: Record<string, unknown>, optionOverrides?: Options | undefined) => Promise<any>;
    /**
     * generic 'method' request
     *
     * @param {string} url - base url
     * @param {string} method - method to use; eg 'GET', 'POST'
     * @param {Record<string, any>} data - data to pass on to post; will be stringified
     * @param {Record<string, any>} [optionOverrides] - optional option overrides for simple overrides without having to create a new instance
     * @returns {Promise} fetch promise of request
     */
    request: (url: string, method: string, data?: BodyInit | Record<string, unknown> | undefined, optionOverrides?: Options | undefined) => Promise<any>;
}
