import React from 'react';
import { DateTimeZoneValueShape, IntlMessageShape } from '@jutro/prop-types';
import { DateTimeFieldPropTypes } from '../DateTimeField/DateTimeField';
import { TimezoneCode } from './timezones';
export declare type DateTimeZoneFieldPropTypes = Omit<DateTimeFieldPropTypes, 'value'> & {
    value?: DateTimeZoneValueShape;
    defaultValue?: DateTimeZoneValueShape;
    showTimeZone?: boolean;
    labelTimeZone?: IntlMessageShape;
    secondaryLabelTimeZone?: IntlMessageShape;
    tooltipTimeZone?: string | Record<string, unknown>;
    hideLabelTimeZone?: boolean;
    timeZones?: TimezoneCode[];
    defaultTimeZone?: TimezoneCode;
};
/**
 * @metadataType field
 */
export declare const DateTimeZoneField: React.FC<DateTimeZoneFieldPropTypes>;
