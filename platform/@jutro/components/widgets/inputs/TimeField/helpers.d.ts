import { OptionTypeBase } from 'react-select';
import { Time } from './types';
export declare function generateTimeIntervals(intervalPeriod: number, format: string, min?: Time | boolean, max?: Time | boolean): Array<OptionTypeBase>;
export declare function filterOptions({ value }: OptionTypeBase, rawInput: string): boolean;
export declare function isInRange(value?: Date | Time, min?: Time | boolean, max?: Time | boolean): boolean;
