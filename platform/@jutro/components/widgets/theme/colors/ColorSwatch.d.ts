/**
 * ColorSwatch
 * @type {React.FC<PropTypes.InferProps<typeof colorSwatchPropTypes>>}
 *
 * @metadataType action
 */
export const ColorSwatch: React.FC<PropTypes.InferProps<typeof colorSwatchPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace colorSwatchPropTypes {
    const title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    const colorProperties: PropTypes.Validator<PropTypes.InferProps<{
        /**
         * Color HEX to display
         */
        hexColor: PropTypes.Validator<string>;
        /**
         * Color to render in swatch
         */
        color: PropTypes.Validator<string>;
    }> | PropTypes.InferProps<{
        /**
         * First color of a gradient to render
         */
        startingColor: PropTypes.Validator<string>;
        /**
         * Starting color HEX
         */
        startingHexColor: PropTypes.Validator<string>;
        /**
         * Second color of a gradient to render
         */
        finishingColor: PropTypes.Validator<string>;
        /**
         * Finishing color HEX
         */
        finishingHexColor: PropTypes.Validator<string>;
    }>>;
    const type: PropTypes.Validator<string>;
    const onClick: PropTypes.Requireable<(...args: any[]) => any>;
}
export {};
