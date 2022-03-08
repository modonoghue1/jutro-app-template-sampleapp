import React from 'react';
import PropTypes from 'prop-types';
import { InferPotentiallyDangerousPropsWithTag } from '../types';
declare let styleMappings: Record<string, unknown> | null;
export { styleMappings };
declare type FlexItemProps = InferPotentiallyDangerousPropsWithTag<typeof flexItemPropTypes>;
/**
 * Defines a css grid 'FlexItem'. This is used in conjunction with 'Grid' parent.
 *
 * @param {object} [props] - props for this component
 * @returns {React.ReactElement}
 *
 * @example
 * <FlexItem
 *   textAlign="left"
 *   align="middle"
 *   tablet={{ textAlign: 'center' }}
 *   phoneWide={{ textAlign: 'center' }}
 *   phone={{ visible: false }}
 * >
 *   custom content
 * </FlexItem>
 *
 * @metadataType layout
 */
export declare const FlexItem: React.FC<FlexItemProps>;
declare const flexItemPropTypes: {
    /**
     * Define whether FlexItem is visible
     */
    visible: PropTypes.Requireable<boolean>;
    /**
     * Whether flex item can grow
     */
    grow: PropTypes.Requireable<string | number>;
    /**
     * Whether flex item can shrink
     */
    shrink: PropTypes.Requireable<string | number>;
    /**
     * Horizontally align the contents of the column
     */
    textAlign: PropTypes.Requireable<string>;
    /**
     * Align the flex item according to the cross axis of the flex direction.
     */
    alignSelf: PropTypes.Requireable<string>;
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
     * Include any FlexItem property for use at 'phone' breakpoint
     */
    phone: PropTypes.Requireable<object>;
    /**
     * Include any FlexItem property for use at 'phoneWide' breakpoint;
     */
    phoneWide: PropTypes.Requireable<object>;
    /**
     * Include any FlexItem property for use at 'tablet' breakpoint;
     */
    tablet: PropTypes.Requireable<object>;
};
