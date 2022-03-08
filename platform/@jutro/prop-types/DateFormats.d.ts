import PropTypes from 'prop-types';
export declare type DateFormats = 'vshort' | 'short' | 'long' | 'abbreviated' | 'full';
declare type DateFormatShape = {
    weekday?: 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
};
declare type DateFormatMapShape = {
    [key in DateFormats]: DateFormatShape;
};
export declare const vshortDateFormat: DateFormatShape;
export declare const shortDateFormat: DateFormatShape;
export declare const longDateFormat: DateFormatShape;
export declare const abbreviatedDateFormat: DateFormatShape;
export declare const fullDateFormat: DateFormatShape;
export declare const dateFormatMap: DateFormatMapShape;
export declare const timeFormat: DateFormatShape;
export declare const dateFormats: Array<DateFormats>;
export declare const dateFormatShape: PropTypes.Requireable<DateFormats>;
export {};
