import { DateValueShape } from '@jutro/prop-types';
export declare function isDateInRange(date: Date, minDateShape?: DateValueShape, maxDateShape?: DateValueShape, includeTime?: boolean): {
    fulfillMinRequirement: boolean;
    fulfillMaxRequirement: boolean;
};
export declare function validateDateUserInput(input: string | undefined, patterns: string[]): boolean;
