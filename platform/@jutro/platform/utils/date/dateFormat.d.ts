import { DataTypeShapeWithDateTime, DateValueShape, DateFormats } from '@jutro/prop-types';
export declare function formatDateToDataType(date: Date, dataType?: DataTypeShapeWithDateTime, includeTime?: boolean): DateValueShape;
export declare function parseDateFromDataType(value: DateValueShape, includeTime?: boolean): Date;
export declare function formatDateToLocalePattern(date: Date | null, localeCode?: string, dateFormat?: DateFormats): string | undefined;
