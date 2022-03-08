import { HttpEventTypes } from '../common';
export declare const analyticsHandler: {
    onTrace: (event: HttpEventTypes, payload: Record<string, unknown>) => void;
};
