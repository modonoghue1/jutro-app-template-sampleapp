/**
 * Container element which wraps some content.
 *
 * @type {React.FC<PropTypes.InferProps<typeof containerPropTypes>>}
 */
export const Container: React.FC<PropTypes.InferProps<typeof containerPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace containerPropTypes {
    const className: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    const fluid: PropTypes.Requireable<boolean>;
}
export {};
