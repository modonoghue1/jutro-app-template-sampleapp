import { IntlMessageShape } from './intlMessageShape';
export declare type ValidationMessageShapeType = {
    message?: IntlMessageShape;
    details?: IntlMessageShape;
    type: 'error' | 'warning';
};
export declare type InternalDataType = string | number | boolean;
export declare type FormDataType = Record<string, InternalDataType>;
export declare type ResolveFormValidationType = (path: string, value?: FormDataType, id?: string) => ValidationMessageShapeType | IntlMessageShape | undefined;
