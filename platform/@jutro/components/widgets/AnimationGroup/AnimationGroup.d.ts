/**
 * Defines an Animation Group.
 * This wraps TransitionGroup/CSSTransition and provides support for animation aliases to define transition properties.
 * The animations are triggered when elements are added to or removed from the children of the animation group.
 * For the 'swap' type animations where you are replacing one element with another, each element requires a unique
 * 'key' to trigger the animation.
 *
 * Properties: {@link AnimationGroup.propTypes}
 *
 * @see https://github.com/reactjs/react-transition-group
 *
 * @example <AnimationGroup animation="reveal">{ children to animate }</AnimationGroup>
 *
 * @type {React.FC<PropTypes.InferProps<typeof animationGroupPropTypes>>}
 */
export const AnimationGroup: React.FC<PropTypes.InferProps<typeof animationGroupPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace animationGroupPropTypes {
    const animation: PropTypes.Requireable<string>;
    const className: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
}
export {};
