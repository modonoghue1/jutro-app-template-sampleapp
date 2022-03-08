/**
 * @typedef {typeof Slider.propTypes} SliderPropTypes
 * @extends FieldComponent<PropTypes.InferProps<SliderPropTypes>>
 *
 * @metadataType field
 */
export class Slider extends FieldComponent<PropTypes.InferProps<{
    /**
     * Minimum available slider value
     */
    min: PropTypes.Validator<number>;
    /**
     * Maximum available slider value
     */
    max: PropTypes.Validator<number>;
    /**
     * Current slider value (to create fully controlled component)
     */
    value: PropTypes.Validator<unknown>;
    /**
     * Initial slider value (to create uncontrolled component)
     */
    defaultValue: PropTypes.Requireable<unknown>;
    /**
     * Prop to specify whether indicators should be shown or not
     */
    showIndicators: PropTypes.Requireable<boolean>;
    /**
     * Step between consecutive values
     */
    step: PropTypes.Requireable<number>;
    /**
     * Prop to specify whether notches should be shown or not
     */
    showNotches: PropTypes.Requireable<boolean>;
    /**
     * If set - range selector will be shown
     */
    range: PropTypes.Requireable<boolean>;
    /**
     * Prop to specify minimum range size in case of range selection
     */
    minimumRange: PropTypes.Requireable<number>;
    /**
     * Prop to specify when handle tooltip should be visible
     * - ondrag - tooltip is visible only when user drags handle
     * - onfocus - tooltip is visible only when handle is focused
     * - onblur - tooltip is visible only when handle is blured
     * - always - tooltip is always visible
     */
    handleTooltip: PropTypes.Requireable<string>;
    /**
     * Callback when value changing is completed (to create uncontrolled component)
     */
    onUpdate: PropTypes.Requireable<(...args: any[]) => any>;
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
         * Minimum available slider value
         */
        min: PropTypes.Validator<number>;
        /**
         * Maximum available slider value
         */
        max: PropTypes.Validator<number>;
        /**
         * Current slider value (to create fully controlled component)
         */
        value: PropTypes.Validator<unknown>;
        /**
         * Initial slider value (to create uncontrolled component)
         */
        defaultValue: PropTypes.Requireable<unknown>;
        /**
         * Prop to specify whether indicators should be shown or not
         */
        showIndicators: PropTypes.Requireable<boolean>;
        /**
         * Step between consecutive values
         */
        step: PropTypes.Requireable<number>;
        /**
         * Prop to specify whether notches should be shown or not
         */
        showNotches: PropTypes.Requireable<boolean>;
        /**
         * If set - range selector will be shown
         */
        range: PropTypes.Requireable<boolean>;
        /**
         * Prop to specify minimum range size in case of range selection
         */
        minimumRange: PropTypes.Requireable<number>;
        /**
         * Prop to specify when handle tooltip should be visible
         * - ondrag - tooltip is visible only when user drags handle
         * - onfocus - tooltip is visible only when handle is focused
         * - onblur - tooltip is visible only when handle is blured
         * - always - tooltip is always visible
         */
        handleTooltip: PropTypes.Requireable<string>;
        /**
         * Callback when value changing is completed (to create uncontrolled component)
         */
        onUpdate: PropTypes.Requireable<(...args: any[]) => any>;
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
        showIndicators: boolean;
        range: boolean;
        handleTooltip: string;
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
     * Returns value
     * @returns {number | number[]}
     */
    get value(): number | number[];
    /**
     * Renders formatted number value
     * @param {number} value
     * @returns {React.ReactElement}
     */
    renderValue: (value: number) => React.ReactElement;
    /**
     * @param {[ number, number ]} range
     * @returns {React.ReactElement}
     */
    renderValueRange: ([start, end]: [number, number]) => React.ReactElement;
    /**
     * Handles value change
     * @param {number} value
     */
    onValueChanged: (value: number) => void;
    validateProps(): void;
    styles: {
        [className: string]: string;
    } | undefined;
}
export type SliderPropTypes = typeof Slider.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
