import React, { ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import type { ReactDatePickerProps } from 'react-datepicker';
import { IntlMessageShape, DateValueShape } from '@jutro/prop-types';
import { FieldComponent } from '../FieldComponent/FieldComponent';
import { DateFieldPropsWithContexts } from './DateField.commons';
declare type PopperComponent = (props: {
    children: React.ReactNode[];
}) => React.ReactNode;
declare type HeaderComponent = ReactDatePickerProps['renderCustomHeader'];
declare type DateFieldInternalNewState = {
    /**
     * Store focused in state to format value passed to DateField
     * after user exits the field
     */
    isFocused: boolean;
    focused: boolean;
    isValidDate: boolean;
    isOpen?: boolean;
    calendarId?: string;
    /**
     * Store the entered value to let user modify it in case its not in correct format
     */
    userInput?: string;
};
declare type ValidationImplementationType = {
    getValidationMessages(...args: any[]): any;
    handleChangeRaw(evt: React.ChangeEvent<HTMLInputElement>): any;
    handleDateChange(date: Date): any;
    getValue(value?: DateValueShape): any;
};
/**
 * Allows the user to either type or select a date. Displays them according to locale settings.
 *
 * @type {import("./DateField").DateFieldPropsWithContexts}
 * @extends {FieldComponent<DateFieldPropsWithContexts>}
 *
 * @metadataType field
 */
export declare class DateFieldInternal extends FieldComponent<DateFieldPropsWithContexts> {
    datePickerRef: React.MutableRefObject<DatePicker | null>;
    localePattern: string;
    userInput: string | undefined;
    ongoingUserInput: boolean;
    validationImplementation: ValidationImplementationType;
    constructor(props: DateFieldPropsWithContexts);
    static displayName: string;
    state: DateFieldInternalNewState;
    /**
     * Renders the content for this component
     *
     * @returns {React.ReactElement} - The resulting rendered component
     */
    render(): ReactElement;
    validationDependencyProps: string[];
    componentDidUpdate(...args: [DateFieldPropsWithContexts]): void;
    getValue(value?: DateValueShape): DateValueShape;
    /**
     * Convert the date object returned by the datepicker to
     * the expected format based on dataType props.
     *
     * @param {object} [value] - date object
     * @returns {object} - string or date object, always a UTC date
     */
    formatValue: (value: Date) => DateValueShape;
    /**
     * Handles user triggered date changes
     *
     * @param {Date} [date] the date that the value was changed to
     */
    handleDateChange: (date: Date) => void;
    /**
     * Called with a value when the input is edited manually or date is selected
     *
     * @param {object} [evt] - the event that triggers the change
     */
    handleChangeRaw: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Get the validation messages to display.
     * If field is 'required' and no validation message is provided, it is added
     *
     * @returns {Array<any>} validation messages
     */
    getValidationMessages(...args: any[]): any;
    getValidationConfig(): any;
    /**
     * Get the placeholder to display.
     * If no placeholder is provided it returns date format for locale.
     *
     * @param {intlMessageShape} [placeholder] placeholder provided by props
     * @returns {string} placeholder
     */
    getPlaceholderOrDefault(placeholder: IntlMessageShape | undefined | null): string;
    /**
     * Format displaying date using Intl
     */
    getInputValue(): string | undefined;
    /**
     * Renders wrapped calendar element
     *
     * @param {string} [labelId] - id of the label element assigned to this field
     * @returns {Function} container component for calendar popper
     */
    renderPopperContainer: (labelId: string | undefined) => PopperComponent;
    /**
     * Renders custom header.
     *
     * @param {object} [props] - props for custom header
     *
     * @returns {React.ReactElement} - the resulting rendered header
     */
    renderCustomHeader: HeaderComponent;
    handleFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
    handleBlur: (evt: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * set focus on select to prevent mishandling of focus state when clicking on elements in the custom header
     */
    setFocus: () => void;
    /**
     * Render readonly control for this component.
     * @param {object} breakpointProps - breakpoint-specific props
     * @returns {React.ReactElement} JSX for the control
     */
    renderControlReadOnly(breakpointProps: DateFieldPropsWithContexts): ReactElement;
    renderTodayButton: (todayButtonText?: IntlMessageShape | undefined) => React.ReactNode;
    handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    /**
     * Render the control
     *
     * @param {object} breakpointProps - breakpoint-specific props
     * @param {object} [options] - some options?
     * @returns {React.ReactElement} - The resulting rendered DateField
     */
    renderControl(breakpointProps: DateFieldPropsWithContexts, options: {
        labelId?: string;
        isValid?: boolean;
    }): ReactElement;
}
export {};
