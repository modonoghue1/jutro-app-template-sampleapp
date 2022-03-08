import React from 'react';
import PropTypes from 'prop-types';
import { InferPotentiallyDangerousPropsWithTag } from '../types';
export declare let styleMappings: Record<string, unknown> | null;
export declare type FlexProps = Partial<React.HTMLAttributes<HTMLElement>> & InferPotentiallyDangerousPropsWithTag<typeof flexPropTypes>;
/**
 * Defines a css grid 'Flex'. This is used in conjunction with 'FlexItem' children.
 *
 * @example
 * <Flex
 *   gap='medium'
 *   tablet={{gap: 'small'}}
 * >
 *   <FlexItem>
 * </Flex>
 *
 * @metadataType layout
 */
export declare const Flex: React.FC<FlexProps>;
declare const flexPropTypes: {
    /**
     * Gap between rows and columns ('none', 'small', 'medium', 'large')
     */
    gap: PropTypes.Requireable<string>;
    /**
     * Align all items within the grid in the axis opposite to its direction; default is stretch
     */
    alignItems: PropTypes.Requireable<string>;
    /**
     * Align the flex within its container in the axis opposite to its direction; default is stretch
     */
    alignContent: PropTypes.Requireable<string>;
    /**
     * Justify the content in the flex direction: horizontally if direction is 'row' (default) or vertically if direction is 'column'
     */
    justifyContent: PropTypes.Requireable<string>;
    /**
     * Set the flex direction (row, rowReverse, column, columnReverse)
     */
    direction: PropTypes.Requireable<string>;
    /**
     * Optional dom tag to render
     */
    tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    /**
     * Optional css class(es) to add to the flex tag
     */
    className: PropTypes.Requireable<string>;
    /**
     * Children; preferably 'FlexItem'
     */
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Include any Flex property for use at 'phone' breakpoint
     */
    phone: PropTypes.Requireable<object>;
    /**
     * Include any Flex property for use at 'phoneWide' breakpoint
     */
    phoneWide: PropTypes.Requireable<object>;
    /**
     * Include any Flex property for use at 'tablet' breakpoint;
     */
    tablet: PropTypes.Requireable<object>;
    /**
     * Theme to apply to component
     */
    theme: PropTypes.Requireable<PropTypes.InferProps<{
        getStyle: PropTypes.Requireable<(...args: any[]) => any>;
    }>>;
    /**
     * Wrap (true), don't wrap (false), reverse wrap (reverse) flex items in the container
     */
    wrap: PropTypes.Requireable<string | boolean>;
};
export {};
