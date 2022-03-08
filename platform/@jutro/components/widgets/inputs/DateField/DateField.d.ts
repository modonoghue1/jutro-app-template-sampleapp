import React, { WeakValidationMap } from 'react';
import { DateFieldPropTypes, DateFieldInternalPropTypes } from './DateField.commons';
export declare const dateFormatTypes: readonly ["vshort", "short", "long", "abbreviated", "full"];
export declare const popperPlacementPositions: readonly ["auto", "auto-end", "bottom", "bottom-end", "bottom-start", "left", "left-end", "left-start", "right", "right-end", "right-start", "top", "top-end", "top-start"];
export declare const dateFieldPropTypes: WeakValidationMap<DateFieldPropTypes>;
/**
 * Allows the user to either type or select a date. Displays them according to locale settings.
 * Valid format for manual input is ISO YYYY-MM-DD or MM/DD/YYYY. The time part (for the date and time
 * field) should be appended to the date and follow ISO standard. For example: 2020-05-03T:10:30.
 * Note that time values are assumed to be in client time zone. Unless time zone is explicitly
 * provided through manual input (as per ISO format). Date only input treats dates as UTC dates.
 *
 * @extends {FieldComponent<DateFieldPropTypes>}
 *
 * @metadataType field
 */
export declare const DateField: React.FC<DateFieldPropTypes & DateFieldInternalPropTypes>;
