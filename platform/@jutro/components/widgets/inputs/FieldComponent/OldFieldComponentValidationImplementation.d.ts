/**
 * Implements all the validation methods used on FieldComponent.
 */
export class OldFieldComponentValidationImplementation {
    bind(entityToBind: any): {};
    componentDidMount(): undefined;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    /**
     * get rules - needed in new validation implementation
     *
     */
    getRules(): undefined;
    /**
     * Get the validation messages to display.
     * If field is 'required' and no validation message is provided, it is added
     *
     * @param {*} [value] current value of input
     * @returns {Array} validation messages
     */
    getValidationMessages(value?: any): any[];
    /**
     * validate the selected value for 'input' elements.
     * This method will triggered validation if value is changed for required field.
     *
     * @param {any} value  - selected value to validate
     * @param {any} prevValue  - previous value to get previous messages
     * @param {boolean} [noNotification=false]  - optional flag for skipping the validation change notification
     */
    validate(value: any, noNotification?: boolean | undefined): boolean | undefined;
    prevValidationMessages: any[] | undefined;
    valid: boolean | undefined;
    getMessages(validationMessages: any, successMessage: any, isValid: any): {
        errorMessage: () => any;
        successMessage?: undefined;
    } | {
        successMessage: any;
        errorMessage?: undefined;
    } | {
        errorMessage?: undefined;
        successMessage?: undefined;
    };
    /**
     * Helper method to invoke callback when value is changed; useful in derived classes
     *
     * @param {any} value - new value of control to send with notification
     */
    notifyChange(value: any): void;
    handleFocus(): undefined;
    handleBlur(): undefined;
    /**
     * Render messages for this component. Messages are expected to be translated before passing in.
     *
     * @param {Array<any>} validationMessages - error messages to render
     * @param {string} successMessage - info message to render
     * @param {boolean} isValid - indicates whether the component is valid or not
     * @returns {React.ReactElement}   JSX for the messages
     */
    renderMessages(validationMessages: Array<any>, successMessage: string, isValid: boolean): React.ReactElement;
    isValid(validationMessages: any): boolean;
}
import React from "react";
