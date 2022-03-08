export const fieldValueComponentMap: {
    currency: {
        component: React.FC<PropTypes.InferProps<{
            id: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            tag: PropTypes.Requireable<string>;
            prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
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
        }>>;
    };
    date: {
        component: React.FC<PropTypes.InferProps<{
            date: PropTypes.Requireable<Date>;
            value: React.Requireable<import("@jutro/prop-types").DateValueShape>;
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            format: PropTypes.Requireable<import("@jutro/prop-types").DateFormats>;
            showTime: PropTypes.Requireable<boolean>;
            onlyTime: PropTypes.Requireable<boolean>;
            id: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            tag: PropTypes.Requireable<string>;
            prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
    };
    'date-time': {
        component: React.FC<PropTypes.InferProps<{
            date: PropTypes.Requireable<Date>;
            value: React.Requireable<import("@jutro/prop-types").DateValueShape>;
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            format: PropTypes.Requireable<import("@jutro/prop-types").DateFormats>;
            showTime: PropTypes.Requireable<boolean>;
            onlyTime: PropTypes.Requireable<boolean>;
            id: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            tag: PropTypes.Requireable<string>;
            prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
    };
    decimal: {
        component: React.FC<PropTypes.InferProps<{
            /**
             * Used to identify the component
             */
            _rest: PropTypes.Requireable<any>;
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            format: PropTypes.Requireable<string>;
            showFractions: PropTypes.Requireable<boolean>;
            maximumFractionDigits: PropTypes.Requireable<number>;
            showGrouping: PropTypes.Requireable<boolean>;
            value: PropTypes.Requireable<number>;
            id: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            tag: PropTypes.Requireable<string>;
            prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        componentProps: {
            format: string;
            showFractions: boolean;
        };
    };
    integer: {
        component: React.FC<PropTypes.InferProps<{
            /**
             * Used to identify the component
             */
            _rest: PropTypes.Requireable<any>;
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            format: PropTypes.Requireable<string>;
            showFractions: PropTypes.Requireable<boolean>;
            maximumFractionDigits: PropTypes.Requireable<number>;
            showGrouping: PropTypes.Requireable<boolean>;
            value: PropTypes.Requireable<number>;
            id: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            tag: PropTypes.Requireable<string>;
            prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        componentProps: {
            format: string;
            showFractions: boolean;
        };
    };
    number: {
        component: React.FC<PropTypes.InferProps<{
            /**
             * Used to identify the component
             */
            _rest: PropTypes.Requireable<any>;
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            format: PropTypes.Requireable<string>;
            showFractions: PropTypes.Requireable<boolean>;
            maximumFractionDigits: PropTypes.Requireable<number>;
            showGrouping: PropTypes.Requireable<boolean>;
            value: PropTypes.Requireable<number>;
            id: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            tag: PropTypes.Requireable<string>;
            prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        componentProps: {
            format: string;
            showFractions: boolean;
        };
    };
    percent: {
        component: React.FC<PropTypes.InferProps<{
            /**
             * Used to identify the component
             */
            _rest: PropTypes.Requireable<any>;
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            format: PropTypes.Requireable<string>;
            showFractions: PropTypes.Requireable<boolean>;
            maximumFractionDigits: PropTypes.Requireable<number>;
            showGrouping: PropTypes.Requireable<boolean>;
            value: PropTypes.Requireable<number>;
            id: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            tag: PropTypes.Requireable<string>;
            prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        componentProps: {
            format: string;
            showFractions: boolean;
        };
    };
    year: {
        component: React.FC<PropTypes.InferProps<{
            /**
             * Used to identify the component
             */
            _rest: PropTypes.Requireable<any>;
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            format: PropTypes.Requireable<string>;
            showFractions: PropTypes.Requireable<boolean>;
            maximumFractionDigits: PropTypes.Requireable<number>;
            showGrouping: PropTypes.Requireable<boolean>;
            value: PropTypes.Requireable<number>;
            id: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            tag: PropTypes.Requireable<string>;
            prefix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            suffix: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
    };
};
/**
 * Renders a formatted value using the `tag` and `datatype` property to wrap
 * the value.
 *
 * @type {React.FC<PropTypes.InferProps<typeof fieldValuePropTypes>>}
 *
 * @metadataType element
 */
export const FieldValue: React.FC<PropTypes.InferProps<typeof fieldValuePropTypes>>;
import PropTypes from "prop-types";
import React from "react";
declare namespace fieldValuePropTypes {
    export const id: PropTypes.Validator<string>;
    export const className: PropTypes.Requireable<string>;
    export const datatype: PropTypes.Requireable<string>;
    export const path: PropTypes.Requireable<string>;
    export { intlMessageShape as placeholder };
    export const value: PropTypes.Requireable<string | number | boolean | object>;
    export { intlMessageShape as prefix };
    export { intlMessageShape as suffix };
    export const tag: PropTypes.Requireable<string>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
