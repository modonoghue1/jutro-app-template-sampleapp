import { HttpRequestBuilder } from './HttpRequestBuilder';
import { HttpRequest } from './HttpRequest';
export declare function createHttpRequest(baseUrl: string, build: false): HttpRequestBuilder;
export declare function createHttpRequest(baseUrl: string, build: true): HttpRequest;
export declare function createHttpRequest(baseUrl: string): HttpRequestBuilder;
/**
 *  Legacy implementation bound to application/json content type.
 */
export declare function createJsonHttpRequest(baseUrl: string, build: false): HttpRequestBuilder;
export declare function createJsonHttpRequest(baseUrl: string, build: true): HttpRequest;
export declare function createJsonHttpRequest(baseUrl: string): HttpRequest;
