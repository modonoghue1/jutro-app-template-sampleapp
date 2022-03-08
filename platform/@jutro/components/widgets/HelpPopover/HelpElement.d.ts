/**
 * The `HelpComponent` component is designed as a simple component presenting text inside the Help dropdown on Application Header.
 *
 * @type {React.FC<PropTypes.InferProps<typeof helpComponentPropTypes>>}
 *
 * @metadataType element
 */
export const HelpElement: React.FC<PropTypes.InferProps<typeof helpComponentPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace helpComponentPropTypes {
    const className: PropTypes.Requireable<string>;
    const content: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    const tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
}
export {};
