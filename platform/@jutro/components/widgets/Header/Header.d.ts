/**
 * Header
 * @type {React.FC<PropTypes.InferProps<typeof headerPropTypes>>}
 *
 * @metadataType container
 */
export const Header: React.FC<PropTypes.InferProps<typeof headerPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace headerPropTypes {
    const className: PropTypes.Requireable<string>;
    const containerClassName: PropTypes.Requireable<string>;
    const sticky: PropTypes.Requireable<boolean>;
    const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    const fluid: PropTypes.Requireable<boolean>;
}
export {};
