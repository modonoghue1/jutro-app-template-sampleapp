/**
 * StickyFooter
 * @type {React.FC<PropTypes.InferProps<typeof stickyFooterPropTypes>>}
 *
 * @metadataType container
 */
export const StickyFooter: React.FC<PropTypes.InferProps<typeof stickyFooterPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace stickyFooterPropTypes {
    const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    const hiddenOnLoad: PropTypes.Requireable<boolean>;
    const fullWidth: PropTypes.Requireable<boolean>;
    const className: PropTypes.Requireable<string>;
    const stickyClassName: PropTypes.Requireable<string>;
    const containerClassName: PropTypes.Requireable<string>;
}
export {};
