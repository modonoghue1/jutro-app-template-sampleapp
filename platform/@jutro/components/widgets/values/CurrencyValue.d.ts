/**
 * Renders a formatted currency using the `tag` property to wrap
 * the value.
 *
 * @type {React.FC<PropTypes.InferProps<typeof currencyValuePropTypes>>}
 *
 * @metadataType element
 */
export const CurrencyValue: React.FC<PropTypes.InferProps<typeof currencyValuePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare const currencyValuePropTypes: {
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
    /**
     * Do not set this field directly - this is a placeholder for the rest od properties, same as you can pass to FormattedNumber component
     */
    _rest: PropTypes.Requireable<any>;
    value?: React.Validator<string | number | PropTypes.InferProps<{
        amount: PropTypes.Requireable<string | number>;
        currency: PropTypes.Requireable<string>;
    }> | null | undefined> | undefined;
    placeholder?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    showGrouping?: React.Validator<boolean | null | undefined> | undefined;
    showFractions?: React.Validator<boolean | null | undefined> | undefined;
    amount?: React.Validator<string | number | null | undefined> | undefined;
    currency?: React.Validator<string | null | undefined> | undefined;
    currencyDisplay?: React.Validator<string | null | undefined> | undefined;
};
export {};
