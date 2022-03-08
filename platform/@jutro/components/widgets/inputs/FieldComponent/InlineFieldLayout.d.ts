/**
 * A component that provides layout for a field (label + control + message). Each 'field layout' component can accept React nodes
 * for each part of a field and is free to render as it likes.
 *
 * @type {React.FC<PropTypes.InferProps<typeof inlineFieldLayoutPropTypes>>}
 */
export const InlineFieldLayout: React.FC<PropTypes.InferProps<typeof inlineFieldLayoutPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace inlineFieldLayoutPropTypes {
    const labelContent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    const controlContent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    const messageContent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    const className: PropTypes.Requireable<string>;
}
export {};
