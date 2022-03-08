/// <reference types="lodash" />
import React from 'react';
import PropTypes from 'prop-types';
import { GridLayoutProps } from './GridLayout';
import { ColumnsRearrangeFunction } from './columnsRearrangeFunctions';
export declare const columnsLayoutVariants: string[];
declare const columnsLayoutProps: {
    /**
     * Unique identifier
     */
    id: PropTypes.Validator<string>;
    /**
     * Each child is a separate column. Accepts only `GridLayout` components as children.
     */
    children: PropTypes.Validator<React.ReactElement<GridLayoutProps, React.FC<GridLayoutProps>> | React.ReactElement<GridLayoutProps, React.FC<GridLayoutProps>>[]>;
    /**
     * Grid's columns width/ratio configuration.
     * The columns length for desktop have to be equal to number of children (columns).
     * If not provided, it will be inferred as the number of children with a width of one fraction for each column.
     */
    columns: PropTypes.Requireable<(string | number)[]>;
    /**
     * Callback to rearrange children (columns) that will be invoked on the breakpoint change.
     * It is invoked with the arguments of an array of the children and breakpoint columns' length, `(children, columnsLength) => newChildren`.
     * When provided, it overrides the `variant` prop.
     */
    onColumnsRearrange: PropTypes.Requireable<ColumnsRearrangeFunction>;
    /**
     * Specifies how the columns will be stacked or merged on the breakpoint.
     * Ignored if `onColumnsRearrange` provided
     */
    variant: PropTypes.Requireable<string>;
    repeat?: React.Validator<any> | undefined;
    className?: React.Validator<any> | undefined;
    dangerouslySetInnerHTML?: React.Validator<any> | undefined;
    style?: React.Validator<any> | undefined;
    phone?: React.Validator<object | null | undefined> | undefined;
    phoneWide?: React.Validator<object | null | undefined> | undefined;
    tablet?: React.Validator<object | null | undefined> | undefined;
    rows?: React.Validator<any> | undefined;
    autoRows?: React.Validator<any> | undefined;
    gap?: React.Validator<any> | undefined;
    hgap?: React.Validator<any> | undefined;
    vgap?: React.Validator<any> | undefined;
    valignContent?: React.Validator<any> | undefined;
    justifyContent?: React.Validator<any> | undefined;
    valignItems?: React.Validator<any> | undefined;
    justifyItems?: React.Validator<any> | undefined;
    tag?: React.Validator<any> | undefined;
    blockPointerEvents?: React.Validator<any> | undefined;
    defaultGridItem?: React.Validator<PropTypes.InferProps<import("lodash").Omit<React.WeakValidationMap<PropTypes.InferPropsInner<Pick<{
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
    }>, "children">> | null | undefined> | undefined;
    gridItems?: React.Validator<(PropTypes.InferProps<import("lodash").Omit<React.WeakValidationMap<PropTypes.InferPropsInner<Pick<{
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
    }>, "children">> | null | undefined)[] | null | undefined> | undefined;
};
export declare type ColumnsLayoutProps = PropTypes.InferProps<typeof columnsLayoutProps>;
/**
 * Renders number of independent columns and manages its order for different breakpoints.
 * Extends GridLayout component.
 * By default for desktop, it divides columns to have equal width (e.g 3 columns => [1, 1, 1]),
 * for tablet and mobile renders single column grid.
 *
 * @metadataType layout
 */
export declare const ColumnsLayout: React.FC<ColumnsLayoutProps>;
export {};
