/**
 * @typedef {typeof ColorPicker.propTypes} ColorPickerPropTypes
 * @extends FieldComponent<PropTypes.InferProps<ColorPickerPropTypes>>
 *
 * @metadataType field
 * @deprecated
 */
export class ColorPicker extends FieldComponent<PropTypes.InferProps<{
    /**
     * sets the values for the color selector and input field.
     */
    value: PropTypes.Requireable<string>;
    /**
     * default position for the color selector to render if there is insufficient space above and below input field.
     */
    placement: PropTypes.Requireable<string>;
    /**
     * allows user to type into input field if active.
     */
    openTyping: PropTypes.Requireable<boolean>;
    /**
     * size of the color preview span. 'small' or 'medium' as default
     */
    colorPreviewSize: PropTypes.Requireable<string>;
    /**
     * Should dropdown be initially opened
     */
    isInitiallyOpen: PropTypes.Requireable<boolean>;
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
    layout: PropTypes.Requireable<string>; /**
     * handles input box if openTyping is enabled
     *
     * @param {object} evt - React event wrapper
     */
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
         * sets the values for the color selector and input field.
         */
        value: PropTypes.Requireable<string>;
        /**
         * default position for the color selector to render if there is insufficient space above and below input field.
         */
        placement: PropTypes.Requireable<string>;
        /**
         * allows user to type into input field if active.
         */
        openTyping: PropTypes.Requireable<boolean>;
        /**
         * size of the color preview span. 'small' or 'medium' as default
         */
        colorPreviewSize: PropTypes.Requireable<string>;
        /**
         * Should dropdown be initially opened
         */
        isInitiallyOpen: PropTypes.Requireable<boolean>;
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
        layout: PropTypes.Requireable<string>; /**
         * handles input box if openTyping is enabled
         *
         * @param {object} evt - React event wrapper
         */
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
        placement: string;
        openTyping: boolean;
        value: string;
        placeholder: string;
        required: boolean;
        disabled: boolean;
        autoTrim: boolean;
        schemaRequired: boolean;
        readOnly: boolean;
        showErrors: boolean;
        hideLabel: boolean;
        showValidationIcon: boolean;
        dataPath: string;
        labelPosition: string;
        dataType: string;
    };
    constructor(props: any);
    colorSelectorRef: React.RefObject<any>;
    inputRef: React.RefObject<any>;
    setClickListener: () => void;
    unsetClickListener: () => void;
    setPageListeners: () => void;
    unsetPageListeners: () => void;
    /**
     * Hides color selector
     * @param {object} [evt] - event to react to
     */
    hideColorSelector: (evt?: object) => void;
    /**
     * Toggles color selector
     * @param {boolean} [showOrHide] - flag whether to show or hide the color selector
     */
    toggleColorSelector: (showOrHide?: boolean | undefined) => void;
    /**
     * helper function to get height of chrome picker including margin respective to input field depending where it's currently rendered
     *
     * @returns {number} - height of chrome picker with bottom or top margin
     */
    getColorSelectorHeight(): number;
    /**
     * if position of color selector won't fit in screen it will change it's placement with respect to input field
     *  If it fits both or doesn't fit both it reverts to default.
     *
     */
    updatePlacement: () => void;
    /**
     * handles input box if openTyping is enabled
     *
     * @param {object} evt - React event wrapper
     */
    handleTextInputChange: (evt: object) => void;
    /**
     * Disables the input edit mode when user leaves the input and calls default FieldComponent.onBlur method
     *
     * @param {object} evt - React event wrapper
     */
    handleOnBlur: (evt: object) => void;
    /**
     * Enables the input edit mode when user focuses on the input and calls default FieldComponent.onFocus method
     *
     * @param {object} evt - React event wrapper
     */
    handleOnFocus: (evt: object) => void;
    /**
     * Enables the user to toggle the color selector with 'space bar'  when user focuses on the input
     *
     * @param {object} evt - React event wrapper
     */
    inputSectionKeyDown: (evt: object) => void;
    /**
     * updates color via 'react-color' tool when value is changed
     *
     * @param {object} color - color object provided by 'react-color' package
     * @returns {string}
     */
    onColorSelectorChangeComplete: (color: object) => string;
    /**
     * parses color object value to a string depending on type of color source
     *
     * @param {object} color - color object provided by 'react-color' package
     * @returns {string}
     */
    parseInputValue(color: object): string;
    /**
     * appends a hash if input string is of hex format without '#'
     *
     * @param {String|Object} input - color object provided by 'react-color' package or input string
     * @returns {string}
     */
    setHashCSSVariable: (input: string | any) => string;
    /**
     * if open Typing is enabled and the selector is open this function will
     * stop the selector from closing if the user clicks on the text input section
     *
     * @param {object} evt - input text field
     */
    keepSelectorOpen: (evt: object) => void;
}
export namespace ColorPicker {
    const displayName: string;
}
export type ColorPickerPropTypes = typeof ColorPicker.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
