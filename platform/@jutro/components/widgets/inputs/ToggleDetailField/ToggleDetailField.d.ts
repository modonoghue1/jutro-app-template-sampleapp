/**
 * IN PROGRESS: Renders buttons that allow you to toggle between the available values. Can display additional content
 * when the user selects a particular value.
 * @typedef {typeof ToggleDetailField.propTypes} ToggleDetailFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<ToggleDetailFieldPropTypes>>
 *
 * @metadataType field
 */
export class ToggleDetailField extends FieldComponent<PropTypes.InferProps<{
    /**
     * Boolean or string value
     */
    value: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
    /**
     * Default value
     */
    defaultValue: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
    /**
     * The format of the value
     */
    dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
    /**
     * Array of choice objects to display; choice objects contains 'code' and 'name'; if not provided, default 'Yes'/'No' will be used
     */
    availableValues: PropTypes.Requireable<any[]>;
    /**
     * If true, displays with full width
     */
    fullWidth: PropTypes.Requireable<boolean>;
    /**
     * Node to render when the "other" value is selected
     */
    detailElement: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Animation passed to AnimationGroup
     */
    animation: PropTypes.Requireable<string>;
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
         * Boolean or string value
         */
        value: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
        /**
         * Default value
         */
        defaultValue: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
        /**
         * The format of the value
         */
        dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
        /**
         * Array of choice objects to display; choice objects contains 'code' and 'name'; if not provided, default 'Yes'/'No' will be used
         */
        availableValues: PropTypes.Requireable<any[]>;
        /**
         * If true, displays with full width
         */
        fullWidth: PropTypes.Requireable<boolean>;
        /**
         * Node to render when the "other" value is selected
         */
        detailElement: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Animation passed to AnimationGroup
         */
        animation: PropTypes.Requireable<string>;
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
    constructor(props: any);
}
export namespace ToggleDetailField {
    const displayName: string;
}
/**
 * IN PROGRESS: Renders buttons that allow you to toggle between the available values. Can display additional content
 * when the user selects a particular value.
 */
export type ToggleDetailFieldPropTypes = typeof ToggleDetailField.propTypes;
import React from "react";
import PropTypes from "prop-types";
import { FieldComponent } from "../FieldComponent/FieldComponent";
