/**
 * PhoneNumberField is a 'field' component that displays a label, control and message. It can be used to render
 * a phone number mask on a HTML5 <input> element with type 'tel'.
 * @typedef {typeof PhoneNumberField.propTypes} PhoneNumberFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<PhoneNumberFieldPropTypes>>
 *
 * @metadataType field
 */
export class PhoneNumberField extends FieldComponent<PropTypes.InferProps<{
    icon: PropTypes.Requireable<string>;
    iconPosition: PropTypes.Requireable<string>;
    disabled: PropTypes.Requireable<boolean>;
    className: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * The character used in the mask, '_' is used by default.
     * NOTE: Mask char should not be the same as one of possible input characters because this can generate unintended incorrect values.
     */
    maskChar: PropTypes.Requireable<string>;
    /**
     * If true, the mask is always visible
     */
    alwaysShowMask: PropTypes.Requireable<boolean>;
    /**
     * A country code to automatically set the input mask. The codes are based on the two letter ISO 3166-1 codes.
     * Example codes: US, PL, GB, FR, IE
     */
    countryCode: PropTypes.Requireable<string>;
    /**
     * A phone number type used when generating the countryCode based mask. Following are possible values:
     *         FIXED_LINE = 0,
     *         MOBILE = 1,
     *         FIXED_LINE_OR_MOBILE = 2,
     *         TOLL_FREE = 3,
     *         PREMIUM_RATE = 4,
     *         SHARED_COST = 5,
     *         VOIP = 6,
     *         PERSONAL_NUMBER = 7,
     *         PAGER = 8,
     *         UAN = 9,
     *         VOICEMAIL = 10,
     */
    phoneNumberType: PropTypes.Requireable<number>;
    /**
     * If set to true, the mask will be prefixed with the country code. Works only
     * in combination with coutryCode
     */
    withCountryPrefix: PropTypes.Requireable<boolean>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Validation message for invalid phone number
         */
        invalidPhone: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * Value to display in control
     */
    value: PropTypes.Requireable<string>;
    id: PropTypes.Validator<string>; /**
     * Value to display in control
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
}>> {
    static propTypes: {
        icon: PropTypes.Requireable<string>;
        iconPosition: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * The character used in the mask, '_' is used by default.
         * NOTE: Mask char should not be the same as one of possible input characters because this can generate unintended incorrect values.
         */
        maskChar: PropTypes.Requireable<string>;
        /**
         * If true, the mask is always visible
         */
        alwaysShowMask: PropTypes.Requireable<boolean>;
        /**
         * A country code to automatically set the input mask. The codes are based on the two letter ISO 3166-1 codes.
         * Example codes: US, PL, GB, FR, IE
         */
        countryCode: PropTypes.Requireable<string>;
        /**
         * A phone number type used when generating the countryCode based mask. Following are possible values:
         *         FIXED_LINE = 0,
         *         MOBILE = 1,
         *         FIXED_LINE_OR_MOBILE = 2,
         *         TOLL_FREE = 3,
         *         PREMIUM_RATE = 4,
         *         SHARED_COST = 5,
         *         VOIP = 6,
         *         PERSONAL_NUMBER = 7,
         *         PAGER = 8,
         *         UAN = 9,
         *         VOICEMAIL = 10,
         */
        phoneNumberType: PropTypes.Requireable<number>;
        /**
         * If set to true, the mask will be prefixed with the country code. Works only
         * in combination with coutryCode
         */
        withCountryPrefix: PropTypes.Requireable<boolean>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Validation message for invalid phone number
             */
            invalidPhone: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Value to display in control
         */
        value: PropTypes.Requireable<string>;
        id: PropTypes.Validator<string>; /**
         * Value to display in control
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
        countryCode: string;
        maskChar: string;
        phoneNumberType: number;
        value: string;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): Record<string, any> | null;
    static getMask({ countryCode, phoneNumberType, withCountryPrefix }: {
        countryCode: any;
        phoneNumberType: any;
        withCountryPrefix: any;
    }): string;
    constructor(props: any);
    /**
     * Render control for this component.
     *
     * @returns {React.ReactElement} JSX for the control
     */
    renderInput(): React.ReactElement;
}
/**
 * PhoneNumberField is a 'field' component that displays a label, control and message. It can be used to render
 * a phone number mask on a HTML5 <input> element with type 'tel'.
 */
export type PhoneNumberFieldPropTypes = typeof PhoneNumberField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
