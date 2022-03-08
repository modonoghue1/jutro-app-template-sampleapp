import { HttpRequest } from './HttpRequest';
import { Options, Handlers } from './common';
export declare enum REQUEST_HANDLER_TYPE {
    AUTH = "onAuth",
    FETCH = "onFetch",
    ENCODE = "onEncode",
    ERROR = "onErrorResponse",
    EXCEPTION = "onException",
    RESPONSE = "onResponse",
    TRACE = "onTrace"
}
/**
 * Extensible wrapper around 'fetch' for making REST calls
 * - Provide an array of 'option' resolvers to inject options and headers into the request
 * - Provide encoders/decoders to transform the data sent and the data received
 * - Provide callbacks to monitor request -> response -> exception flow
 * - FIX: Override 'fetch' itself?
 *
 * @example
 *   const requestBuilder = HttpRequestBuilder()
 *      .addOptions(options)
 *      .addHandler(handler)
 *   const restService = requestBuilder.build();
 *   const results = await restService.get('http://url', { page: 3 });
 */
export declare class HttpRequestBuilder {
    baseUrl: string;
    options: Array<Options>;
    handlers: Array<Handlers>;
    constructor(baseUrl?: string);
    addOptions: (options: Options) => HttpRequestBuilder;
    addHandler: (event: Handlers | string, callback?: Handlers[keyof Handlers]) => HttpRequestBuilder;
    build: () => HttpRequest;
}
