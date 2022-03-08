/**
 * Renders a dropdown where the user can select one of the values. You specify the allowed values and the
 * action using props.
 *
 * @typedef {typeof DropdownSelectField.propTypes} DropdownSelectFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<DropdownSelectFieldPropTypes>>
 *
 * @metadataType field
 */
export class DropdownSelectField extends FieldComponent<PropTypes.InferProps<{
    /**
     * Selected item value
     */
    value: PropTypes.Requireable<string | number | boolean | any[] | import("@jutro/prop-types").AvailableValueObjectShape>;
    /**
     * Default value to set if there is no value present.
     */
    defaultValue: PropTypes.Requireable<string | number | boolean | any[] | import("@jutro/prop-types").AvailableValueObjectShape>;
    /**
     * The format of the value
     */
    dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
    /**
     * Array of choice objects to display; choice objects contains 'code' and 'name'
     */
    availableValues: PropTypes.Requireable<(import("@jutro/prop-types").AvailableValueObjectShape | null | undefined)[]>;
    /**
     * Node to render when 'other' value is selected, as processed by `renderContentFromMetadata` method
     * (won't be rendered when value is not 'other')
     */
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Map of CSS class names for overriding individual parts of component's styles
     */
    internalClassNames: PropTypes.Requireable<PropTypes.InferProps<{
        control: PropTypes.Requireable<string>;
        controlFocused: PropTypes.Requireable<string>;
        menuList: PropTypes.Requireable<string>;
        option: PropTypes.Requireable<string>;
        selectIcon: PropTypes.Requireable<string>;
    }>>;
    /**
     * When set to `true` options will show the placeholder text and it will be the first option.
     */
    alwaysShowPlaceholder: PropTypes.Requireable<boolean>;
    /**
     * Allows you to type in dropdown field to find options.
     */
    searchable: PropTypes.Requireable<boolean>;
    /**
     * Should dropdown be initially opened
     */
    isInitiallyOpen: PropTypes.Requireable<boolean>;
    /**
     * Default true; and if set to false, it will bypass menuPortalTarget prop in SelectComponent
     */
    usePortal: PropTypes.Requireable<boolean>;
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
         * Selected item value
         */
        value: PropTypes.Requireable<string | number | boolean | any[] | import("@jutro/prop-types").AvailableValueObjectShape>;
        /**
         * Default value to set if there is no value present.
         */
        defaultValue: PropTypes.Requireable<string | number | boolean | any[] | import("@jutro/prop-types").AvailableValueObjectShape>;
        /**
         * The format of the value
         */
        dataType: React.Requireable<import("@jutro/prop-types/src/availableValuePropTypes").DataTypeShape>;
        /**
         * Array of choice objects to display; choice objects contains 'code' and 'name'
         */
        availableValues: PropTypes.Requireable<(import("@jutro/prop-types").AvailableValueObjectShape | null | undefined)[]>;
        /**
         * Node to render when 'other' value is selected, as processed by `renderContentFromMetadata` method
         * (won't be rendered when value is not 'other')
         */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Map of CSS class names for overriding individual parts of component's styles
         */
        internalClassNames: PropTypes.Requireable<PropTypes.InferProps<{
            control: PropTypes.Requireable<string>;
            controlFocused: PropTypes.Requireable<string>;
            menuList: PropTypes.Requireable<string>;
            option: PropTypes.Requireable<string>;
            selectIcon: PropTypes.Requireable<string>;
        }>>;
        /**
         * When set to `true` options will show the placeholder text and it will be the first option.
         */
        alwaysShowPlaceholder: PropTypes.Requireable<boolean>;
        /**
         * Allows you to type in dropdown field to find options.
         */
        searchable: PropTypes.Requireable<boolean>;
        /**
         * Should dropdown be initially opened
         */
        isInitiallyOpen: PropTypes.Requireable<boolean>;
        /**
         * Default true; and if set to false, it will bypass menuPortalTarget prop in SelectComponent
         */
        usePortal: PropTypes.Requireable<boolean>;
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
        availableValues: never[];
        placeholder: {
            id: string;
            defaultMessage: string;
        };
        dataType: string;
        searchable: boolean;
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
    static isContentVisible(value: any): any;
    constructor(props: any);
    getNewValue({ id, value }: {
        id: any;
        value: any;
    }): any;
    /**
     * Handler function for when the select field value is changed
     * @param {object} value - value that is passed when a change occurs
     */
    handleOnChange: (value: object) => void;
    get renderValue(): any;
    get placeholderText(): any;
    get options(): (false | {
        label: any;
        value: string;
    })[];
    getOptionLabel({ label }: {
        label: any;
    }): any;
    getOptionValue({ value }: {
        value: any;
    }): any;
}
/**
 * Renders a dropdown where the user can select one of the values. You specify the allowed values and the
 * action using props.
 */
export type DropdownSelectFieldPropTypes = typeof DropdownSelectField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
