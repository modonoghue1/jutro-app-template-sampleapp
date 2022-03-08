/**
 * Renders a control which allows the user to upload a file. Allows you to specify validation and actions for specific events.
 * @typedef {typeof FileUploadField.propTypes} FileUploadFieldPropTypes
 * @extends FieldComponent<PropTypes.InferProps<FileUploadFieldPropTypes>>
 *
 * @metadataType field
 */
export class FileUploadField extends FieldComponent<PropTypes.InferProps<{
    /**
     * File type filter. (eg. '.md,.pdf' or 'audio/*')
     */
    accept: PropTypes.Requireable<string>;
    /**
     * File upload field type (eg. 'thin', etc.)
     */
    type: PropTypes.Validator<string>;
    /**
     * Path to empty dropdown area image
     */
    imageSource: PropTypes.Requireable<string>;
    /**
     * Max length for the input field
     */
    maxLength: PropTypes.Requireable<number>;
    /**
     * Max file size in KB for the input field
     */
    maxFileSizeKB: PropTypes.Requireable<number>;
    /**
     * Callback when valid file is selected
     */
    onUpload: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Message for drag & drop
         */
        emptyUploadAreaMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message for upload file
         */
        uploadFilesMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message for uploaded file
         */
        uploadedFilesMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message for removing file
         */
        removeFileMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message for file name max length
         */
        maxLengthMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message for max file size
         */
        maxFileSizeKBMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Error message to present if the file type is incorrect
         */
        incorrectFileTypeMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message dispayed when file is selected
         */
        uploadSelectedMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message displayed during uploading
         */
        uploadProgressMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message displayed after completed upload
         */
        uploadCompletedMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message displayed when upload is cancelled
         */
        uploadCancelledMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message displayed when upload failed to finish
         */
        uploadFailedMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Message displayed on disabled button in large field
         */
        backgroundUploadFileMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * 'type' prop for the rendered button
     */
    buttonType: PropTypes.Requireable<string>;
    /**
     * 'size' prop for the rendered button
     */
    buttonSize: PropTypes.Requireable<string>;
    /**
     * 'icon' prop for the rendered button
     */
    buttonIcon: PropTypes.Requireable<string>;
    /**
     * Determines if the drag and drop functionality of the component should be disabled
     */
    disableDragAndDrop: PropTypes.Requireable<boolean>;
    /**
     * Total size in bytes of selected file to upload
     */
    total: PropTypes.Requireable<number>;
    /**
     * Current bytes uploaded
     */
    completed: PropTypes.Requireable<number>;
    /**
     * Action triggered when user clicks cancel button during uploading
     */
    onCancel: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Action triggered when user clears selected file
     */
    onFileClear: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Current state of upload
     */
    uploadState: PropTypes.Requireable<string>;
    /**
     * User defined error message on failed upload
     */
    progressErrorMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    id: PropTypes.Validator<string>;
    label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
        id: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<string>;
        placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
        text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        renderContent: PropTypes.Requireable<(...args: any[]) => any>;
    }>>;
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    required: PropTypes.Requireable<boolean | any[]>;
    schemaRequired: PropTypes.Requireable<boolean>;
    readOnly: PropTypes.Requireable<boolean>;
    disabled: PropTypes.Requireable<boolean>;
    nullable: PropTypes.Requireable<boolean>;
    visible: PropTypes.Requireable<boolean>;
    value: PropTypes.Requireable<any>;
    defaultValue: PropTypes.Requireable<any>; /**
     * Current bytes uploaded
     */
    autoTrim: PropTypes.Requireable<boolean>;
    onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
    onBlur: PropTypes.Requireable<(...args: any[]) => any>;
    onFocus: PropTypes.Requireable<(...args: any[]) => any>;
    model: PropTypes.Requireable<object>;
    path: PropTypes.Requireable<string>;
    showErrors: PropTypes.Requireable<boolean>;
    showRequired: PropTypes.Requireable<boolean>;
    showOptional: PropTypes.Requireable<boolean>;
    validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
    layout: PropTypes.Requireable<string>;
    hideLabel: PropTypes.Requireable<boolean>;
    className: PropTypes.Requireable<string>;
    contentContainerClassName: PropTypes.Requireable<string>;
    controlClassName: PropTypes.Requireable<string>;
    labelClassName: PropTypes.Requireable<string>;
    secondaryLabelClassName: PropTypes.Requireable<string>;
    labelContainerClassName: PropTypes.Requireable<string>;
    showValidationIcon: PropTypes.Requireable<boolean>;
    dataPath: PropTypes.Requireable<string>;
    validator: PropTypes.Requireable<PropTypes.InferProps<{
        pattern: PropTypes.Validator<string>;
        message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    requiredFieldValidationMessage: PropTypes.Requireable<string>;
    successMessage: PropTypes.Requireable<string>;
    labelPosition: PropTypes.Requireable<string>;
    phone: PropTypes.Requireable<object>;
    phoneWide: PropTypes.Requireable<object>;
    tablet: PropTypes.Requireable<object>;
    inputType: PropTypes.Requireable<string>;
    testId: PropTypes.Requireable<string>;
    registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
    enableMultipleValidation: PropTypes.Requireable<boolean>;
}>> {
    static propTypes: {
        /**
         * File type filter. (eg. '.md,.pdf' or 'audio/*')
         */
        accept: PropTypes.Requireable<string>;
        /**
         * File upload field type (eg. 'thin', etc.)
         */
        type: PropTypes.Validator<string>;
        /**
         * Path to empty dropdown area image
         */
        imageSource: PropTypes.Requireable<string>;
        /**
         * Max length for the input field
         */
        maxLength: PropTypes.Requireable<number>;
        /**
         * Max file size in KB for the input field
         */
        maxFileSizeKB: PropTypes.Requireable<number>;
        /**
         * Callback when valid file is selected
         */
        onUpload: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Message for drag & drop
             */
            emptyUploadAreaMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message for upload file
             */
            uploadFilesMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message for uploaded file
             */
            uploadedFilesMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message for removing file
             */
            removeFileMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message for file name max length
             */
            maxLengthMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message for max file size
             */
            maxFileSizeKBMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Error message to present if the file type is incorrect
             */
            incorrectFileTypeMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message dispayed when file is selected
             */
            uploadSelectedMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message displayed during uploading
             */
            uploadProgressMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message displayed after completed upload
             */
            uploadCompletedMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message displayed when upload is cancelled
             */
            uploadCancelledMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message displayed when upload failed to finish
             */
            uploadFailedMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Message displayed on disabled button in large field
             */
            backgroundUploadFileMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * 'type' prop for the rendered button
         */
        buttonType: PropTypes.Requireable<string>;
        /**
         * 'size' prop for the rendered button
         */
        buttonSize: PropTypes.Requireable<string>;
        /**
         * 'icon' prop for the rendered button
         */
        buttonIcon: PropTypes.Requireable<string>;
        /**
         * Determines if the drag and drop functionality of the component should be disabled
         */
        disableDragAndDrop: PropTypes.Requireable<boolean>;
        /**
         * Total size in bytes of selected file to upload
         */
        total: PropTypes.Requireable<number>;
        /**
         * Current bytes uploaded
         */
        completed: PropTypes.Requireable<number>;
        /**
         * Action triggered when user clicks cancel button during uploading
         */
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Action triggered when user clears selected file
         */
        onFileClear: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Current state of upload
         */
        uploadState: PropTypes.Requireable<string>;
        /**
         * User defined error message on failed upload
         */
        progressErrorMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        id: PropTypes.Validator<string>;
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        tooltip: PropTypes.Requireable<string | PropTypes.InferProps<{
            id: PropTypes.Requireable<string>;
            icon: PropTypes.Requireable<string>;
            placement: PropTypes.Requireable<"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end">;
            text: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            title: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            link: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            renderContent: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
        placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        required: PropTypes.Requireable<boolean | any[]>;
        schemaRequired: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        nullable: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        value: PropTypes.Requireable<any>;
        defaultValue: PropTypes.Requireable<any>; /**
         * Current bytes uploaded
         */
        autoTrim: PropTypes.Requireable<boolean>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        model: PropTypes.Requireable<object>;
        path: PropTypes.Requireable<string>;
        showErrors: PropTypes.Requireable<boolean>;
        showRequired: PropTypes.Requireable<boolean>;
        showOptional: PropTypes.Requireable<boolean>;
        validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
        layout: PropTypes.Requireable<string>;
        hideLabel: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        contentContainerClassName: PropTypes.Requireable<string>;
        controlClassName: PropTypes.Requireable<string>;
        labelClassName: PropTypes.Requireable<string>;
        secondaryLabelClassName: PropTypes.Requireable<string>;
        labelContainerClassName: PropTypes.Requireable<string>;
        showValidationIcon: PropTypes.Requireable<boolean>;
        dataPath: PropTypes.Requireable<string>;
        validator: PropTypes.Requireable<PropTypes.InferProps<{
            pattern: PropTypes.Validator<string>;
            message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        requiredFieldValidationMessage: PropTypes.Requireable<string>;
        successMessage: PropTypes.Requireable<string>;
        labelPosition: PropTypes.Requireable<string>;
        phone: PropTypes.Requireable<object>;
        phoneWide: PropTypes.Requireable<object>;
        tablet: PropTypes.Requireable<object>;
        inputType: PropTypes.Requireable<string>;
        testId: PropTypes.Requireable<string>;
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        controlClassName: string;
        type: string;
        placeholder: {
            id: string;
            defaultMessage: string;
        };
        buttonType: string;
        buttonSize: string;
        autoTrim: boolean;
        required: boolean;
        schemaRequired: boolean;
        readOnly: boolean;
        disabled: boolean;
        showErrors: boolean;
        hideLabel: boolean;
        showValidationIcon: boolean;
        dataPath: string; /**
         * Renders control's action button
         * @param {string} value control value, file path
         * @param {boolean} disabled indicates if control is disabled
         * @param {object} messageProps i18n messages
         * @param {string} buttonType type of button to render
         * @param {string} buttonSize size of button to render
         * @param {string} buttonIcon icon to render within the button
         * @returns {Function} render function for the action button
         */
        labelPosition: string;
        dataType: string;
    };
    constructor(props: any, context: any);
    myRef: React.RefObject<any>;
    handleErrorStateChange: (prevErrorState: any, errorState: any) => void;
    /** Return true flag if component is disabled or readOnly
     *
     * @returns {boolean} disabled or readonly flag
     */
    disabledOrReadOnly(): boolean;
    handleAddFile: () => void;
    handleClearFile: () => any;
    /**
     * Handle onDragOver event.
     *
     * @param {event} event onDragOver event
     */
    handleOnDragOver: (event: Event | undefined) => void;
    /**
     * Handle onDrop event.
     *
     * @param {event} event onDrop event
     */
    handleOnFileDrop: (event: Event | undefined) => void;
    /**
     * Updates the drag counter only if component is not disabled
     *
     * @param {number} updatedCounter new counter value
     * @returns {Function} function that updates the counter with the given value
     */
    updateDragCounter: (updatedCounter: number) => Function;
    /**
     * Renders control's action button
     * @param {string} value control value, file path
     * @param {boolean} disabled indicates if control is disabled
     * @param {object} messageProps i18n messages
     * @param {string} buttonType type of button to render
     * @param {string} buttonSize size of button to render
     * @param {string} buttonIcon icon to render within the button
     * @returns {Function} render function for the action button
     */
    renderActionButton(value: string, disabled: boolean, messageProps: object, buttonType: string, buttonSize: string, buttonIcon: string): Function;
    /**
     * Renders message to be displayed when no file is uploaded
     * @param {string} type upload field type to render
     * @param {object} messageProps i18n messages
     * @returns {Function} render function for uploaded file area
     */
    renderEmptyUploadAreaMessage: (type: string, messageProps: object) => Function;
    /**
     * Renders image in empty upload area
     * @param {string} imageSource source path for the image to display in upload area
     * @param {object} messageProps i18n messages
     * @returns {Function} render function for uploaded file area
     */
    renderUploadAreaImage(imageSource: string, messageProps: object): Function;
    getFileName: (value: any) => any;
    /**
     * Renders message to be displayed when file is uploaded
     * @param {string} type upload field type to render
     * @param {object} messageProps i18n messages
     * @param {string} value uploaded file path
     * @returns {Function} render function for uploaded file message
     */
    renderUploadedFileMessage: (type: string, messageProps: object, value: string) => Function;
    /**
     * Renders Large type upload area
     * @param {string} type upload field type to render
     * @param {string} imageSource source path for the image to display in upload area
     * @param {boolean} disabled indicates if control is disabled
     * @param {string} value uploaded file path or `undefined` if no file is uploaded
     * @param {Function} renderMessage function to render upload area message
     * @param {object} messageProps i18n messages
     * @param {string} buttonType type of button to render
     * @param {string} buttonSize size of button to render
     * @param {string} buttonIcon icon to render within the button
     * @param {boolean} disableDragAndDrop determine whether the empty upload message should be displayed
     * @returns {Function} render function for empty upload area
     */
    renderLargeFlavorArea(type: string, imageSource: string, disabled: boolean, value: string, renderMessage: Function, messageProps: object, buttonType: string, buttonSize: string, buttonIcon: string, disableDragAndDrop: boolean): Function;
    /**
     * Renders empty upload area
     * @param {string} type upload field type to render
     * @param {string} imageSource source path for the image to display in upload area
     * @param {boolean} disabled indicates if control is disabled
     * @param {object} messageProps i18n messages
     * @param {string} buttonType type of button to render
     * @param {string} buttonSize size of button to render
     * @param {string} buttonIcon icon to render within the button
     * @param {boolean} disableDragAndDrop determine whether the empty upload message should be displayed
     * @returns {Function} render function for empty upload area
     */
    renderEmptyUploadArea: (type: string, imageSource: string, disabled: boolean, messageProps: object, buttonType: string, buttonSize: string, buttonIcon: string, disableDragAndDrop: boolean) => Function;
    /**
     * Renders uploaded file area
     * @param {string} type upload field type to render
     * @param {string} imageSource source path for the image to display in upload area
     * @param {boolean} disabled indicates if control is disabled
     * @param {string} value control value - uploaded file path
     * @param {object} messageProps i18n messages
     * @param {string} buttonType type of button to render
     * @param {string} buttonSize size of button to render
     * @param {string} buttonIcon icon to render within the button
     * @returns {Function} render function for uploaded file area
     */
    renderUploadedFileArea(type: string, imageSource: string, disabled: boolean, value: string, messageProps: object, buttonType: string, buttonSize: string, buttonIcon: string): Function;
    isDraggedOverAndEnabled(): boolean;
}
export namespace FileUploadField {
    const displayName: string;
}
/**
 * Renders a control which allows the user to upload a file. Allows you to specify validation and actions for specific events.
 */
export type FileUploadFieldPropTypes = typeof FileUploadField.propTypes;
import PropTypes from "prop-types";
import React from "react";
import { FieldComponent } from "../FieldComponent/FieldComponent";
