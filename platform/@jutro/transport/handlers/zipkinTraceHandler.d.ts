import { Options } from '../common';
/**
 * Make a trace options extension that can be used with jutro-transport
 *
 * @param {string} [remoteServiceName] - Remote service name for tracer
 * @param {string} [localServiceName] - Local service name for tracer
 * @param {string} [zipkinUrl] - zipkin server addres for batch recorder use
 * @param {boolean} [debug] - use console recorder instead of batch recorder
 * @param {function} [fetchCall] - custom fetch call to wrap (defaults to global fetch)
 * @returns {Record<string, any>} trace options extension
 */
export declare function zipkinTraceHandler(remoteServiceName: string, localServiceName: string, zipkinUrl: string, debug: boolean, fetchCall?: typeof fetch): {
    onFetch: (url: string, options: Options, theFetch?: typeof fetch) => Promise<Response>;
};
