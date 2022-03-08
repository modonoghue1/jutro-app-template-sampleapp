export declare type JsonPrimitive = string | number | boolean | null;
export interface JsonMap extends Record<string, JsonPrimitive | JsonArray | JsonMap> {
}
export interface JsonArray extends Array<JsonPrimitive | JsonArray | JsonMap> {
}
