/**
 * Imperative API for formatting currency values using current locale
 *
 * @param {import('react-intl').Intl} intl - instance of the imperative formatting API access object
 * @param {PropTypes.InferProps<FormattedCurrency.propTypes>} props - FormattedCurrency props
 * @param {{amount?: number, currency?: string }} [currencyObject] - optional override for currency value from props
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(intl: any, props: PropTypes.InferProps<React.WeakValidationMap<PropTypes.InferProps<{
    /**
     * The numeric value to display
     */
    amount: PropTypes.Requireable<string | number>;
    /**
     * The currency name to display for localization
     */
    currency: PropTypes.Requireable<string>;
    /**
     * How to display the currency in currency formatting, 'code', 'symbol' or 'name'
     */
    currencyDisplay: PropTypes.Requireable<string>;
    /**
     * If true, displays fractions with the amount
     */
    showFractions: PropTypes.Requireable<boolean>;
    /**
     * If true, displays grouping separators with the value
     */
    showGrouping: PropTypes.Requireable<boolean>;
    /**
     * Value to display in the format of string|number|object
     */
    value: PropTypes.Requireable<string | number | PropTypes.InferProps<{
        amount: PropTypes.Requireable<string | number>;
        currency: PropTypes.Requireable<string>;
    }>>;
    /**
     * The string to display in the UI if 'amount' is undefined/null
     */
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
}>> | undefined>, currencyObject?: {
    amount?: number | undefined;
    currency?: string | undefined;
} | undefined): string;
export namespace valueParserMap {
    namespace object {
        function getValue(value: any): any;
        function getCurrency(value: any, defaultCurrency: any): any;
        function newValue(amount: any, currency: any): {
            amount: any;
            currency: any;
        };
    }
    namespace string {
        export function getValue_1(value: any): any;
        export { getValue_1 as getValue };
        export function getCurrency_1(value: any, defaultCurrency: any): any;
        export { getCurrency_1 as getCurrency };
        export function newValue_1(amount: any, currency: any): string;
        export { newValue_1 as newValue };
    }
    namespace number {
        export function getValue_2(value: any): any;
        export { getValue_2 as getValue };
        export function getCurrency_2(value: any, defaultCurrency: any): any;
        export { getCurrency_2 as getCurrency };
        export function newValue_2(amount: any): any;
        export { newValue_2 as newValue };
    }
}
/**
 * The `FormattedCurrency` component is used to render a formatted currency value.
 *
 * @type {React.FC<PropTypes.InferProps<typeof formattedCurrencyPropTypes>>}
 *
 * @metadataType element
 */
export const FormattedCurrency: React.FC<PropTypes.InferProps<typeof formattedCurrencyPropTypes>>;
import PropTypes from "prop-types";
import React from "react";
declare namespace formattedCurrencyPropTypes {
    export const amount: PropTypes.Requireable<string | number>;
    export const currency: PropTypes.Requireable<string>;
    export const currencyDisplay: PropTypes.Requireable<string>;
    export const showFractions: PropTypes.Requireable<boolean>;
    export const showGrouping: PropTypes.Requireable<boolean>;
    export { currencyValueShape as value };
    export { intlMessageShape as placeholder };
}
import { currencyValueShape } from "@jutro/prop-types/src/currencyValueShape";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
