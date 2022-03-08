import PropTypes from 'prop-types';
import { IntlShape } from 'react-intl';
import type { DataTypeShapeWithDateTime, DateValueShape, IntlMessageShape } from '@jutro/prop-types';
import type { Placement } from '@popperjs/core';
import { FieldIcon } from '../FieldComponent/FieldIcon';
import { FieldComponent } from '../FieldComponent/FieldComponent';
export declare type DateFormatTypes = 'vshort' | 'short' | 'long' | 'abbreviated' | 'full';
export declare const dateFormatMap: {
    [K in DateFormatTypes]: string;
};
export declare const timeFormat = "p";
export declare function getDateFormat(format?: DateFormatTypes): string;
export declare function getTimeFormat(): string;
export declare const minDefaultYear = 1900;
export declare const maxDefaultYear = 2100;
/**
 * Shared field component props
 */
declare type FieldComponentPropTypes = PropTypes.InferProps<typeof FieldComponent.propTypes>;
/**
 * Icon-rendering related props
 */
declare type FieldIconPropTypes = PropTypes.InferProps<typeof FieldIcon.propTypes>;
export declare type DateFieldPropTypes = Omit<FieldIconPropTypes, 'iconPosition'> & FieldComponentPropTypes & {
    /**
     * Display today button
     */
    todayButtonText?: IntlMessageShape;
    /**
     * Max date
     */
    maxDate?: DateValueShape;
    /**
     * Min date
     */
    minDate?: DateValueShape;
    /**
     * If true, field can be cleaned
     */
    isClearable?: boolean;
    /**
     * Date to display
     */
    value?: DateValueShape;
    /**
     * Format of the value
     */
    dataType?: DataTypeShapeWithDateTime;
    /**
     * HTML5 native autoComplete support
     */
    autoComplete?: boolean;
    /**
     * Popper placement option
     */
    popperPlacement?: Placement;
    /**
     * The readonly date format: 'short', 'long', 'abbreviated' or 'full'
     */
    format?: DateFormatTypes;
    /**
     * Include a time selection element in the date picker
     * @deprecated
     */
    showTime?: boolean;
    /**
     * Theme config to apply
     */
    theme?: Record<string, unknown>;
    /**
     * Should dropdown be initially opened
     */
    isInitiallyOpen?: boolean;
    /**
     * Should display the calendar pop-over
     */
    showCalendar?: boolean;
    /**
     * This name will be passed to input name attribute and switched on autocomplete
     */
    name?: string;
    /**
     * Used by jutro-lab-preview-validation package: Sets incorrectInput validation on DateField.
     */
    invalidDate?: boolean | Array<boolean | Record<string, unknown> | string>;
};
export declare type DateFieldInternalPropTypes = {
    /**
     * Start date of date range
     */
    startDate?: DateValueShape;
    /**
     * End date of date range
     */
    endDate?: DateValueShape;
    /**
     * Indicates higher bounds of date range
     */
    selectsStart?: boolean;
    /**
     * Indicates lower bounds of date range
     */
    selectsEnd?: boolean;
};
export declare type DateFieldPropsWithContexts = DateFieldPropTypes & DateFieldInternalPropTypes & {
    locale: Locale;
    localeCode?: string;
    intl?: IntlShape;
    updateFlag: boolean;
};
export {};
