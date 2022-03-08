import { Options, HttpEventTypes, Handlers, Header } from './common';
export declare class HttpTransport {
    onAuth?: () => Promise<Header>;
    onResponse: (response: Response) => Promise<any>;
    onErrorResponse: (response: Response) => Promise<any>;
    onException: (error: Error) => Promise<any>;
    onTrace: (event: HttpEventTypes, payload: Record<string, unknown>) => void;
    onFetch: (url: string, options: Options, fetchCall?: typeof fetch) => Promise<Response>;
    /**
     * HttpTransport: low level transport with handler support
     * plus any callbacks (e.g: 'onTrace(event, payload)', 'onResponse(response)', 'onErrorResponse(error)', 'onException(exception)')
     * @param {Record<string, any>} handlers - handlers to use on fetch; must be provided otherwise raw response and errors are returned
     */
    constructor(handlers: Handlers);
    /**
     * Asynchronous fetch method
     * @param {string} url - url to invoke
     * @param {string} method - method to use; eg 'GET', 'POST'
     * @param {Options} options - options for fetch (eg. 'body', 'headers', 'credentials')
     */
    fetch: (url: string, method: string, opts: Options) => Promise<any>;
}
