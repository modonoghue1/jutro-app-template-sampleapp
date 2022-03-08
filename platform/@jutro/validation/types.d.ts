import { Translator } from '@jutro/locale';
import { DateValueShape, IntlMessageShape, InternalDataType, FormDataType, ResolveFormValidationType, ValidationMessageShapeType } from '@jutro/prop-types';
declare type FileDataType = {
    size: number;
    type: string;
};
export interface FileDataInterface {
    fileName: string;
    file: FileDataType;
}
export declare type RuleCallbackType = (value: FormDataType | InternalDataType | FileDataInterface, path: string, translator: Translator) => string | ValidationMessageShapeType | IntlMessageShape | undefined;
export declare type RulesType = {
    [key: string]: RuleCallbackType | RuleCallbackType[];
};
export declare type InputPatternFunction = (input: string, message: IntlMessageShape | ValidationMessageShapeType | undefined) => IntlMessageShape | ValidationMessageShapeType | undefined;
declare type OnValidationChangeType = (isValid: boolean, validationMessages: Record<string, FormMessageShapeType>, hasWarnings: boolean) => boolean;
declare type FormModeType = 'opaque' | 'transparent';
export interface UseValidationInterface {
    formData: FormDataType;
    formPath?: string;
    formRules: RulesType;
    formInvalidMessage: IntlMessageShape;
    formMode: FormModeType;
    onValidationChange: OnValidationChangeType;
    isValidationIgnored?: boolean;
}
export declare type RuleConfig = string | number | boolean | DateValueShape;
export declare type RuleConfigTuple = [RuleConfig, IntlMessageShape?];
export declare type RuleConfigOptions = Record<string, any>;
export declare type RuleFactory = (ruleParams: RuleConfigTuple, options?: RuleConfigOptions) => RuleCallbackType;
export declare type DateRuleConfigTuple = [DateValueShape, IntlMessageShape?];
export declare type DateRuleFactory = (ruleParams: DateRuleConfigTuple, options?: RuleConfigOptions) => RuleCallbackType;
export declare type FormMessageShapeType = ValidationMessageShapeType | IntlMessageShape;
export declare type FormMessagesType = Record<string, FormMessageShapeType>;
export declare type FieldMessagesKeys = 'required' | 'minValue' | 'maxValue' | 'email' | 'alphanumeric' | 'lowercase' | 'uppercase' | 'url' | 'regex' | 'incompleteInput' | 'invalidPhone' | 'maxFileNameLengthMessage' | 'incorrectFileTypeMessage' | 'maxFileSizeKBMessage' | 'minDate' | 'maxDate' | 'invalidDate';
export declare type RegisterValidationType = (path: string, rulesConfig: RuleConfigTuple | RuleConfig, options?: RuleConfigOptions, onIsValidCallback?: (x: unknown) => void) => void;
export declare type NotifyParentFormType = (path: string, message?: IntlMessageShape | ValidationMessageShapeType) => void;
export interface UseValidationReturnInterface {
    registerValidation: RegisterValidationType;
    notifyParentForm: NotifyParentFormType;
    resolveFormValidation: ResolveFormValidationType;
}
export declare type FormContextType = {
    registerValidation?: RegisterValidationType;
    resolveFormValidation?: ResolveFormValidationType;
    notifyParentForm?: NotifyParentFormType;
};
export declare type ValidationCallbackType = {
    [key: string]: (x: unknown) => void;
};
export declare type MultipleMessageMapType = {
    [key: string]: boolean;
};
export {};
