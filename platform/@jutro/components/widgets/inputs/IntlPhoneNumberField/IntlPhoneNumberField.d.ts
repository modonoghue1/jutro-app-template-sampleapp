/**
 * IntlPhoneNumberField is a 'field' component that displays a label, control and message. It can be used to render
 *  for entering and validating international telephone numbers.
 *
 * @typedef {typeof IntlPhoneNumberField.propTypes} IntlPhoneNumberFieldPropTypes properties for IntlPhoneNumberField component
 * @extends FieldComponent<PropTypes.InferProps<IntlPhoneNumberFieldPropTypes>>
 * @returns {React.ReactElement}
 *
 * @metadataType field
 */
export class IntlPhoneNumberField extends FieldComponent<PropTypes.InferProps<{
    /**
     * Type of returned value in onValeChange callback
     */
    dataType: PropTypes.Requireable<string>;
    /**
     * Phone number value.
     * Passed as a string f.eg. "+48600500400" or phone shape f.eg.
     * {countryCode: { code: "PL" }, phoneNumber: "600500400"}
     * countryCode has to be iso2 country code lower or upper case.
     */
    value: PropTypes.Requireable<string | PropTypes.InferProps<{
        countryCode: PropTypes.Requireable<PropTypes.InferProps<{
            code: PropTypes.Validator<string>;
        }>>;
        phoneNumber: PropTypes.Validator<string>;
    }>>;
    /**
     * Default country code to be rendered. Must be in iso2 country code string.
     */
    defaultCountry: PropTypes.Requireable<string>;
    /**
     * Set country code visibility if rendered in readOnly mode.
     */
    showCountryCodeForReadOnly: PropTypes.Requireable<boolean>;
    /**
     * Hide the country dropdown, the country number is always displayed.
     */
    noDropdown: PropTypes.Requireable<boolean>;
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
    contentContainerClassName: PropTypes.Requireable<string>; /**
     * Phone number value.
     * Passed as a string f.eg. "+48600500400" or phone shape f.eg.
     * {countryCode: { code: "PL" }, phoneNumber: "600500400"}
     * countryCode has to be iso2 country code lower or upper case.
     */
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
    constructor(props: any);
    /**
     * Validation helper to retrieve validation boolean from intl-tel-input
     *
     * @param {boolean} validateNumber - validation state
     */
    validateNumber: (validateNumber: boolean, validationErrorCode: any) => void;
}
export namespace IntlPhoneNumberField {
    const defaultProps: {
        dataType: string;
        showCountryCodeForReadOnly: boolean;
        noDropdown: boolean;
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
    const propTypes: {
        /**
         * Type of returned value in onValeChange callback
         */
        dataType: PropTypes.Requireable<string>;
        /**
         * Phone number value.
         * Passed as a string f.eg. "+48600500400" or phone shape f.eg.
         * {countryCode: { code: "PL" }, phoneNumber: "600500400"}
         * countryCode has to be iso2 country code lower or upper case.
         */
        value: PropTypes.Requireable<string | PropTypes.InferProps<{
            countryCode: PropTypes.Requireable<PropTypes.InferProps<{
                code: PropTypes.Validator<string>;
            }>>;
            phoneNumber: PropTypes.Validator<string>;
        }>>;
        /**
         * Default country code to be rendered. Must be in iso2 country code string.
         */
        defaultCountry: PropTypes.Requireable<string>;
        /**
         * Set country code visibility if rendered in readOnly mode.
         */
        showCountryCodeForReadOnly: PropTypes.Requireable<boolean>;
        /**
         * Hide the country dropdown, the country number is always displayed.
         */
        noDropdown: PropTypes.Requireable<boolean>;
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
        contentContainerClassName: PropTypes.Requireable<string>; /**
         * Phone number value.
         * Passed as a string f.eg. "+48600500400" or phone shape f.eg.
         * {countryCode: { code: "PL" }, phoneNumber: "600500400"}
         * countryCode has to be iso2 country code lower or upper case.
         */
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
    const displayName: string;
}
/**
 * properties for IntlPhoneNumberField component
 */
export type IntlPhoneNumberFieldPropTypes = typeof IntlPhoneNumberField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
