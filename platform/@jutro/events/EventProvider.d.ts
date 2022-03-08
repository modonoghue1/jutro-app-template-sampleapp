/// <reference types="node" />
export class EventProvider {
    emitter: events;
    publish: (topic: any, event: any) => void;
    subscribe: (topics: any, handler: any) => any;
    unsubscribe: (handle: any) => void;
    unsubscribeAll: (topics: any) => void;
}
export const subscribe: any;
export const unsubscribe: any;
export const unsubscribeAll: any;
export const publish: any;
import events from "events";
