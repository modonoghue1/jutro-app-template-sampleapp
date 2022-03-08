import React from 'react';
import { DateValueShape, IntlMessageShape } from '@jutro/prop-types';
import { DateFieldPropTypes } from '../DateField/DateField.commons';
import { TimeFieldPropTypes } from '../TimeField/TimeField';
export declare type DateTimeFieldPropTypes = Omit<TimeFieldPropTypes & DateFieldPropTypes, 'value'> & {
    /**
     * Date and time to display
     */
    value?: DateValueShape;
    /**
     * Set the default field value on render if there is a default value; needs onValueChange to work
     */
    defaultValue?: DateValueShape;
    /**
     * Show timepicker
     */
    showTime?: boolean;
    /**
     * Callback when blur event is fired in time picker
     */
    onBlurTime?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * Callback when focus event is fired in time picker
     */
    onFocusTime?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * If true, time picker is required
     */
    requiredTime?: boolean;
    /**
     * Show errors for time picker
     */
    showErrorsTime?: boolean;
    /**
     * Show required indicator for time picker
     */
    showRequiredTime?: boolean;
    /**
     * Show optional indicator for time picker
     */
    showOptionalTime?: boolean;
    /**
     * Intl message for time picker label
     */
    labelTime?: IntlMessageShape;
    /**
     * Intl message for time picker label
     */
    secondaryLabelTime?: IntlMessageShape;
    /**
     * Hides the label on any layout for time picker
     */
    hideLabelTime?: boolean;
    /**
     * Tooltip for time picker
     */
    tooltipTime?: string | Record<string, unknown>;
    /**
     * Intl message for time picker placeholder
     */
    placeholderTime?: IntlMessageShape;
    /**
     * If true, component will not convert selected date to UTC
     */
    preserveTimeZone?: boolean;
};
/**
 * @metadataType field
 */
export declare const DateTimeField: React.FC<DateTimeFieldPropTypes>;
