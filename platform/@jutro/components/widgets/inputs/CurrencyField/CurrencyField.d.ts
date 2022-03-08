/**
 * Use it to enter or display a monetary value. The amount is displayed based on the locale.
 *
 * If you want to use it to display the localized value as text, and not an input, set `readOnly` to `true`.
 *
 * The component can handle dataTypes of `object` or `number` which is set by dataType prop.
 *
 * @typedef {typeof CurrencyField.propTypes} CurrencyFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<CurrencyFieldPropTypes>>
 *
 * @metadataType field
 */
export class CurrencyField extends FieldComponent<PropTypes.InferProps<{
    /**
     * Value to display in the Currency field
     */
    value: PropTypes.Requireable<string | number | PropTypes.InferProps<{
        amount: PropTypes.Requireable<string | number>;
        currency: PropTypes.Requireable<string>;
    }>>;
    /**
     * Default currency
     */
    defaultCurrency: PropTypes.Requireable<string>;
    /**
     * How to display the currency in currency formatting, 'code', 'symbol' or 'name'
     */
    currencyDisplay: PropTypes.Requireable<string>;
    /**
     * If true, displays the fraction part of the amount
     */
    showFractions: PropTypes.Requireable<boolean>;
    /**
     * Default value
     */
    defaultValue: PropTypes.Requireable<string | number | PropTypes.InferProps<{
        amount: PropTypes.Requireable<string | number>;
        currency: PropTypes.Requireable<string>;
    }>>;
    /**
     * Sets the datatype type of the value prop. When set to 'string' accepts
     * strings containing currency symbol i.e. '123.23 usd'
     */
    dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShapeWithNumber>;
    id: PropTypes.Validator<string>;
    label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
        id: PropTypes.Requireable<string>; /**
         * Default currency
         */
        icon: PropTypes.Requireable<string>;
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        renderContent: PropTypes.Requireable<(...args: any[]) => any>;
    }>>;
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    required: PropTypes.Requireable<boolean | any[]>;
    schemaRequired: PropTypes.Requireable<boolean>;
    readOnly: PropTypes.Requireable<boolean>;
    disabled: PropTypes.Requireable<boolean>;
    nullable: PropTypes.Requireable<boolean>;
    visible: PropTypes.Requireable<boolean>;
    autoTrim: PropTypes.Requireable<boolean>;
    onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
    onBlur: PropTypes.Requireable<(...args: any[]) => any>;
    onFocus: PropTypes.Requireable<(...args: any[]) => any>;
    model: PropTypes.Requireable<object>;
    path: PropTypes.Requireable<string>;
    showErrors: PropTypes.Requireable<boolean>;
    showRequired: PropTypes.Requireable<boolean>;
    showOptional: PropTypes.Requireable<boolean>;
    validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
    layout: PropTypes.Requireable<string>;
    hideLabel: PropTypes.Requireable<boolean>;
    className: PropTypes.Requireable<string>;
    contentContainerClassName: PropTypes.Requireable<string>;
    controlClassName: PropTypes.Requireable<string>;
    labelClassName: PropTypes.Requireable<string>;
    secondaryLabelClassName: PropTypes.Requireable<string>;
    labelContainerClassName: PropTypes.Requireable<string>;
    showValidationIcon: PropTypes.Requireable<boolean>;
    dataPath: PropTypes.Requireable<string>;
    validator: PropTypes.Requireable<PropTypes.InferProps<{
        pattern: PropTypes.Validator<string>;
        message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    requiredFieldValidationMessage: PropTypes.Requireable<string>;
    successMessage: PropTypes.Requireable<string>;
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    labelPosition: PropTypes.Requireable<string>;
    phone: PropTypes.Requireable<object>;
    phoneWide: PropTypes.Requireable<object>;
    tablet: PropTypes.Requireable<object>; /**
     * generates accessibility properties for the field component
     * @param {object} intl - i18n context
     * @returns {object} set of applicable wai-aria tags
     */
    inputType: PropTypes.Requireable<string>;
    testId: PropTypes.Requireable<string>;
    registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
    enableMultipleValidation: PropTypes.Requireable<boolean>;
}>> {
    static propTypes: {
        /**
         * Value to display in the Currency field
         */
        value: PropTypes.Requireable<string | number | PropTypes.InferProps<{
            amount: PropTypes.Requireable<string | number>;
            currency: PropTypes.Requireable<string>;
        }>>;
        /**
         * Default currency
         */
        defaultCurrency: PropTypes.Requireable<string>;
        /**
         * How to display the currency in currency formatting, 'code', 'symbol' or 'name'
         */
        currencyDisplay: PropTypes.Requireable<string>;
        /**
         * If true, displays the fraction part of the amount
         */
        showFractions: PropTypes.Requireable<boolean>;
        /**
         * Default value
         */
        defaultValue: PropTypes.Requireable<string | number | PropTypes.InferProps<{
            amount: PropTypes.Requireable<string | number>;
            currency: PropTypes.Requireable<string>;
        }>>;
        /**
         * Sets the datatype type of the value prop. When set to 'string' accepts
         * strings containing currency symbol i.e. '123.23 usd'
         */
        dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShapeWithNumber>;
        id: PropTypes.Validator<string>;
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
            id: PropTypes.Requireable<string>; /**
             * Default currency
             */
            icon: PropTypes.Requireable<string>;
            placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
            text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            renderContent: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
        placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        required: PropTypes.Requireable<boolean | any[]>;
        schemaRequired: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        nullable: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        autoTrim: PropTypes.Requireable<boolean>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        model: PropTypes.Requireable<object>;
        path: PropTypes.Requireable<string>;
        showErrors: PropTypes.Requireable<boolean>;
        showRequired: PropTypes.Requireable<boolean>;
        showOptional: PropTypes.Requireable<boolean>;
        validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
        layout: PropTypes.Requireable<string>;
        hideLabel: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        contentContainerClassName: PropTypes.Requireable<string>;
        controlClassName: PropTypes.Requireable<string>;
        labelClassName: PropTypes.Requireable<string>;
        secondaryLabelClassName: PropTypes.Requireable<string>;
        labelContainerClassName: PropTypes.Requireable<string>;
        showValidationIcon: PropTypes.Requireable<boolean>;
        dataPath: PropTypes.Requireable<string>;
        validator: PropTypes.Requireable<PropTypes.InferProps<{
            pattern: PropTypes.Validator<string>;
            message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        requiredFieldValidationMessage: PropTypes.Requireable<string>;
        successMessage: PropTypes.Requireable<string>;
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        labelPosition: PropTypes.Requireable<string>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>; /**
         * generates accessibility properties for the field component
         * @param {object} intl - i18n context
         * @returns {object} set of applicable wai-aria tags
         */
        inputType: PropTypes.Requireable<string>;
        testId: PropTypes.Requireable<string>;
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        currencyDisplay: string;
        showFractions: boolean;
        dataType: string;
        autoTrim: boolean;
        required: boolean;
        schemaRequired: boolean;
        readOnly: boolean;
        disabled: boolean;
        showErrors: boolean;
        hideLabel: boolean;
        showValidationIcon: boolean;
        dataPath: string;
        labelPosition: string;
    };
    constructor(props: any);
    /**
     * creates regex for input field.
     * Allows decimal point '.' and 0 to 2 numbers to the right if showFractions is true.
     * Does not allow a decimal point if showFractions is false,
     *
     * @returns {Function} regex for input field
     */
    get inputRegex(): Function;
    /**
     * Returns currency
     * @returns {object}
     */
    getCurrency(): object;
    /**
     * Returns faction digits
     * @returns {(string|undefined)}
     */
    getFractionDigits(): (string | undefined);
    /**
     * Returns the currency symbol and its position
     *
     * @param {object} intl - i18n context
     * @returns {object}
     */
    getCurrencySymbol(intl: object): object;
    /**
     * Formatter helper to return the value with dots, commas and spaces based on locale and configs provided
     *
     * @param {number | string} value
     * @param {object} params
     * @param {number} params.value
     * @param {string} params.currency
     * @param {number} params.minimumFractionDigits
     * @param {number} params.maximumFractionDigits
     * @param {object} intl - i18n context
     * @returns {string}
     */
    formatValue(value: number | string, params: {
        value: number;
        currency: string;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
    }, intl: object): string;
    /**
     * Helper function that calls notify change with the correct format depending on value prop dataType
     * @param {number|string} newValue
     */
    updateValue: (newValue: number | string) => void;
    /**
     * Helper function that sets value amount to dataType number
     */
    updateInputValueToNumber(): void;
    /**
     * Updates the input type to "text" when user leaves the input and call default FieldComponent.onBlur method
     *
     * @param {object} evt - React event wrapper
     */
    handleOnBlur: (evt: object) => void;
    /**
     * Updates the input type to "number" when user focus in the input and call default FieldComponent.onFocus method
     *
     * @param {object} evt - React event wrapper
     */
    handleOnFocus: (evt: object) => void;
    /**
     * Specific onKeyDown handler function for number inputs
     *
     * @param {object} event - React event wrapper
     */
    handleKeyDown: (event: object) => void;
    formatConfig(): {
        style: string;
        currencyDisplay: string;
        currency: any;
        minimumFractionDigits: string | undefined;
        maximumFractionDigits: string | undefined;
    };
    formattedPlaceholder(intl: any): import("@jutro/prop-types").IntlMessageShape | null | undefined;
    /**
     * Render control for this component.
     *
     * @param {object} props - breakpoint-specific props
     * @param {object} intl - i18n context
     * @param {object} options - rendering options (like 'isInvalid', 'isValid', etc)
     * @returns {React.ReactElement} JSX for the control
     */
    renderComponent(props: object, intl: object, options: object): React.ReactElement;
}
/**
 * Use it to enter or display a monetary value. The amount is displayed based on the locale.
 *
 * If you want to use it to display the localized value as text, and not an input, set `readOnly` to `true`.
 *
 * The component can handle dataTypes of `object` or `number` which is set by dataType prop.
 */
export type CurrencyFieldPropTypes = typeof CurrencyField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
