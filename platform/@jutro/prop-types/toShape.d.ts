import { WeakValidationMap, Requireable } from 'react';
import { IntlMessageShape } from './intlMessageShape';
export declare type RouterLocation = {
    /**
     * Link path
     */
    pathname?: string;
    /**
     * Query parameters
     */
    search?: string;
    /**
     * Hash to put in the URL
     */
    hash?: string;
    /**
     * State to persist to the location
     */
    state?: Record<string, unknown>;
};
export declare type IntlRouterLocation = Pick<RouterLocation, 'search' | 'state'> & {
    /**
     * Link path
     */
    pathname?: IntlMessageShape;
    /**
     * Hash to put in the URL
     */
    hash?: IntlMessageShape;
};
/**
 * A location to redirect to
 */
export declare type ToShape = string | RouterLocation;
/**
 * A location to redirect to, allowing internationalized paths
 */
export declare type IntlToShape = IntlMessageShape | IntlRouterLocation;
export declare const location: WeakValidationMap<RouterLocation>;
export declare const intlLocation: WeakValidationMap<IntlRouterLocation>;
export declare const toShape: Requireable<ToShape>;
export declare const intlToShape: Requireable<IntlToShape>;
export declare const isIntlToShapeLocation: (to: IntlToShape | undefined) => to is IntlRouterLocation;
