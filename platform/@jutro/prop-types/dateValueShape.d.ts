import { Requireable, WeakValidationMap } from 'react';
export declare type DateObjectValueShape = {
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
};
export declare type DateValueShape = number | string | Date | DateObjectValueShape;
export declare const dateObjectValueShape: WeakValidationMap<DateObjectValueShape>;
export declare const dateValueShape: Requireable<DateValueShape>;
export declare type DateRangeValueShape = {
    startDate?: DateValueShape;
    endDate?: DateValueShape;
};
export declare const dateRangeValueShape: Requireable<DateRangeValueShape>;
export declare type DateTimeZoneValueShape = {
    datetime?: DateValueShape;
    timezone?: string;
};
export declare const dateTimeZoneValueProps: WeakValidationMap<DateTimeZoneValueShape>;
export declare const dateTimeZoneValueShape: Requireable<DateTimeZoneValueShape>;
