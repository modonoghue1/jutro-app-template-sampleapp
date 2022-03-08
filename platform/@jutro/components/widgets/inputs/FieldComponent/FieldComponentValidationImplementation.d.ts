/**
 * Implements all the validation methods used on FieldComponent.
 */
export class FieldComponentValidationImplementation {
    bind(entityToBind: any): {};
    componentDidMount(): any;
    getValidationConfig(rulesConfig: any): {
        propsList: any[];
        options: any;
    };
    componentDidUpdate(prevProps: any): any;
    componentWillUnmount(): void;
    /**
     * Get the validation messages to display.
     * If field is 'required' and no validation message is provided, it is added
     *
     * @param {*} [value] current value of input
     * @returns {Array} validation messages
     */
    getValidationMessages(): any[];
    validate(): undefined;
    notifyChange(): undefined;
    getMessages(): undefined;
    /**
     * Handle 'focus' events for 'input' elements with validation.
     * This method is not included by default. Derived class will need to include this in their `renderControl()` method
     *
     * @param {object} evt - React event wrapper
     */
    handleFocus(): void;
    handleBlur(): void;
    /**
     * Render messages for this component. Messages are expected to be translated before passing in.
     *
     * @param {Array<any>} errorMessage - error messages to render
     * @param {string} successMessage - info message to render
     * @param {boolean} isValid - indicates whether the component is valid or not
     * @returns {React.ReactElement}   JSX for the messages
     */
    renderMessages(errorMessage: Array<any>, successMessage: string, isValid: boolean): React.ReactElement;
    isValid(validationMessages: any): boolean;
    getRules(): {
        validationRules: any;
        options: any;
        onIsValid: any;
    };
}
import React from "react";
