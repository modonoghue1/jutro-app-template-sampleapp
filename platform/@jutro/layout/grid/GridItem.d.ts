import PropTypes from 'prop-types';
import React from 'react';
import { InferPotentiallyDangerousPropsWithTag } from '../types';
export declare let styleMappings: Record<string, unknown> | null;
declare type GridItemProps = InferPotentiallyDangerousPropsWithTag<typeof gridItemPropTypes>;
/**
 * Defines a css grid 'GridItem'. This is used in conjunction with 'Grid' parent.
 *
 * @param {object} [props] - props for this component
 * @returns {React.ReactElement}
 *
 * @example
 * <GridItem
 *   textAlign="left"
 *   valign="middle"
 *   align="center"
 *   tablet={{ textAlign: 'center' }}
 *   phoneWide={{ textAlign: 'center' }}
 *   phone={{ visible: false }}
 * >
 *   custom content
 * </GridItem>
 *
 * @metadataType layout
 */
export declare const GridItem: React.FC<GridItemProps>;
declare const gridItemPropTypes: {
    /**
     * Render the child without tag wrapper. It passes classNames and styles directly to child element if possible.
     * If not possible, it falls back to wrapping with a tag (for not valid React elements)
     */
    clone: PropTypes.Requireable<boolean>;
    /**
     * If true, item takes full width of parent grid.
     * Ignored if colStart or colSpan is specified.
     */
    fullWidth: PropTypes.Requireable<boolean>;
    /**
     * Specify whether Grid item should be visible
     */
    visible: PropTypes.Requireable<boolean>;
    /**
     * How many rows it takes
     */
    rowSpan: PropTypes.Requireable<string | number>;
    /**
     * Row number to start
     */
    rowStart: PropTypes.Requireable<string | number>;
    /**
     *  How many columns it takes
     */
    colSpan: PropTypes.Requireable<string | number>;
    /**
     * Column number to start
     */
    colStart: PropTypes.Requireable<string | number>;
    /**
     * Horizontally align the contents of the column
     */
    textAlign: PropTypes.Requireable<string>;
    /**
     * Vertically align the column (relative to other columns in the same row). By default the column will be stretched to equal height.
     */
    valign: PropTypes.Requireable<string>;
    /**
     * Align the column. By default the column will be stretched horizontally.
     */
    align: PropTypes.Requireable<string>;
    /**
     * Dom tag to use
     */
    tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    /**
     * Css class(es) to append to tag
     */
    className: PropTypes.Requireable<string>;
    /**
     * Children for this item
     */
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * DOM element styles
     */
    style: PropTypes.Requireable<object>;
    /**
     * Include any GridItem property for use at 'phone' breakpoint
     */
    phone: PropTypes.Requireable<object>;
    /**
     *  Include any GridItem property for use at 'phoneWide' breakpoint
     */
    phoneWide: PropTypes.Requireable<object>;
    /**
     *  Include any GridItem property for use at 'tablet' breakpoint
     */
    tablet: PropTypes.Requireable<object>;
};
export {};
