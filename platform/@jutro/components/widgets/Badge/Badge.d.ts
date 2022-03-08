/**
 * Displays a "badge" element with child components, such as text or images.
 *
 * @type {React.FC<PropTypes.InferProps<typeof badgePropTypes>>}
 *
 * @metadataType element
 */
export const Badge: React.FC<PropTypes.InferProps<typeof badgePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace badgePropTypes {
    const value: PropTypes.Validator<number>;
    const maxValue: PropTypes.Requireable<number>;
    const className: PropTypes.Requireable<string>;
    const id: PropTypes.Validator<string>;
    const type: PropTypes.Requireable<string>;
    const liveRegionContext: PropTypes.Requireable<string>;
}
export {};
