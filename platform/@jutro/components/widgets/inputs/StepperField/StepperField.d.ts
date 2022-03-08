/**
 * Renders a numeric value and buttons to increase or decrease the value.
 * @typedef {typeof StepperField.propTypes} StepperFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<StepperFieldPropTypes>>
 *
 * @metadataType field
 */
export class StepperField extends FieldComponent<PropTypes.InferProps<{
    /**
     * String or number passed as value
     */
    value: PropTypes.Requireable<string | number>;
    /**
     * Default value
     */
    defaultValue: PropTypes.Requireable<string | number>;
    /**
     * Step increment value for the input field
     */
    stepValue: PropTypes.Requireable<number>;
    /**
     * Minimum value for the input field (note: this is different than aspect)
     */
    minValue: PropTypes.Requireable<number>;
    /**
     * Maximum value for the input field (note: this is different than aspect)
     */
    maxValue: PropTypes.Requireable<number>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * stepper decrease button aria-label
         */
        decreaseBtnLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * stepper increase button aria-label
         */
        increaseBtnLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
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
         * String or number passed as value
         */
        value: PropTypes.Requireable<string | number>;
        /**
         * Default value
         */
        defaultValue: PropTypes.Requireable<string | number>;
        /**
         * Step increment value for the input field
         */
        stepValue: PropTypes.Requireable<number>;
        /**
         * Minimum value for the input field (note: this is different than aspect)
         */
        minValue: PropTypes.Requireable<number>;
        /**
         * Maximum value for the input field (note: this is different than aspect)
         */
        maxValue: PropTypes.Requireable<number>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * stepper decrease button aria-label
             */
            decreaseBtnLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * stepper increase button aria-label
             */
            increaseBtnLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
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
        labelPosition: PropTypes.Requireable<string>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
        inputType: PropTypes.Requireable<string>;
        testId: PropTypes.Requireable<string>;
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): Record<string, any> | null;
    constructor(props: any);
    /**
     * Given a number value, will clamp the value within the current max and min
     *
     * @param {number} value - Value to be clamped
     * @returns {number|string} - The clamped number value or an empty string
     */
    getValidValue: (value: number) => number | string;
    /**
     * Checks whether value is between props.minValue and props.maxValue
     *
     * @param {number} value to be tested
     * @returns {boolean} true if the value is between properties boundaries
     */
    isValueInBoundaries: (value: number) => boolean;
    /**
     * Custom handler for `button` element. Increments/decrements the stepper input control
     *
     * @param {object} evt - React event wrapper
     * @param {boolean} increase - indicates whether to increase or decrease the value
     */
    handleStep: (evt: object, increase: boolean) => void;
    /**
     * Custom handler to increase the stepper input control
     *
     * @param {object} evt - React event wrapper
     * @returns {undefined}
     */
    stepUp: (evt: object) => undefined;
    /**
     * Custom handler to decrease the stepper input control
     *
     * @param {object} evt - React event wrapper
     * @returns {undefined}
     */
    stepDown: (evt: object) => undefined;
}
/**
 * Renders a numeric value and buttons to increase or decrease the value.
 */
export type StepperFieldPropTypes = typeof StepperField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
