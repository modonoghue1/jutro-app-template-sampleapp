import PropTypes from 'prop-types';
import React from 'react';
import { InferPotentiallyDangerousPropsWithTag } from '../types';
export declare const gaps: {
    none: string;
    small: string;
    medium: string;
    large: string;
};
export declare type Gaps = keyof typeof gaps;
declare const alignments: {
    top: string;
    middle: string;
    bottom: string;
    baseline: string;
    stretch: string;
};
export declare type Alignments = keyof typeof alignments;
export declare const gridAlignments: string[];
declare const justifications: {
    left: string;
    center: string;
    right: string;
    around: string;
    between: string;
    evenly: string;
    stretch: string;
};
export declare type Justifications = keyof typeof justifications;
export declare let styleMappings: Record<string, unknown> | null;
export declare type GridProps = InferPotentiallyDangerousPropsWithTag<typeof gridPropTypes>;
/**
 * Renders a css grid. For each grid item, place its children in an Jutro `GridItem`.
 *
 * @metadataType layout
 */
export declare const Grid: React.FC<GridProps>;
export declare const gridPropTypes: {
    /**
     * Define explicit columns widths
     */
    columns: PropTypes.Requireable<(string | number)[]>;
    /**
     * Repeat columns
     */
    repeat: PropTypes.Requireable<string | number>;
    /**
     * Define explicit rows heights
     */
    rows: PropTypes.Requireable<(string | number)[]>;
    /**
     * Define implicit rows
     */
    autoRows: PropTypes.Requireable<any[]>;
    /**
     * Gap between rows and columns ('none', 'small', 'medium', 'large')
     */
    gap: PropTypes.Requireable<string>;
    /**
     * Gap between columns ('none', 'small', 'medium', 'large')
     * If unspecified, will fallback to 'gap' property.
     */
    hgap: PropTypes.Requireable<string>;
    /**
     * Gap between rows ('none', 'small', 'medium', 'large')
     * If unspecified, will fallback to 'gap' property.
     */
    vgap: PropTypes.Requireable<string>;
    /**
     * Vertical align the grid within its container; default - 'stretch'
     */
    valignContent: PropTypes.Requireable<string>;
    /**
     * Justify the grid within its container (left, center, right, around, between, evenly)
     */
    justifyContent: PropTypes.Requireable<string>;
    /**
     * Vertical align all items within the grid; default - 'stretch'
     */
    valignItems: PropTypes.Requireable<string>;
    /**
     * Justify all items within the grid (left, center, right, around, between, evenly)
     */
    justifyItems: PropTypes.Requireable<string>;
    /**
     * Optional dom tag to render
     */
    tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    /**
     * Optional css class(es) to add to the grid tag
     */
    className: PropTypes.Requireable<string>;
    /**
     * Children; preferably 'GridItem'; works with any child
     */
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * DOM element styles
     */
    style: PropTypes.Requireable<object>;
    /**
     * Include any Grid property for use at 'phone' breakpoint
     */
    phone: PropTypes.Requireable<object>;
    /**
     * Include any Grid property for use at 'phoneWide' breakpoint
     */
    phoneWide: PropTypes.Requireable<object>;
    /**
     * Include any Grid property for use at 'tablet' and 'phone' breakpoint;
     */
    tablet: PropTypes.Requireable<object>;
    blockPointerEvents: PropTypes.Requireable<boolean>;
};
export {};
