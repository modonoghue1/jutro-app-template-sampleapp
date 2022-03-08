import { DataTypeShapeWithDateTime, DateObjectValueShape, DateTimeZoneValueShape } from '@jutro/prop-types';
export declare type DateTimeZoneInternal = {
    datetime?: DateObjectValueShape;
    timezone: string;
};
export declare const parseDateTimeZoneFromDataType: (value: DateTimeZoneValueShape, defaultTimeZone: string, showTime?: boolean | undefined) => DateTimeZoneInternal;
export declare const formatDateTimeZoneToDataType: (value: DateTimeZoneInternal, dataType: DataTypeShapeWithDateTime, showTime?: boolean | undefined) => DateTimeZoneValueShape;
