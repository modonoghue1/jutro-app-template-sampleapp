/**
 * @typedef {typeof LookupField.propTypes} LookupFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<LookupFieldPropTypes>>
 *
 * @metadataType field
 */
export class LookupField extends FieldComponent<PropTypes.InferProps<{
    /**
     * Array of choice objects to display
     */
    availableValues: PropTypes.Requireable<(PropTypes.InferProps<{
        type: PropTypes.Validator<string>;
        id?: React.Validator<string | number | null | undefined> | undefined;
        displayName?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        subtitle?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        secondaryLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    }> | null | undefined)[]>;
    /**
     * Description for available option types
     */
    optionTypes: PropTypes.Requireable<(PropTypes.InferProps<{
        type: PropTypes.Validator<string>;
        icon: PropTypes.Validator<string>;
        className: PropTypes.Requireable<string>;
        displayName: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    }> | null | undefined)[]>;
    /**
     * The message to display when a new options is being created by the user.
     */
    createNewMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Set the default field value on render if there is a default value; needs onValueChange to work
     */
    defaultValue: PropTypes.Requireable<PropTypes.InferProps<{
        type: PropTypes.Validator<string>;
        id?: React.Validator<string | number | null | undefined> | undefined;
        displayName?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        subtitle?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        secondaryLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    }>>;
    /**
     * If true ClearIndicator will be shown
     */
    isClearable: PropTypes.Requireable<boolean>;
    /**
     * Function for asynchronous data loading
     */
    onLoadValues: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback when new items created
     */
    onAddNew: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * If true then recently viewed bar will be shown
     */
    showRecentlyViewed: PropTypes.Requireable<boolean>;
    /**
     * The message to display for recently viewed bar.
     */
    recentlyViewedMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Value to display in control
     */
    value: PropTypes.Requireable<PropTypes.InferProps<{
        type: PropTypes.Validator<string>;
        id?: React.Validator<string | number | null | undefined> | undefined;
        displayName?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        subtitle?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        secondaryLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    }>>;
    /**
     * Should dropdown be initially opened
     */
    isInitiallyOpen: PropTypes.Requireable<boolean>;
    /**
     * Map of CSS class names for overriding individual parts of component's styles
     */
    internalClassNames: PropTypes.Requireable<object>;
    id: PropTypes.Validator<string>; /**
     * The message to display when a new options is being created by the user.
     */
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
         * Array of choice objects to display
         */
        availableValues: PropTypes.Requireable<(PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            id?: React.Validator<string | number | null | undefined> | undefined;
            displayName?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
            subtitle?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
            secondaryLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        }> | null | undefined)[]>;
        /**
         * Description for available option types
         */
        optionTypes: PropTypes.Requireable<(PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            icon: PropTypes.Validator<string>;
            className: PropTypes.Requireable<string>;
            displayName: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }> | null | undefined)[]>;
        /**
         * The message to display when a new options is being created by the user.
         */
        createNewMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Set the default field value on render if there is a default value; needs onValueChange to work
         */
        defaultValue: PropTypes.Requireable<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            id?: React.Validator<string | number | null | undefined> | undefined;
            displayName?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
            subtitle?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
            secondaryLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        }>>;
        /**
         * If true ClearIndicator will be shown
         */
        isClearable: PropTypes.Requireable<boolean>;
        /**
         * Function for asynchronous data loading
         */
        onLoadValues: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when new items created
         */
        onAddNew: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * If true then recently viewed bar will be shown
         */
        showRecentlyViewed: PropTypes.Requireable<boolean>;
        /**
         * The message to display for recently viewed bar.
         */
        recentlyViewedMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Value to display in control
         */
        value: PropTypes.Requireable<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            id?: React.Validator<string | number | null | undefined> | undefined;
            displayName?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
            subtitle?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
            secondaryLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        }>>;
        /**
         * Should dropdown be initially opened
         */
        isInitiallyOpen: PropTypes.Requireable<boolean>;
        /**
         * Map of CSS class names for overriding individual parts of component's styles
         */
        internalClassNames: PropTypes.Requireable<object>;
        id: PropTypes.Validator<string>; /**
         * The message to display when a new options is being created by the user.
         */
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
        createNewMessage: {
            id: string;
            defaultMessage: string;
        };
        isClearable: boolean;
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
     * handle value change
     * @param {object} value
     */
    handleValueChange: (value: object) => void;
    recent: (PropTypes.InferProps<{
        type: PropTypes.Validator<string>;
        id?: React.Validator<string | number | null | undefined> | undefined;
        displayName?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        subtitle?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        secondaryLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    }> | null | undefined)[] | null | undefined;
    loadValues: (onLoadValues: any) => (...args: any[]) => Promise<(PropTypes.InferProps<{
        type: PropTypes.Validator<string>;
        id?: React.Validator<string | number | null | undefined> | undefined;
        displayName?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        subtitle?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
        secondaryLabel?: React.Validator<import("@jutro/prop-types").IntlMessageShape | null | undefined> | undefined;
    }> | null | undefined)[] | null | undefined>;
    onMenuClose: () => void;
}
export type LookupFieldPropTypes = typeof LookupField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
