/**
 * Imperative API for formatting numbers using current locale
 *
 * @param {import('react-intl').Intl} intl - instance of the imperative formatting API access object
 * @param {PropTypes.InferProps<FormattedNumber.propTypes>} props - FormattedNumber props
 * @param {number} [number] - Numeric value override to be used instead of the one provided with props
 * @returns {string} - Formatted number string
 */
export function formatNumber(intl: any, props: PropTypes.InferProps<React.WeakValidationMap<PropTypes.InferProps<{
    /**
     * The string to display in the UI if 'value' is undefined/null
     */
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * How to display the number in this format, 'decimal' or 'percentage'
     */
    format: PropTypes.Requireable<string>;
    /**
     * If true, displays fractions with the value
     */
    showFractions: PropTypes.Requireable<boolean>;
    /**
     * Number of fraction digits
     */
    maximumFractionDigits: PropTypes.Requireable<number>;
    /**
     * If true, displays grouping separators with the value
     */
    showGrouping: PropTypes.Requireable<boolean>;
    /**
     * The numeric value to display
     */
    value: PropTypes.Requireable<number>;
}>> | undefined>, number?: number | undefined): string;
export namespace formattedNumberPropTypes {
    export { intlMessageShape as placeholder };
    export const format: PropTypes.Requireable<string>;
    export const showFractions: PropTypes.Requireable<boolean>;
    export const maximumFractionDigits: PropTypes.Requireable<number>;
    export const showGrouping: PropTypes.Requireable<boolean>;
    export const value: PropTypes.Requireable<number>;
}
/**
 * The `FormattedNumber` component is used to render number value localized.
 *
 * @type {React.FC<PropTypes.InferProps<typeof formattedNumberPropTypes>>}
 *
 * @metadataType element
 */
export const FormattedNumber: React.FC<PropTypes.InferProps<typeof formattedNumberPropTypes>>;
import PropTypes from "prop-types";
import React from "react";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
