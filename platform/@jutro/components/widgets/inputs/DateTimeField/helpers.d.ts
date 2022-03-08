import { DataTypeShapeWithDateTime, DateObjectValueShape, DateValueShape } from '@jutro/prop-types';
import { Time } from '../TimeField/types';
export declare type DateTimeObjectValueShape = Partial<DateObjectValueShape> | undefined;
export declare function formatValueToDataType(value: DateTimeObjectValueShape, options: {
    dataType: DataTypeShapeWithDateTime;
    includeTime?: boolean;
    timezone?: string;
    preserveTimeZone?: boolean;
}): DateValueShape | undefined;
export declare function formatValueFromDataType(value: DateValueShape | undefined, options: {
    includeTime?: boolean;
    timezone?: string;
    preserveTimeZone?: boolean;
}): DateTimeObjectValueShape;
export declare function parseBoundaryDate(date?: DateValueShape): string | undefined;
export declare function getMinTime(minDate?: DateValueShape, value?: DateValueShape): Time | boolean | undefined;
export declare function getMaxTime(maxDate?: DateValueShape, value?: DateValueShape): Time | boolean | undefined;
export declare function isValidDate(value: DateTimeObjectValueShape): value is DateObjectValueShape;
export declare function isValidTime(value: DateTimeObjectValueShape): value is Time;
