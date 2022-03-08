/**
 * ResponsiveElement
 * @type {React.FC<PropTypes.InferProps<typeof responsiveElementPropTypes>>}
 *
 * @metadataType element
 */
export const ResponsiveElement: React.FC<PropTypes.InferProps<typeof responsiveElementPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace responsiveElementPropTypes {
    const tag: PropTypes.Validator<string>;
    const parentTag: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
}
export {};
