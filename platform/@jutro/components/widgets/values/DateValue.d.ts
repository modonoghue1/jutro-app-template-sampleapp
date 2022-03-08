/**
 * Renders a formatted date using the `tag` property to wrap
 * the value.
 *
 * @type {React.FC<PropTypes.InferProps<typeof dateValuePropTypes>>}
 */
export const DateValue: React.FC<PropTypes.InferProps<typeof dateValuePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare const dateValuePropTypes: {
    date: PropTypes.Requireable<Date>;
    value: React.Requireable<import("@jutro/prop-types").DateValueShape>;
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    format: PropTypes.Requireable<import("@jutro/prop-types").DateFormats>;
    showTime: PropTypes.Requireable<boolean>;
    onlyTime: PropTypes.Requireable<boolean>;
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
