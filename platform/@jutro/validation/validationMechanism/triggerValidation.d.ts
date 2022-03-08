import { Translator } from '@jutro/locale';
import { FormDataType } from '@jutro/prop-types';
import type { FormMessagesType, MultipleMessageMapType, RulesType } from '../types';
interface TriggerValidationInterface {
    fieldRules: RulesType;
    formRules: RulesType;
    formData: FormDataType;
    nestedFormMessages?: FormMessagesType;
    translator: Translator;
    multipleMessagesMap?: MultipleMessageMapType;
}
export declare const triggerValidation: ({ fieldRules, formRules, formData, nestedFormMessages, translator, multipleMessagesMap, }: TriggerValidationInterface) => FormMessagesType;
export {};
