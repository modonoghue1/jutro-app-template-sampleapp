import React from 'react';
import PropTypes from 'prop-types';
declare global {
    interface Window {
        __TEST__: boolean;
        __DEV__: boolean;
    }
}
export declare type TagType = keyof React.ReactHTML | React.ReactType;
export declare type InferPotentiallyDangerousPropsWithTag<T> = PropTypes.InferProps<T> & {
    tag?: TagType;
    dangerouslySetInnerHTML?: {
        __html: string;
    };
};
export declare type BreakpointType = 'phone' | 'phoneWide' | 'tablet';
export declare type DeviceType = BreakpointType | 'desktop';
export declare type Breakpoints = Record<BreakpointType, number>;
