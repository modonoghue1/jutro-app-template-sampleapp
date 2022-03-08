/// <reference types="lodash" />
import React from 'react';
import PropTypes from 'prop-types';
declare const gridLayoutProps: {
    /**
     * Unique identifier
     */
    id: PropTypes.Validator<string>;
    /**
     * React elements with `id` properties
     */
    children: PropTypes.Validator<boolean | React.ReactElement<{
        id: string;
    }, string | React.JSXElementConstructor<any>> | (boolean | React.ReactElement<{
        id: string;
    }, string | React.JSXElementConstructor<any>> | null | undefined)[]>;
    /**
     * `GridItem` properties that will to be applied to each child by default.
     */
    defaultGridItem: PropTypes.Requireable<PropTypes.InferProps<import("lodash").Omit<React.WeakValidationMap<PropTypes.InferPropsInner<Pick<{
        clone: PropTypes.Requireable<boolean>;
        fullWidth: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        rowSpan: PropTypes.Requireable<string | number>;
        rowStart: PropTypes.Requireable<string | number>;
        colSpan: PropTypes.Requireable<string | number>;
        colStart: PropTypes.Requireable<string | number>;
        textAlign: PropTypes.Requireable<string>;
        valign: PropTypes.Requireable<string>;
        align: PropTypes.Requireable<string>;
        tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
    }, never>> & Partial<PropTypes.InferPropsInner<Pick<{
        clone: PropTypes.Requireable<boolean>;
        fullWidth: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        rowSpan: PropTypes.Requireable<string | number>;
        rowStart: PropTypes.Requireable<string | number>;
        colSpan: PropTypes.Requireable<string | number>;
        colStart: PropTypes.Requireable<string | number>;
        textAlign: PropTypes.Requireable<string>;
        valign: PropTypes.Requireable<string>;
        align: PropTypes.Requireable<string>;
        tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
    }, "children" | "className" | "visible" | "style" | "phone" | "phoneWide" | "tablet" | "tag" | "clone" | "fullWidth" | "rowSpan" | "rowStart" | "colSpan" | "colStart" | "textAlign" | "valign" | "align">>> & {
        tag?: import("../types").TagType | undefined;
        dangerouslySetInnerHTML?: {
            __html: string;
        } | undefined;
    }>, "children">>>;
    /**
     * An array of GridItem properties to be applied to child with the same index.
     * If provided, it will extends/override the `defaultGridItem` properties for each item.
     * Passing `null` or `undefined` will skip applying it to GridItem.
     */
    gridItems: PropTypes.Requireable<(PropTypes.InferProps<import("lodash").Omit<React.WeakValidationMap<PropTypes.InferPropsInner<Pick<{
        clone: PropTypes.Requireable<boolean>;
        fullWidth: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        rowSpan: PropTypes.Requireable<string | number>;
        rowStart: PropTypes.Requireable<string | number>;
        colSpan: PropTypes.Requireable<string | number>;
        colStart: PropTypes.Requireable<string | number>;
        textAlign: PropTypes.Requireable<string>;
        valign: PropTypes.Requireable<string>;
        align: PropTypes.Requireable<string>;
        tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
    }, never>> & Partial<PropTypes.InferPropsInner<Pick<{
        clone: PropTypes.Requireable<boolean>;
        fullWidth: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        rowSpan: PropTypes.Requireable<string | number>;
        rowStart: PropTypes.Requireable<string | number>;
        colSpan: PropTypes.Requireable<string | number>;
        colStart: PropTypes.Requireable<string | number>;
        textAlign: PropTypes.Requireable<string>;
        valign: PropTypes.Requireable<string>;
        align: PropTypes.Requireable<string>;
        tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
    }, "children" | "className" | "visible" | "style" | "phone" | "phoneWide" | "tablet" | "tag" | "clone" | "fullWidth" | "rowSpan" | "rowStart" | "colSpan" | "colStart" | "textAlign" | "valign" | "align">>> & {
        tag?: import("../types").TagType | undefined;
        dangerouslySetInnerHTML?: {
            __html: string;
        } | undefined;
    }>, "children">> | null | undefined)[]>;
    /**
     * Gap between rows and columns
     */
    gap: React.Validator<string | null | undefined> | undefined;
    /**
     * Optional dom tag to render
     */
    tag: React.Validator<((PropTypes.ReactComponentLike | null) & import("../types").TagType) | null | undefined> | undefined;
    /**
     * Include any GridLayout property for use at 'phone' breakpoint
     */
    phone: PropTypes.Requireable<object>;
    /**
     * Include any GridLayout property for use at 'phoneWide' breakpoint
     */
    phoneWide: PropTypes.Requireable<object>;
    /**
     * Include any GridLayout property for use at 'tablet' and 'phone' breakpoint;
     */
    tablet: PropTypes.Requireable<object>;
    repeat?: React.Validator<string | number | null | undefined> | undefined;
    className?: React.Validator<string | null | undefined> | undefined;
    style?: React.Validator<object | null | undefined> | undefined;
    columns?: React.Validator<(string | number)[] | null | undefined> | undefined;
    rows?: React.Validator<(string | number)[] | null | undefined> | undefined;
    autoRows?: React.Validator<any[] | null | undefined> | undefined;
    hgap?: React.Validator<string | null | undefined> | undefined;
    vgap?: React.Validator<string | null | undefined> | undefined;
    valignContent?: React.Validator<string | null | undefined> | undefined;
    justifyContent?: React.Validator<string | null | undefined> | undefined;
    valignItems?: React.Validator<string | null | undefined> | undefined;
    justifyItems?: React.Validator<string | null | undefined> | undefined;
    blockPointerEvents?: React.Validator<boolean | null | undefined> | undefined;
    dangerouslySetInnerHTML?: React.Validator<{
        __html: string;
    } | null | undefined> | undefined;
};
export declare type GridLayoutProps = PropTypes.InferProps<typeof gridLayoutProps>;
/**
 * Renders a CSS Grid and applies GridItem styles to each child
 * (using GridItem's `clone` property (React.cloneElement)).
 * For tablet and mobile renders single column grid by default.
 *
 * @metadataType layout
 */
export declare const GridLayout: React.FC<GridLayoutProps>;
export {};
