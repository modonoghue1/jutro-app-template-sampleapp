/**
 * Image
 * @type {React.FC<PropTypes.InferProps<typeof imagePropTypes>>}
 *
 * @metadataType element
 */
export const Image: React.FC<PropTypes.InferProps<typeof imagePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace imagePropTypes {
    export const src: PropTypes.Validator<string>;
    export { intlMessageShape as alt };
    export const className: PropTypes.Requireable<string>;
    export { intlMessageShape as figcaption };
    export const width: PropTypes.Requireable<number>;
    export const onError: PropTypes.Requireable<(...args: any[]) => any>;
    export const onLoad: PropTypes.Requireable<(...args: any[]) => any>;
    export const showLoader: PropTypes.Requireable<boolean>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
