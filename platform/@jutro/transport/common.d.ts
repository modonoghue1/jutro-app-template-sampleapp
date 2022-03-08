import { JUTRO_TOPICS } from '@jutro/events';
export declare type Header = Record<string, string>;
export declare type Options = {
    headers?: Header;
    body?: BodyInit;
    method?: string;
};
export declare enum HttpEventTypes {
    request = "request",
    response = "response",
    error = "error",
    exception = "exception"
}
export declare type Handlers = {
    onAuth?: () => Promise<Header>;
    onResponse?: (response: Response) => Promise<any>;
    onErrorResponse?: (response: Response) => Promise<any>;
    onException?: (error: Error) => Promise<any>;
    onTrace?: (event: HttpEventTypes, payload: Record<string, unknown>) => void;
    onEncode?: (data: Record<string, unknown> | BodyInit, options: Options) => BodyInit;
    onFetch?: (url: string, options: Options, fetchCall?: typeof fetch) => Promise<Response>;
};
export declare const eventTopicMap: Record<HttpEventTypes, JUTRO_TOPICS>;
export declare const JSON_CONTENT_TYPE = "application/json";
export declare const BLOB_CONTENT_TYPE = "application/octet-stream";
export declare const CONTENT_TYPE = "Content-Type";
