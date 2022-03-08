import React from 'react';
import { DateRangeValueShape } from '@jutro/prop-types';
import type { IntlMessageShape } from '@jutro/prop-types';
import { DateFieldPropTypes } from '../DateField/DateField.commons';
declare type UnusedDatePropTypes = Pick<DateFieldPropTypes, 'showTime' | 'value' | 'defaultValue'>;
declare type DoublePathProps = {
    startPathValueProp?: string;
    endPathValueProp?: string;
    startPath?: string;
    endPath?: string;
    startDataPath?: string;
    endDataPath?: string;
};
export declare type DateRangePropTypes = Omit<DateFieldPropTypes, keyof UnusedDatePropTypes> & DoublePathProps & {
    value?: DateRangeValueShape;
    defaultValue?: DateRangeValueShape;
    endLabel?: IntlMessageShape;
    endSecondaryLabel?: IntlMessageShape;
    endTooltip?: string | Record<string, unknown>;
    endPlaceholder?: IntlMessageShape;
    endContentContainerClassName?: string;
    endControlClassName?: string;
    endLabelContainerClassName?: string;
    endLabelClassName?: string;
    highlightRange?: boolean;
};
/**
 *
 * @extends {FieldComponent<DateRangeFieldPropTypes>}
 *
 * @metadataType field
 */
export declare const DateRangeField: React.FC<DateRangePropTypes>;
export {};
