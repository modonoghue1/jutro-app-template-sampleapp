/**
 * Renders a list of radio button cards. You specify the options using component props.
 * @typedef {typeof RadioButtonCardField.propTypes} RadioButtonCardFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<RadioButtonCardFieldPropTypes>>
 *
 * @metadataType field
 */
export class RadioButtonCardField extends FieldComponent<PropTypes.InferProps<{
    /**
     * The selected value
     */
    value: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
    /**
     * The default value to set if none is provided
     */
    defaultValue: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
    /**
     * The format of the value
     */
    dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
    /**
     * Array of choice objects to display; choice objects contain 'code', 'name' and 'secondaryLabel'
     */
    availableValues: PropTypes.Requireable<(PropTypes.InferProps<{
        iconName: PropTypes.Requireable<string>;
        iconSrc: PropTypes.Requireable<string>;
        iconClassName: PropTypes.Requireable<string>;
        iconContainerClassName: PropTypes.Requireable<string>;
        id: PropTypes.Validator<string>;
        displayName: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        secondaryLabel: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        moneyAmount: PropTypes.Requireable<number>;
    }> | null | undefined)[]>;
    /**
     * Custom render method for name prop. Translated property value by default
     */
    renderName: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Custom render method for secondary label prop. Translated property value by default
     */
    renderSecondaryLabel: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Cards layout
     */
    layout: PropTypes.Requireable<string>;
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
         * The selected value
         */
        value: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
        /**
         * The default value to set if none is provided
         */
        defaultValue: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DefaultAvailableValuePropType>;
        /**
         * The format of the value
         */
        dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
        /**
         * Array of choice objects to display; choice objects contain 'code', 'name' and 'secondaryLabel'
         */
        availableValues: PropTypes.Requireable<(PropTypes.InferProps<{
            iconName: PropTypes.Requireable<string>;
            iconSrc: PropTypes.Requireable<string>;
            iconClassName: PropTypes.Requireable<string>;
            iconContainerClassName: PropTypes.Requireable<string>;
            id: PropTypes.Validator<string>;
            displayName: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            secondaryLabel: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
            moneyAmount: PropTypes.Requireable<number>;
        }> | null | undefined)[]>;
        /**
         * Custom render method for name prop. Translated property value by default
         */
        renderName: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Custom render method for secondary label prop. Translated property value by default
         */
        renderSecondaryLabel: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Cards layout
         */
        layout: PropTypes.Requireable<string>;
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
        renderName: (name: any, translator: any) => any;
        renderSecondaryLabel: (secondaryLabel: any, translator: any) => any;
        dataType: string;
        layout: string;
        availableValues: never[];
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
 * Renders a list of radio button cards. You specify the options using component props.
 */
export type RadioButtonCardFieldPropTypes = typeof RadioButtonCardField.propTypes;
import React from "react";
import PropTypes from "prop-types";
import { FieldComponent } from "../FieldComponent/FieldComponent";
