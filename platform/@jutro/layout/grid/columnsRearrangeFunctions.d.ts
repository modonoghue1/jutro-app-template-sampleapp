import React from 'react';
import { GridLayout, GridLayoutProps } from './GridLayout';
export declare type GridLayoutReactElement = React.ReactElement<GridLayoutProps, typeof GridLayout>;
export declare type ColumnsRearrangeChildren = Array<GridLayoutReactElement>;
export interface ColumnsRearrangeFunction {
    (children: ColumnsRearrangeChildren, outputLength: number): ColumnsRearrangeChildren;
}
export declare const mergeColumnsToFirst: ColumnsRearrangeFunction;
export declare const mergeColumnsToLast: ColumnsRearrangeFunction;
export declare const stackColumnsToFirst: ColumnsRearrangeFunction;
export declare const stackColumnsToLast: ColumnsRearrangeFunction;
