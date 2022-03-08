/**
 * Renders a formatted number using the `tag` property to wrap
 * the value.
 *
 * @type {React.FC<PropTypes.InferProps<typeof numberValuePropTypes>>}
 *
 * @metadataType element
 */
export const NumberValue: React.FC<PropTypes.InferProps<typeof numberValuePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare const numberValuePropTypes: {
    /**
     * Do not set this field directly - this is a placeholder for the rest od properties, same as you can pass to FormattedNumber component
     */
    _rest: PropTypes.Requireable<any>;
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    format: PropTypes.Requireable<string>;
    showFractions: PropTypes.Requireable<boolean>;
    maximumFractionDigits: PropTypes.Requireable<number>;
    showGrouping: PropTypes.Requireable<boolean>;
    value: PropTypes.Requireable<number>;
    /**
     * Used to identify the component
     */
    id: PropTypes.Validator<string>;
    /**
     * CSS class name for this component
     */
    className: PropTypes.Requireable<string>;
    /**
     * Hint path to value
     */
    path: PropTypes.Requireable<string>;
    /**
     * The html tag to use when rendering the outermost element of this component
     */
    tag: PropTypes.Requireable<string>;
    /**
     *  Optional prefix message to be attached in front of the value
     */
    prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     *  Optional suffix message to be attached at the end the value
     */
    suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
};
export {};
