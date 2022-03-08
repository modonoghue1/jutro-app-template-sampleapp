import { WeakValidationMap, Requireable } from 'react';
import { IntlMessageShape } from './intlMessageShape';
/**
 * To be shared by components that have a 'dataType' prop
 */
export declare const DATA_TYPE_OBJECT = "object";
export declare const DATA_TYPE_STRING = "string";
export declare const DATA_TYPE_NUMBER = "number";
export declare const DATA_TYPE_DATE_TIME = "date-time";
export declare type DataTypeShape = 'object' | 'string';
/**
 * Default prop type for dataType
 */
export declare const dataTypeShape: Requireable<DataTypeShape>;
export declare type DataTypeShapeWithNumber = 'object' | 'string' | 'number';
export declare const dataTypeShapeWithNumber: Requireable<DataTypeShapeWithNumber>;
export declare type DataTypeShapeWithDateTime = 'object' | 'string' | 'date-time';
export declare const dataTypeShapeWithDateTime: Requireable<DataTypeShapeWithDateTime>;
export declare type AvailableValuesIdDisplayNameObject = {
    id?: string | number;
    displayName?: IntlMessageShape;
    subtitle?: IntlMessageShape;
    secondaryLabel?: IntlMessageShape;
};
export declare const availableValuesIdDisplayNameObject: WeakValidationMap<AvailableValuesIdDisplayNameObject>;
export declare type AvailableValuesCodeNameObject = {
    code?: string | number;
    name?: IntlMessageShape;
    subtitle?: IntlMessageShape;
    secondaryLabel?: IntlMessageShape;
};
export declare const availableValuesCodeNameObject: WeakValidationMap<AvailableValuesCodeNameObject>;
export declare type AvailableValueObjectShape = AvailableValuesIdDisplayNameObject | AvailableValuesCodeNameObject;
/**
 * Format of the available value prop for components using dataType='object'
 */
export declare const availableValueObjectShape: Requireable<AvailableValueObjectShape>;
export declare type DefaultAvailableValuePropType = string | boolean | number | AvailableValuesIdDisplayNameObject;
/**
 * The default prop type for components using availableValues
 */
export declare const defaultAvailableValuePropType: Requireable<DefaultAvailableValuePropType>;
