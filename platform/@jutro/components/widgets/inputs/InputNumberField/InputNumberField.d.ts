/**
 * Renders an input element for number fields.
 * @typedef {typeof inputNumberFieldPropTypes} InputNumberFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<InputNumberFieldPropTypes>>
 *
 * @metadataType field
 */
export class InputNumberField extends FieldComponent<PropTypes.InferProps<{
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Validation message for min value
         */
        validationMinValue: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Validation message for max value
         */
        validationMaxValue: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Validation message for not a number
         */
        validationInvalidNumber: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * This name will be passed to input name attribute and switched on autocomplete
     *
     */
    name: PropTypes.Requireable<string>;
    /**
     * Prop to show/hide the thousands separator
     */
    showGrouping: PropTypes.Requireable<boolean>;
    icon: PropTypes.Requireable<string>;
    iconPosition: PropTypes.Requireable<string>;
    disabled: PropTypes.Requireable<boolean>;
    className: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Number passed as value
     */
    value: PropTypes.Requireable<string | number>;
    /**
     * Type of returned value in onValeChange callback
     */
    dataType: PropTypes.Requireable<string>;
    /**
     * HTML5 native autoComplete support
     */
    autoComplete: PropTypes.Validator<any>;
    /**
     * Minimum value for the number
     */
    minValue: PropTypes.Requireable<string | number>;
    /**
     * Maximum value for the number
     */
    maxValue: PropTypes.Requireable<string | number>;
    /**
     * The number of decimal places to display in the value
     */
    decimalPlaces: PropTypes.Requireable<number>;
    /**
     * Step for increment/decrement like `0.05`
     */
    step: PropTypes.Requireable<string | number>;
}>> {
    static propTypes: {
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Validation message for min value
             */
            validationMinValue: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Validation message for max value
             */
            validationMaxValue: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Validation message for not a number
             */
            validationInvalidNumber: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * This name will be passed to input name attribute and switched on autocomplete
         *
         */
        name: PropTypes.Requireable<string>;
        /**
         * Prop to show/hide the thousands separator
         */
        showGrouping: PropTypes.Requireable<boolean>;
        icon: PropTypes.Requireable<string>;
        iconPosition: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Number passed as value
         */
        value: PropTypes.Requireable<string | number>;
        /**
         * Type of returned value in onValeChange callback
         */
        dataType: PropTypes.Requireable<string>;
        /**
         * HTML5 native autoComplete support
         */
        autoComplete: PropTypes.Validator<any>;
        /**
         * Minimum value for the number
         */
        minValue: PropTypes.Requireable<string | number>;
        /**
         * Maximum value for the number
         */
        maxValue: PropTypes.Requireable<string | number>;
        /**
         * The number of decimal places to display in the value
         */
        decimalPlaces: PropTypes.Requireable<number>;
        /**
         * Step for increment/decrement like `0.05`
         */
        step: PropTypes.Requireable<string | number>;
        id: PropTypes.Validator<string>;
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
            id: PropTypes.Requireable<string>;
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
        nullable: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        defaultValue: PropTypes.Requireable<any>;
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
        labelPosition: PropTypes.Requireable<string>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
        inputType: PropTypes.Requireable<string>;
        testId: PropTypes.Requireable<string>;
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        dataType: string;
        decimalPlaces: number;
        step: number;
        showGrouping: boolean;
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
}
/**
 * Renders an input element for number fields.
 */
export type InputNumberFieldPropTypes = typeof inputNumberFieldPropTypes;
import React from "react";
import PropTypes from "prop-types";
import { FieldComponent } from "../FieldComponent/FieldComponent";
declare const inputNumberFieldPropTypes: {
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Validation message for min value
         */
        validationMinValue: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Validation message for max value
         */
        validationMaxValue: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Validation message for not a number
         */
        validationInvalidNumber: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * This name will be passed to input name attribute and switched on autocomplete
     *
     */
    name: PropTypes.Requireable<string>;
    /**
     * Prop to show/hide the thousands separator
     */
    showGrouping: PropTypes.Requireable<boolean>;
    icon: PropTypes.Requireable<string>;
    iconPosition: PropTypes.Requireable<string>;
    disabled: PropTypes.Requireable<boolean>;
    className: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Number passed as value
     */
    value: PropTypes.Requireable<string | number>;
    /**
     * Type of returned value in onValeChange callback
     */
    dataType: PropTypes.Requireable<string>;
    /**
     * HTML5 native autoComplete support
     */
    autoComplete: PropTypes.Validator<any>;
    /**
     * Minimum value for the number
     */
    minValue: PropTypes.Requireable<string | number>;
    /**
     * Maximum value for the number
     */
    maxValue: PropTypes.Requireable<string | number>;
    /**
     * The number of decimal places to display in the value
     */
    decimalPlaces: PropTypes.Requireable<number>;
    /**
     * Step for increment/decrement like `0.05`
     */
    step: PropTypes.Requireable<string | number>;
};
export {};
