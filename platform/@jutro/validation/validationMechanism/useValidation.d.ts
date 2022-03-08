/// <reference types="react" />
import type { UseValidationInterface, UseValidationReturnInterface, FormContextType } from '../types';
/**
 * A hook to be used to process validation on a Form using Jutro field components.
 *
 * @param {Object} props validtion props
 * @param {any} props.formData the current value of the data object for the form being validated.
 * @param {string} props.formPath an optional parameter which sets a path for a given form. This allows the form to be used simarly to any field type component.
 * @param {Object} props.formRules object with form level rules.
 *   Object keys should match the path of the form data for which the rule is to be applied.
 *   '*' operator can be used so that a rule is run on all fields.
 *   object values can be a single function or an array of functions.
 * @param {string|object} props.formInvalidMessage the value to debounce
 * @param {string} [props.formMode=opaque] - choose between 'opaque' or 'transparent'. Ff the form is 'opaque' validation on nested forms will grouped together as a single error and passed to the parent form.Object
 *   if the form is 'transparent' the child form validation will be flattened to the parent form and it will be as if the individual fields are all defined on the parent form.
 * @param {function} props.onValidationChange callback function that gets triggered upon changes to the form validation.
 * @param {boolean} props.isValidationIgnored disable the validation mechanism using a boolean toggle.

 * @param {number} FormContext the context for the parent form at the root of the validation mechanism. Allows for using forms as aggregated components
 * @returns {Object}
 *      registerValidation - callback function used to be bound onto field components via a prop with the same name.
 *      notifyParentForm - callback function to be passed into form context, allows children forms to communicate validation pieces to parent forms.
 *      resolveFormValidation - metadata resolvers for form validation messages.
 */
export declare const useValidation: ({ formData, formPath, formRules, formInvalidMessage, formMode, onValidationChange, isValidationIgnored, }: UseValidationInterface, FormContext?: import("react").Context<FormContextType>) => UseValidationReturnInterface | Record<string, never>;
