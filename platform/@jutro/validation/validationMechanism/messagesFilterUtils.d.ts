import type { FormMessagesType } from '../types';
declare type GroupedMessagesType = {
    error: Record<string, any[]>;
    warning: Record<string, any[]>;
};
export declare const excludeMultiMessageWarningsFromMessages: (validationMessages: FormMessagesType) => FormMessagesType;
export declare const groupCurrentValidationMessages: (messageObject: FormMessagesType) => GroupedMessagesType;
export declare const getMessagesCount: (messageObject: Record<string, any[]>) => number;
export {};
