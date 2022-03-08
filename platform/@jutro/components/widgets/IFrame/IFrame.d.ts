/**
 * IFrame
 * @metadataType container
 *
 * @type {React.FC<PropTypes.InferProps<typeof iframePropTypes>>}
 */
export const IFrame: React.FC<PropTypes.InferProps<typeof iframePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace iframePropTypes {
    const id: PropTypes.Validator<string>;
    const src: PropTypes.Validator<string>;
    const title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    const aspectRatio: PropTypes.Requireable<string>;
    const height: PropTypes.Requireable<string>;
    const className: PropTypes.Requireable<string>;
    const onLoad: PropTypes.Requireable<(...args: any[]) => any>;
    const showLoader: PropTypes.Requireable<boolean>;
    const noBorder: PropTypes.Requireable<boolean>;
}
export {};
