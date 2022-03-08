/**
 * Renders a multi-select input where the user can type to match
 * from any of the predefined values. As the user types, the text
 * is matched against the available values to display choices.
 *
 * @typedef {typeof TypeaheadMultiSelectField.propTypes} TypeaheadMultiSelectFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<TypeaheadMultiSelectFieldPropTypes>>
 *
 * @metadataType field
 */
export class TypeaheadMultiSelectField extends FieldComponent<PropTypes.InferProps<{
    /**
     * List of values that the user can select from.
     *
     * `name` - the text to display, for example 'Married', 'Single'
     * `code` - the value that is sent on submit.
     */
    availableValues: PropTypes.Requireable<(import("@jutro/prop-types").AvailableValueObjectShape | null | undefined)[]>;
    /**
     * The list of codes that are selected. Each code is matched
     * against the codes in `availableValues` to retrieve a `name` to display
     */
    value: PropTypes.Requireable<string | import("@jutro/prop-types").AvailableValueObjectShape | (string | import("@jutro/prop-types").AvailableValueObjectShape | null | undefined)[]>;
    /**
     * The format of the items in the value array
     */
    dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
    /**
     * Determines if creating new values is allowed
     */
    allowNew: PropTypes.Requireable<boolean>;
    /**
     * The message to display where there are no options that match
     * the text the user enters.
     */
    noOptionsMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * The message to display when a new option is being created by the user.
     * createNewMessage should be passed with the {message} placeholder for example: 'New option: {message}'.
     */
    createNewMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Separator for the readonly value list
     */
    readOnlySeparator: PropTypes.Requireable<string>;
    /**
     * Should component only allow a single selection to be made
     */
    singleSelect: PropTypes.Requireable<boolean>;
    /**
     * Determines if dropdown indicator will be sticky
     */
    stickyIndicator: PropTypes.Requireable<boolean>;
    /**
     * Default false; if set to true, it will target the body as the menu portal
     */
    usePortal: PropTypes.Requireable<boolean>;
    /**
     * Should dropdown be initially opened
     */
    isInitiallyOpen: PropTypes.Requireable<boolean>;
    /**
     * Function for asynchronous data loading
     */
    onLoadValues: PropTypes.Requireable<(...args: any[]) => any>;
    id: PropTypes.Validator<string>;
    label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
        id: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<string>; /**
         * The list of codes that are selected. Each code is matched
         * against the codes in `availableValues` to retrieve a `name` to display
         */
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
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    labelPosition: PropTypes.Requireable<string>;
    phone: PropTypes.Requireable<object>;
    phoneWide: PropTypes.Requireable<object>;
    tablet: PropTypes.Requireable<object>;
    inputType: PropTypes.Requireable<string>;
    testId: PropTypes.Requireable<string>;
    registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
    enableMultipleValidation: PropTypes.Requireable<boolean>;
}>> {
    static defaultProps: {
        dataType: string;
        usePortal: boolean;
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
    static propTypes: {
        /**
         * List of values that the user can select from.
         *
         * `name` - the text to display, for example 'Married', 'Single'
         * `code` - the value that is sent on submit.
         */
        availableValues: PropTypes.Requireable<(import("@jutro/prop-types").AvailableValueObjectShape | null | undefined)[]>;
        /**
         * The list of codes that are selected. Each code is matched
         * against the codes in `availableValues` to retrieve a `name` to display
         */
        value: PropTypes.Requireable<string | import("@jutro/prop-types").AvailableValueObjectShape | (string | import("@jutro/prop-types").AvailableValueObjectShape | null | undefined)[]>;
        /**
         * The format of the items in the value array
         */
        dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
        /**
         * Determines if creating new values is allowed
         */
        allowNew: PropTypes.Requireable<boolean>;
        /**
         * The message to display where there are no options that match
         * the text the user enters.
         */
        noOptionsMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * The message to display when a new option is being created by the user.
         * createNewMessage should be passed with the {message} placeholder for example: 'New option: {message}'.
         */
        createNewMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Separator for the readonly value list
         */
        readOnlySeparator: PropTypes.Requireable<string>;
        /**
         * Should component only allow a single selection to be made
         */
        singleSelect: PropTypes.Requireable<boolean>;
        /**
         * Determines if dropdown indicator will be sticky
         */
        stickyIndicator: PropTypes.Requireable<boolean>;
        /**
         * Default false; if set to true, it will target the body as the menu portal
         */
        usePortal: PropTypes.Requireable<boolean>;
        /**
         * Should dropdown be initially opened
         */
        isInitiallyOpen: PropTypes.Requireable<boolean>;
        /**
         * Function for asynchronous data loading
         */
        onLoadValues: PropTypes.Requireable<(...args: any[]) => any>;
        id: PropTypes.Validator<string>;
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
            id: PropTypes.Requireable<string>;
            icon: PropTypes.Requireable<string>; /**
             * The list of codes that are selected. Each code is matched
             * against the codes in `availableValues` to retrieve a `name` to display
             */
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
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        labelPosition: PropTypes.Requireable<string>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
        inputType: PropTypes.Requireable<string>;
        testId: PropTypes.Requireable<string>;
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    };
    constructor(props: any);
    /**
     * allowNewValue
     * @param {object} value - new value being entered
     * @returns {boolean} true if new values are allowed and it doesn't match an existing one
     */
    allowNewValue: (value: object) => boolean;
    renderSelect(props: any): JSX.Element;
    /**
     * onChange callback passed to Select
     *
     * @param {object[]} value - the value of the control
     * @param {string} value.name
     * @param {string} value.code
     */
    handleOnChangeMulti: (value: {
        name: string;
        code: string;
    }) => void;
    /**
     * onChange callback passed to Select
     *
     * @param {object[]} value - the value of the control
     * @param {string} value.name
     * @param {string} value.code
     * @param {object} action - the action type (clear, blur, ect.)
     */
    handleOnChangeSingle: (value: {
        name: string;
        code: string;
    }, action: object) => void;
    /**
     * Gets the option display text.
     * Needs to handle the internal option.label format of the Creatable component
     * when new values are created.
     *
     * @param {object} option
     *
     * @returns {string} - the text to display
     */
    getOptionLabel: (option: object) => string;
    /**
     * Gets the option value
     * Needs to handle the internal option.value format of the Creatable component
     * when new values are created.
     *
     * @param {object} option
     *
     * @returns {string} - the value that indicates user choice
     */
    getOptionValue: (option: object) => string;
    /**
     * Translates array of available values. Uses memoization.
     *
     * @param {object[]} availableValues
     *
     * @returns {object[]} - the translated available values
     */
    translateAvailableValues: (this: any, availableValues: any) => any;
    /**
     * Transforms array of codes/name code pairs into array of code/name structures. Uses memoization
     *
     * @param {string[]|object[]} valueProp
     * @param {object[]} availableValues
     * @param {string} dataType
     *
     * @returns {object[]} - the values that match available values and transformed to structures
     */
    transformValueProp: (this: any, value: any, availableValues: any, dataType: any) => any;
}
/**
 * Renders a multi-select input where the user can type to match
 * from any of the predefined values. As the user types, the text
 * is matched against the available values to display choices.
 */
export type TypeaheadMultiSelectFieldPropTypes = typeof TypeaheadMultiSelectField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
