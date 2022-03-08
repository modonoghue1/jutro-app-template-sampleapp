/**
 * Renders buttons that allow you to toggle between the available values.
 * @typedef {typeof ToggleField.propTypes} ToggleFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<ToggleFieldPropTypes>>
 *
 * @metadataType field
 */
export class ToggleField extends FieldComponent<PropTypes.InferProps<{
    /**
     * Boolean, object, or string value
     */
    value: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
    /**
     * Default value
     */
    defaultValue: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
    /**
     * Format of the value
     */
    dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
    /**
     * Array of choice objects to display; choice objects contains `code` and `name`; if not provided, default 'Yes'/'No' is used
     */
    availableValues: PropTypes.Requireable<(import("@jutro/prop-types").AvailableValueObjectShape | null | undefined)[]>;
    /**
     * Node to render when the "other" value is selected
     */
    detailElement: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Animation passed to AnimationGroup
     */
    animation: PropTypes.Requireable<string>;
    /**
     * Wrapped children to be rendered when the value prop is set to true
     */
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
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
    tablet: PropTypes.Requireable<object>;
    inputType: PropTypes.Requireable<string>;
    testId: PropTypes.Requireable<string>;
    registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
    enableMultipleValidation: PropTypes.Requireable<boolean>;
}>> {
    static propTypes: {
        /**
         * Boolean, object, or string value
         */
        value: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
        /**
         * Default value
         */
        defaultValue: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
        /**
         * Format of the value
         */
        dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
        /**
         * Array of choice objects to display; choice objects contains `code` and `name`; if not provided, default 'Yes'/'No' is used
         */
        availableValues: PropTypes.Requireable<(import("@jutro/prop-types").AvailableValueObjectShape | null | undefined)[]>;
        /**
         * Node to render when the "other" value is selected
         */
        detailElement: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Animation passed to AnimationGroup
         */
        animation: PropTypes.Requireable<string>;
        /**
         * Wrapped children to be rendered when the value prop is set to true
         */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
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
        tablet: PropTypes.Requireable<object>;
        inputType: PropTypes.Requireable<string>;
        testId: PropTypes.Requireable<string>;
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        availableValues: {
            code: string;
            name: {
                id: string;
                defaultMessage: string;
            };
        }[];
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
     * Custom change handler for `button` element. Uses `notifyChange` to invoke onValueChange callback
     *
     * @param {object} evt - React event wrapper
     */
    handleButtonClick: (evt: object) => void;
    /**
     * Creates a button element
     *
     * @param {object} option - object that contains the value for the button
     * @param {object} styleClasses - class name object of button styles
     * @param {object} activeStyle - class name object of button active styles
     * @returns {Element} - a button element
     */
    renderButton(option: object, styleClasses: object, activeStyle: object, activeKeypress: any, uniqueId: any): Element;
}
/**
 * Renders buttons that allow you to toggle between the available values.
 */
export type ToggleFieldPropTypes = typeof ToggleField.propTypes;
import React from "react";
import PropTypes from "prop-types";
import { FieldComponent } from "../FieldComponent/FieldComponent";
