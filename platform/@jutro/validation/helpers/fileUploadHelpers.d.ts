import { FileDataInterface } from '../types';
declare type isMatchesType = (value: FileDataInterface) => (type: string) => boolean;
export declare const isMatches: isMatchesType;
export {};
