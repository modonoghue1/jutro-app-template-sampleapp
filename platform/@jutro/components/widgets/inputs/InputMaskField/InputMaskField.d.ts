/**
 * Renders an input field with a mask that you can control through props.
 * @typedef {typeof InputMaskField.propTypes} InputMaskFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<InputMaskFieldPropTypes>>
 *
 * @metadataType field
 */
export class InputMaskField extends FieldComponent<PropTypes.InferProps<{
    /**
     * The string that formats the mask to display, for example 999-999-9999. By default '9' indicates a number,
     * 'a' a letter and '*' a number or a letter. You can escape the special characters with a backslash.
     */
    mask: PropTypes.Validator<string>;
    /**
     * The character used in the mask, for example `x` combined with `mask=99-99` displays `xx-xx`. If empty
     * the mask restrictions are still being enforced, but the mask is not visible.
     * NOTE: Mask char should not be the same as one of possible input characters because this can generate unintended incorrect values.
     */
    maskChar: PropTypes.Requireable<string>;
    /**
     * If true, the mask is always visible, if false the field will display the placeholder if not focused and empty.
     */
    alwaysShowMask: PropTypes.Requireable<boolean>;
    /**
     * A map of special mask formatting characters and the corresponding regular expressions the input must satisfy
     */
    formatChars: PropTypes.Requireable<object>;
    /**
     * A callback invoked from getValidationMessges, should return an array of error messages.
     * NOTE: This prop is likely to be removed in the future and replaced by a more generic solution.
     */
    onGetValidationMessages: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * If set to true, the mask input will work in insert mode instead of overwrite mode.
     * If maskChar is empty, the input always works in insert mode
     */
    insertMode: PropTypes.Requireable<boolean>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Validation message for incomplete input field
         */
        incompleteInput: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * Value to display in control
     */
    value: PropTypes.Requireable<string>;
    id: PropTypes.Validator<string>;
    label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>; /**
     * Message props(error message/aria-label)
     */
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
    disabled: PropTypes.Requireable<boolean>;
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
    labelPosition: PropTypes.Requireable<string>;
    phone: PropTypes.Requireable<object>;
    phoneWide: PropTypes.Requireable<object>;
    tablet: PropTypes.Requireable<object>;
    inputType: PropTypes.Requireable<string>;
    testId: PropTypes.Requireable<string>;
    registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
    enableMultipleValidation: PropTypes.Requireable<boolean>;
}>> {
    static propTypes: {
        /**
         * The string that formats the mask to display, for example 999-999-9999. By default '9' indicates a number,
         * 'a' a letter and '*' a number or a letter. You can escape the special characters with a backslash.
         */
        mask: PropTypes.Validator<string>;
        /**
         * The character used in the mask, for example `x` combined with `mask=99-99` displays `xx-xx`. If empty
         * the mask restrictions are still being enforced, but the mask is not visible.
         * NOTE: Mask char should not be the same as one of possible input characters because this can generate unintended incorrect values.
         */
        maskChar: PropTypes.Requireable<string>;
        /**
         * If true, the mask is always visible, if false the field will display the placeholder if not focused and empty.
         */
        alwaysShowMask: PropTypes.Requireable<boolean>;
        /**
         * A map of special mask formatting characters and the corresponding regular expressions the input must satisfy
         */
        formatChars: PropTypes.Requireable<object>;
        /**
         * A callback invoked from getValidationMessges, should return an array of error messages.
         * NOTE: This prop is likely to be removed in the future and replaced by a more generic solution.
         */
        onGetValidationMessages: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * If set to true, the mask input will work in insert mode instead of overwrite mode.
         * If maskChar is empty, the input always works in insert mode
         */
        insertMode: PropTypes.Requireable<boolean>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Validation message for incomplete input field
             */
            incompleteInput: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Value to display in control
         */
        value: PropTypes.Requireable<string>;
        id: PropTypes.Validator<string>;
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>; /**
         * Message props(error message/aria-label)
         */
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
        disabled: PropTypes.Requireable<boolean>;
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
        maskChar: string;
        formatChars: {
            9: string;
            a: string;
            '*': string;
        };
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
        dataType: string;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): Record<string, any> | null;
    /**
     * Obtain a parsed input mask as displayed on the input when value is empty and
     * a map of all the placeholder chars with validation patterns.
     *
     * @param {string} mask the mask string
     * @param {string} maskChar the mask char
     * @param {object} formatChars formatting characters and patterns
     * @returns {object} parsed masked string and the pattern map
     */
    static parseMask(mask: string, maskChar: string, formatChars: object): object;
    constructor(props: any);
    applyMaskOnValue(value: any): any;
    /**
     * Tests if input is complete (all mask chars are substituted with values)
     * If the maskChar itself is a valid value, positions with the maskChar are treated
     * as populated.
     *
     * @param {string} value the value to be tested
     * @returns {boolean}
     */
    isComplete(value: string): boolean;
    /**
     * Saves initial value from input mask
     *
     * @param {event} event - onChange event
     */
    customHandleChange: (event: Event | undefined) => void;
    /**
     * Custom beforeMaskedValueChange (see react-input-mask documentation for details) allowing for notifying value after initialization.
     * This newState parameter contains the formatted value even if the value in props was not formatted.
     *
     * @param {object} newState - New input state
     * @param {object} oldState - Input state before change
     * @param {string} userInput - Raw entered or pasted string
     * @param {object} maskOptions - Mask options
     *
     * @returns {object} formatted value along with selection
     */
    beforeMaskedValueChange: (newState: object, oldState: object, userInput: string, maskOptions: object) => object;
    /**
     * Prevents moving cursor when userInput equals the maskChar
     *
     * @param {object} newState - New input state
     * @param {object} oldState - Input state before change
     * @param {string} userInput - Raw entered or pasted string
     *
     * @returns {object} old or new state depending on the userInput
     */
    preventUnnecessaryCursorMovement: (newState: object, oldState: object, userInput: string) => object;
}
/**
 * Renders an input field with a mask that you can control through props.
 */
export type InputMaskFieldPropTypes = typeof InputMaskField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
