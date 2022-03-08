/**
 * Allows the user to either type or select a date. Displays them according to locale settings.
 *
 * @extends FieldComponent<DateFieldPropsWithContexts>
 *
 * @metadataType field
 */
export class DateFieldInternalDEPRECATED extends FieldComponent<any> {
    static displayName: string;
    constructor(props: any);
    datePickerRef: React.RefObject<any>;
    localePattern: string;
    /**
     * Convert the value which can be either string or object to a date object.
     *
     * @param {string | object} value - The string or object representation of the date
     * @returns {object} - date object
     */
    valueToDate: (value: string | object) => object;
    /**
     * Convert the date object returned by the datepicker to
     * the expected format based on dataType and showTime props.
     *
     * @param {object} [value] - date object
     * @returns {object} - string or date object, always a UTC date
     */
    formatValue: (value?: object) => object;
    adjustDate(date: any, minDate: any, maxDate: any, showTime: any): any;
    getTimeLimits(selectedDate: any, minDate: any, maxDate: any): {
        minTime: any;
        maxTime: Date;
    };
    userInput: any;
    /**
     * Called with a value when the input is edited manually
     *
     * @param {object} [evt] - the event the triggers the change
     */
    handleChangeRaw: (evt?: object) => void;
    /**
     * Check if date is in range
     *
     * @param {object} [date] - the date to process
     * @returns {boolean} `true` if date is in the specified range
     */
    isInRange: (date?: object) => boolean;
    /**
     * Get the placeholder to display.
     * If no placeholder is provided it returns date format for locale.
     *
     * @param {intlMessageShape} [placeholder] placeholder provided by props
     * @param {object} [translator] instance of translator for placeholder provided by props
     * @returns {string} placeholder
     */
    getPlaceholderOrDefault(placeholder?: React.Requireable<import("@jutro/prop-types").IntlMessageShape> | undefined, translator?: object): string;
    /**
     * Renders wrapped calendar element
     *
     * @param {string} [labelId] - id of the label element assigned to this field
     * @returns {Function} container component for calendar popper
     */
    renderPopperContainer: (labelId?: string | undefined) => Function;
    /**
     * Renders custom header.
     *
     * @param {object} [props] - props for custom header
     *
     * @returns {React.ReactElement} - the resulting rendered header
     */
    renderCustomHeader: (props?: object) => React.ReactElement;
    /**
     * Sets focusPristine to false when input loses focus through clicking on datepicker
     *
     * @param {object} evt - React event wrapper
     */
    handleOnBlur: (evt: object) => void;
    /**
     * set focus on select to prevent mishandling of focus state when clicking on elements in the custom header
     */
    setFocus: () => void;
    renderTodayButton: (todayButtonText: any) => JSX.Element;
    handleKeyDown: (e: any) => void;
}
import { FieldComponent } from "../FieldComponent/FieldComponent";
import React from "react";
