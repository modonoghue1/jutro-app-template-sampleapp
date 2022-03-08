/**
 * Base class for field components. A field component renders label, control and messages. Other fields should extend
 * this class. Override any methods as needed: `renderLabel()`, `renderControl()`, `renderMessages()`. By default,
 * this class will render an <input> control.
 *
 * @template P
 * @extends PureComponent<PropTypes.InferProps<FieldComponent.propTypes> & P>
 *
 * @metadataType field
 */
export class FieldComponent<P> extends React.PureComponent<PropTypes.InferPropsInner<Pick<{
    /**
     * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
     */
    id: PropTypes.Validator<string>;
    /**
     * Label text to display; if not provided, uses '[id]' for development
     */
    label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Secondary label text to display; if not provided, uses '[id]' for development
     */
    secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Tooltip text to display or tooltip object to pass to TooltipIcon
     */
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
    /**
     * Placeholder to display on empty component
     */
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
     * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
     */
    required: PropTypes.Requireable<boolean | any[]>;
    /**
     * If true, this field is required by schema
     */
    schemaRequired: PropTypes.Requireable<boolean>;
    /**
     * If true, this field is readonly
     */
    readOnly: PropTypes.Requireable<boolean>;
    /**
     * If true, this field is disabled
     */
    disabled: PropTypes.Requireable<boolean>;
    /**
     * If true, this field returns undefined when the user deletes the data/selection on the input
     */
    nullable: PropTypes.Requireable<boolean>;
    /**
     * If true, this field is visible
     */
    visible: PropTypes.Requireable<boolean>;
    /**
     * Value to display in control
     */
    value: PropTypes.Requireable<any>;
    /**
     * Set the default field value on render if there is a default value; needs onValueChange to work
     */
    defaultValue: PropTypes.Requireable<any>;
    /**
     * If true, will automatically trim string values on change
     */
    autoTrim: PropTypes.Requireable<boolean>;
    /**
     * Callback when value is changed; receives new value and (model or path) for this component
     */
    onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
     */
    onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback when blur event is fired
     */
    onBlur: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback when focus event is fired
     */
    onFocus: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Passed as second argument to onValueChange
     */
    model: PropTypes.Requireable<object>;
    /**
     * Passed as second argument to onValueChange if model is not present
     */
    path: PropTypes.Requireable<string>;
    /**
     * Show errors for this field, works only when field is pristine
     */
    showErrors: PropTypes.Requireable<boolean>;
    /**
     * Show required indicator
     */
    showRequired: PropTypes.Requireable<boolean>;
    /**
     * Show optional indicator
     */
    showOptional: PropTypes.Requireable<boolean>;
    /**
     * Validation messages to show for this field; only rendered if 'showErrors' is true
     */
    validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
    /**
     * Layout to use with this field; default is more control and less label; other option is 'reversed'
     */
    layout: PropTypes.Requireable<string>;
    /**
     * Hides the label on any layout
     */
    hideLabel: PropTypes.Requireable<boolean>;
    /**
     * Additional style to apply to the component
     */
    className: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the content container of the component
     */
    contentContainerClassName: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the control of the component
     */
    controlClassName: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the label of the component
     */
    labelClassName: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the secondary label of the component
     */
    secondaryLabelClassName: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the label container of the component
     */
    labelContainerClassName: PropTypes.Requireable<string>;
    /**
     * Used to display or not the validation icon
     */
    showValidationIcon: PropTypes.Requireable<boolean>;
    /**
     * The full path of view model
     */
    dataPath: PropTypes.Requireable<string>;
    /**
     * An object which should contain a regex pattern as string and a validation message as string
     */
    validator: PropTypes.Requireable<PropTypes.InferProps<{
        pattern: PropTypes.Validator<string>;
        message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * Used to override the default required field message
     */
    requiredFieldValidationMessage: PropTypes.Requireable<string>;
    /**
     * Success message to apply to component if it is valid
     */
    successMessage: PropTypes.Requireable<string>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Required message
         */
        requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * Allows to select label position
     */
    labelPosition: PropTypes.Requireable<string>;
    /**
     * Include any FieldComponent property to use at 'phone' breakpoint
     */
    phone: PropTypes.Requireable<object>;
    /**
     * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
     */
    phoneWide: PropTypes.Requireable<object>;
    /**
     * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
     */
    tablet: PropTypes.Requireable<object>;
    /**
     * Type attribute specifies the type of <input> element to display.
     */
    inputType: PropTypes.Requireable<string>;
    /**
     * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
     */
    testId: PropTypes.Requireable<string>;
    /**
     * Optional callback used by @jutro/validation package to register field validation to use validation hook.
     */
    registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Used by @jutro/validation package: Displays multiple field validation messages all at once.
     */
    enableMultipleValidation: PropTypes.Requireable<boolean>;
}, "id">> & Partial<PropTypes.InferPropsInner<Pick<{
    /**
     * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
     */
    id: PropTypes.Validator<string>;
    /**
     * Label text to display; if not provided, uses '[id]' for development
     */
    label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Secondary label text to display; if not provided, uses '[id]' for development
     */
    secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Tooltip text to display or tooltip object to pass to TooltipIcon
     */
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
    /**
     * Placeholder to display on empty component
     */
    placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
     * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
     */
    required: PropTypes.Requireable<boolean | any[]>;
    /**
     * If true, this field is required by schema
     */
    schemaRequired: PropTypes.Requireable<boolean>;
    /**
     * If true, this field is readonly
     */
    readOnly: PropTypes.Requireable<boolean>;
    /**
     * If true, this field is disabled
     */
    disabled: PropTypes.Requireable<boolean>;
    /**
     * If true, this field returns undefined when the user deletes the data/selection on the input
     */
    nullable: PropTypes.Requireable<boolean>;
    /**
     * If true, this field is visible
     */
    visible: PropTypes.Requireable<boolean>;
    /**
     * Value to display in control
     */
    value: PropTypes.Requireable<any>;
    /**
     * Set the default field value on render if there is a default value; needs onValueChange to work
     */
    defaultValue: PropTypes.Requireable<any>;
    /**
     * If true, will automatically trim string values on change
     */
    autoTrim: PropTypes.Requireable<boolean>;
    /**
     * Callback when value is changed; receives new value and (model or path) for this component
     */
    onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
     */
    onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback when blur event is fired
     */
    onBlur: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Callback when focus event is fired
     */
    onFocus: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Passed as second argument to onValueChange
     */
    model: PropTypes.Requireable<object>;
    /**
     * Passed as second argument to onValueChange if model is not present
     */
    path: PropTypes.Requireable<string>;
    /**
     * Show errors for this field, works only when field is pristine
     */
    showErrors: PropTypes.Requireable<boolean>;
    /**
     * Show required indicator
     */
    showRequired: PropTypes.Requireable<boolean>;
    /**
     * Show optional indicator
     */
    showOptional: PropTypes.Requireable<boolean>;
    /**
     * Validation messages to show for this field; only rendered if 'showErrors' is true
     */
    validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
    /**
     * Layout to use with this field; default is more control and less label; other option is 'reversed'
     */
    layout: PropTypes.Requireable<string>;
    /**
     * Hides the label on any layout
     */
    hideLabel: PropTypes.Requireable<boolean>;
    /**
     * Additional style to apply to the component
     */
    className: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the content container of the component
     */
    contentContainerClassName: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the control of the component
     */
    controlClassName: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the label of the component
     */
    labelClassName: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the secondary label of the component
     */
    secondaryLabelClassName: PropTypes.Requireable<string>;
    /**
     * Additional style to apply to the label container of the component
     */
    labelContainerClassName: PropTypes.Requireable<string>;
    /**
     * Used to display or not the validation icon
     */
    showValidationIcon: PropTypes.Requireable<boolean>;
    /**
     * The full path of view model
     */
    dataPath: PropTypes.Requireable<string>;
    /**
     * An object which should contain a regex pattern as string and a validation message as string
     */
    validator: PropTypes.Requireable<PropTypes.InferProps<{
        pattern: PropTypes.Validator<string>;
        message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * Used to override the default required field message
     */
    requiredFieldValidationMessage: PropTypes.Requireable<string>;
    /**
     * Success message to apply to component if it is valid
     */
    successMessage: PropTypes.Requireable<string>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * Required message
         */
        requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    /**
     * Allows to select label position
     */
    labelPosition: PropTypes.Requireable<string>;
    /**
     * Include any FieldComponent property to use at 'phone' breakpoint
     */
    phone: PropTypes.Requireable<object>;
    /**
     * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
     */
    phoneWide: PropTypes.Requireable<object>;
    /**
     * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
     */
    tablet: PropTypes.Requireable<object>;
    /**
     * Type attribute specifies the type of <input> element to display.
     */
    inputType: PropTypes.Requireable<string>;
    /**
     * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
     */
    testId: PropTypes.Requireable<string>;
    /**
     * Optional callback used by @jutro/validation package to register field validation to use validation hook.
     */
    registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * Used by @jutro/validation package: Displays multiple field validation messages all at once.
     */
    enableMultipleValidation: PropTypes.Requireable<boolean>;
}, "secondaryLabel" | "path" | "className" | "label" | "disabled" | "visible" | "value" | "onFocus" | "onBlur" | "messageProps" | "tooltip" | "phone" | "phoneWide" | "tablet" | "layout" | "defaultValue" | "placeholder" | "labelClassName" | "required" | "schemaRequired" | "readOnly" | "nullable" | "autoTrim" | "onValueChange" | "onValidationChange" | "model" | "showErrors" | "showRequired" | "showOptional" | "validationMessages" | "hideLabel" | "contentContainerClassName" | "controlClassName" | "secondaryLabelClassName" | "labelContainerClassName" | "showValidationIcon" | "dataPath" | "validator" | "requiredFieldValidationMessage" | "successMessage" | "labelPosition" | "inputType" | "testId" | "registerValidation" | "enableMultipleValidation">>> & P, any, any> {
    static metadataType: any;
    static propTypes: {
        /**
         * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
         */
        id: PropTypes.Validator<string>;
        /**
         * Label text to display; if not provided, uses '[id]' for development
         */
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Secondary label text to display; if not provided, uses '[id]' for development
         */
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Tooltip text to display or tooltip object to pass to TooltipIcon
         */
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
        /**
         * Placeholder to display on empty component
         */
        placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
         * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
         */
        required: PropTypes.Requireable<boolean | any[]>;
        /**
         * If true, this field is required by schema
         */
        schemaRequired: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is readonly
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is disabled
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * If true, this field returns undefined when the user deletes the data/selection on the input
         */
        nullable: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is visible
         */
        visible: PropTypes.Requireable<boolean>;
        /**
         * Value to display in control
         */
        value: PropTypes.Requireable<any>;
        /**
         * Set the default field value on render if there is a default value; needs onValueChange to work
         */
        defaultValue: PropTypes.Requireable<any>;
        /**
         * If true, will automatically trim string values on change
         */
        autoTrim: PropTypes.Requireable<boolean>;
        /**
         * Callback when value is changed; receives new value and (model or path) for this component
         */
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
         */
        onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when blur event is fired
         */
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when focus event is fired
         */
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Passed as second argument to onValueChange
         */
        model: PropTypes.Requireable<object>;
        /**
         * Passed as second argument to onValueChange if model is not present
         */
        path: PropTypes.Requireable<string>;
        /**
         * Show errors for this field, works only when field is pristine
         */
        showErrors: PropTypes.Requireable<boolean>;
        /**
         * Show required indicator
         */
        showRequired: PropTypes.Requireable<boolean>;
        /**
         * Show optional indicator
         */
        showOptional: PropTypes.Requireable<boolean>;
        /**
         * Validation messages to show for this field; only rendered if 'showErrors' is true
         */
        validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
        /**
         * Layout to use with this field; default is more control and less label; other option is 'reversed'
         */
        layout: PropTypes.Requireable<string>;
        /**
         * Hides the label on any layout
         */
        hideLabel: PropTypes.Requireable<boolean>;
        /**
         * Additional style to apply to the component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the content container of the component
         */
        contentContainerClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the control of the component
         */
        controlClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label of the component
         */
        labelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the secondary label of the component
         */
        secondaryLabelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label container of the component
         */
        labelContainerClassName: PropTypes.Requireable<string>;
        /**
         * Used to display or not the validation icon
         */
        showValidationIcon: PropTypes.Requireable<boolean>;
        /**
         * The full path of view model
         */
        dataPath: PropTypes.Requireable<string>;
        /**
         * An object which should contain a regex pattern as string and a validation message as string
         */
        validator: PropTypes.Requireable<PropTypes.InferProps<{
            pattern: PropTypes.Validator<string>;
            message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Used to override the default required field message
         */
        requiredFieldValidationMessage: PropTypes.Requireable<string>;
        /**
         * Success message to apply to component if it is valid
         */
        successMessage: PropTypes.Requireable<string>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Required message
             */
            requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Allows to select label position
         */
        labelPosition: PropTypes.Requireable<string>;
        /**
         * Include any FieldComponent property to use at 'phone' breakpoint
         */
        phone: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
         */
        phoneWide: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
         */
        tablet: PropTypes.Requireable<object>;
        /**
         * Type attribute specifies the type of <input> element to display.
         */
        inputType: PropTypes.Requireable<string>;
        /**
         * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
         */
        testId: PropTypes.Requireable<string>;
        /**
         * Optional callback used by @jutro/validation package to register field validation to use validation hook.
         */
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Used by @jutro/validation package: Displays multiple field validation messages all at once.
         */
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        autoTrim: boolean;
        required: boolean;
        schemaRequired: boolean;
        readOnly: boolean;
        disabled: boolean;
        showErrors: boolean;
        hideLabel: boolean;
        showValidationIcon: boolean;
        dataPath: string;
        labelPosition: string;
        dataType: string;
    };
    /**
     * Define context properties that are set somewhere higher in the component chain.
     * Useful for passing down functions and settings without having to pass down as a prop.
     * Used here to obtain the translator function for localizing strings
     */
    static contextType: React.Context<import("@jutro/locale").Translator>;
    /**
     * The default string to present for the read-only rendering of a component with no value
     *
     * @type {string}
     */
    static defaultROEmptyValue: string;
    /**
     * The special `defaultValue` prop value that works with `availableValues` arrays to set the default to the first
     * value in the array.
     *
     * @type {string}
     */
    static firstAvailable: string;
    /**
     * The special `defaultValue` prop value that works with `availableValues` arrays to set the default to the last
     * value in the array.
     *
     * @type {string}
     */
    static lastAvailable: string;
    /**
     * The special `defaultValue` prop value that works with `availableValues` arrays to set the default to the only
     * value in the array.
     *
     * @type {string}
     */
    static onlyAvailable: string;
    /**
     * Removes props which are functions or undefined
     *
     * @param {object} props - component props
     * @returns {object}
     */
    static fieldEventFormatter: (props: object) => object;
    constructor(props: any);
    pristine: boolean;
    focused: boolean;
    focusPristine: boolean;
    beforeValue: (PropTypes.InferPropsInner<Pick<{
        /**
         * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
         */
        id: PropTypes.Validator<string>;
        /**
         * Label text to display; if not provided, uses '[id]' for development
         */
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Secondary label text to display; if not provided, uses '[id]' for development
         */
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Tooltip text to display or tooltip object to pass to TooltipIcon
         */
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
        /**
         * Placeholder to display on empty component
         */
        placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
         * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
         */
        required: PropTypes.Requireable<boolean | any[]>;
        /**
         * If true, this field is required by schema
         */
        schemaRequired: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is readonly
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is disabled
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * If true, this field returns undefined when the user deletes the data/selection on the input
         */
        nullable: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is visible
         */
        visible: PropTypes.Requireable<boolean>;
        /**
         * Value to display in control
         */
        value: PropTypes.Requireable<any>;
        /**
         * Set the default field value on render if there is a default value; needs onValueChange to work
         */
        defaultValue: PropTypes.Requireable<any>;
        /**
         * If true, will automatically trim string values on change
         */
        autoTrim: PropTypes.Requireable<boolean>;
        /**
         * Callback when value is changed; receives new value and (model or path) for this component
         */
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
         */
        onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when blur event is fired
         */
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when focus event is fired
         */
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Passed as second argument to onValueChange
         */
        model: PropTypes.Requireable<object>;
        /**
         * Passed as second argument to onValueChange if model is not present
         */
        path: PropTypes.Requireable<string>;
        /**
         * Show errors for this field, works only when field is pristine
         */
        showErrors: PropTypes.Requireable<boolean>;
        /**
         * Show required indicator
         */
        showRequired: PropTypes.Requireable<boolean>;
        /**
         * Show optional indicator
         */
        showOptional: PropTypes.Requireable<boolean>;
        /**
         * Validation messages to show for this field; only rendered if 'showErrors' is true
         */
        validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
        /**
         * Layout to use with this field; default is more control and less label; other option is 'reversed'
         */
        layout: PropTypes.Requireable<string>;
        /**
         * Hides the label on any layout
         */
        hideLabel: PropTypes.Requireable<boolean>;
        /**
         * Additional style to apply to the component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the content container of the component
         */
        contentContainerClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the control of the component
         */
        controlClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label of the component
         */
        labelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the secondary label of the component
         */
        secondaryLabelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label container of the component
         */
        labelContainerClassName: PropTypes.Requireable<string>;
        /**
         * Used to display or not the validation icon
         */
        showValidationIcon: PropTypes.Requireable<boolean>;
        /**
         * The full path of view model
         */
        dataPath: PropTypes.Requireable<string>;
        /**
         * An object which should contain a regex pattern as string and a validation message as string
         */
        validator: PropTypes.Requireable<PropTypes.InferProps<{
            pattern: PropTypes.Validator<string>;
            message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Used to override the default required field message
         */
        requiredFieldValidationMessage: PropTypes.Requireable<string>;
        /**
         * Success message to apply to component if it is valid
         */
        successMessage: PropTypes.Requireable<string>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Required message
             */
            requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Allows to select label position
         */
        labelPosition: PropTypes.Requireable<string>;
        /**
         * Include any FieldComponent property to use at 'phone' breakpoint
         */
        phone: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
         */
        phoneWide: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
         */
        tablet: PropTypes.Requireable<object>;
        /**
         * Type attribute specifies the type of <input> element to display.
         */
        inputType: PropTypes.Requireable<string>;
        /**
         * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
         */
        testId: PropTypes.Requireable<string>;
        /**
         * Optional callback used by @jutro/validation package to register field validation to use validation hook.
         */
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Used by @jutro/validation package: Displays multiple field validation messages all at once.
         */
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    }, "id">> & Partial<PropTypes.InferPropsInner<Pick<{
        /**
         * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
         */
        id: PropTypes.Validator<string>;
        /**
         * Label text to display; if not provided, uses '[id]' for development
         */
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Secondary label text to display; if not provided, uses '[id]' for development
         */
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Tooltip text to display or tooltip object to pass to TooltipIcon
         */
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
        /**
         * Placeholder to display on empty component
         */
        placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
         * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
         */
        required: PropTypes.Requireable<boolean | any[]>;
        /**
         * If true, this field is required by schema
         */
        schemaRequired: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is readonly
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is disabled
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * If true, this field returns undefined when the user deletes the data/selection on the input
         */
        nullable: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is visible
         */
        visible: PropTypes.Requireable<boolean>;
        /**
         * Value to display in control
         */
        value: PropTypes.Requireable<any>;
        /**
         * Set the default field value on render if there is a default value; needs onValueChange to work
         */
        defaultValue: PropTypes.Requireable<any>;
        /**
         * If true, will automatically trim string values on change
         */
        autoTrim: PropTypes.Requireable<boolean>;
        /**
         * Callback when value is changed; receives new value and (model or path) for this component
         */
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
         */
        onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when blur event is fired
         */
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when focus event is fired
         */
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Passed as second argument to onValueChange
         */
        model: PropTypes.Requireable<object>;
        /**
         * Passed as second argument to onValueChange if model is not present
         */
        path: PropTypes.Requireable<string>;
        /**
         * Show errors for this field, works only when field is pristine
         */
        showErrors: PropTypes.Requireable<boolean>;
        /**
         * Show required indicator
         */
        showRequired: PropTypes.Requireable<boolean>;
        /**
         * Show optional indicator
         */
        showOptional: PropTypes.Requireable<boolean>;
        /**
         * Validation messages to show for this field; only rendered if 'showErrors' is true
         */
        validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
        /**
         * Layout to use with this field; default is more control and less label; other option is 'reversed'
         */
        layout: PropTypes.Requireable<string>;
        /**
         * Hides the label on any layout
         */
        hideLabel: PropTypes.Requireable<boolean>;
        /**
         * Additional style to apply to the component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the content container of the component
         */
        contentContainerClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the control of the component
         */
        controlClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label of the component
         */
        labelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the secondary label of the component
         */
        secondaryLabelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label container of the component
         */
        labelContainerClassName: PropTypes.Requireable<string>;
        /**
         * Used to display or not the validation icon
         */
        showValidationIcon: PropTypes.Requireable<boolean>;
        /**
         * The full path of view model
         */
        dataPath: PropTypes.Requireable<string>;
        /**
         * An object which should contain a regex pattern as string and a validation message as string
         */
        validator: PropTypes.Requireable<PropTypes.InferProps<{
            pattern: PropTypes.Validator<string>;
            message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Used to override the default required field message
         */
        requiredFieldValidationMessage: PropTypes.Requireable<string>;
        /**
         * Success message to apply to component if it is valid
         */
        successMessage: PropTypes.Requireable<string>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Required message
             */
            requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Allows to select label position
         */
        labelPosition: PropTypes.Requireable<string>;
        /**
         * Include any FieldComponent property to use at 'phone' breakpoint
         */
        phone: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
         */
        phoneWide: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
         */
        tablet: PropTypes.Requireable<object>;
        /**
         * Type attribute specifies the type of <input> element to display.
         */
        inputType: PropTypes.Requireable<string>;
        /**
         * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
         */
        testId: PropTypes.Requireable<string>;
        /**
         * Optional callback used by @jutro/validation package to register field validation to use validation hook.
         */
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Used by @jutro/validation package: Displays multiple field validation messages all at once.
         */
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    }, "secondaryLabel" | "path" | "className" | "label" | "disabled" | "visible" | "value" | "onFocus" | "onBlur" | "messageProps" | "tooltip" | "phone" | "phoneWide" | "tablet" | "layout" | "defaultValue" | "placeholder" | "labelClassName" | "required" | "schemaRequired" | "readOnly" | "nullable" | "autoTrim" | "onValueChange" | "onValidationChange" | "model" | "showErrors" | "showRequired" | "showOptional" | "validationMessages" | "hideLabel" | "contentContainerClassName" | "controlClassName" | "secondaryLabelClassName" | "labelContainerClassName" | "showValidationIcon" | "dataPath" | "validator" | "requiredFieldValidationMessage" | "successMessage" | "labelPosition" | "inputType" | "testId" | "registerValidation" | "enableMultipleValidation">>> & P)["value"] | null | undefined;
    valid: boolean;
    fieldUniqueId: any;
    validationImplementation: {};
    /**
     * Array of properties which validation depends on
     * value and validationMessages are always included
     */
    validationDependencyProps: any[];
    /**
     * Determines requiredness of the field.
     *
     * @returns {boolean} true if field is required
     */
    isRequired(): boolean;
    /**
     * Determines whether errors should be displayed. Errors are displayed as highlight of control and as separate
     * message block.
     *
     * @returns {boolean} true if errors should be shown; false if errors should be hidden
     */
    showErrors(): boolean;
    /**
     * Get the code of the currently selected availableValue.
     * If using dataType=DATA_TYPE_OBJECT, return the `code` from the value.
     * Otherwise return the value itself
     *
     * @returns {any} - The selected value
     */
    getDataTypeAwareSelectedValue: () => any;
    getValidationConfig(...args: any[]): any;
    /**
     * Change handler to be shared by components using availableValues
     *
     * @param {any} targetValue - The new value to set
     */
    handleAvailableValuesValueChange: (targetValue: any) => void;
    /**
     * Default change handler for `input` element. It will be used unless this method or `renderControl()`
     * is overridden.
     *
     * @param {object} evt - React event wrapper
     */
    handleChange: (evt: object) => void;
    handleFocus: (evt: object) => void;
    /**
     * Get focus/blur handlers for use in derived input fields. This optimizes the validation behavior when the
     * input field is in focus.
     *
     * @returns {object} focus and blur handlers to be added to `<input>` fields
     */
    getInputFocusHandlers(): object;
    /**
     * Get the validation messages to display.
     * If field is 'required' and no validation message is provided, it is added
     *
     * @param {*} value current value of input
     * @returns {Array} validation messages
     */
    getValidationMessages(value?: any): any[];
    /**
     * Get current value
     *
     * @param {*} [value]
     * @returns *
     */
    getValue(value?: any): any;
    /**
     * Tests if component is empty
     *
     * @param {*} value value to check
     * @returns {boolean}
     */
    isEmpty(value: any): boolean;
    handleBlur: (evt: object) => void;
    updateTimeout: NodeJS.Timeout | undefined;
    /**
     * validate the selected value for 'input' elements.
     * This method will triggered validation if value is changed for required field.
     *
     * @param {any} value  - selected value to validate
     * @param {boolean} [noNotification=false]  - optional flag for skipping the validation change notification
     */
    validate(...args: any[]): any;
    /**
     * get the validation rules for the field component
     */
    getRules(): any;
    /**
     * get the style class for validation messages
     */
    getValidationMessageStyle(messageList: any): "warning" | "invalid";
    /**
     * get the validation rules config for field component
     */
    getValidationRules(...args: any[]): any;
    /**
     * Mark as not pristine anymore
     */
    touch(): void;
    /**
     * Helper method to invoke callback when value is changed; useful in derived classes
     *
     * @param {any} value - new value of control to send with notification
     */
    notifyChange(value: any): void;
    renderTooltipIcon(breakpointProps: any): JSX.Element | null;
    getTooltipIconProps(): ((PropTypes.InferPropsInner<Pick<{
        /**
         * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
         */
        id: PropTypes.Validator<string>;
        /**
         * Label text to display; if not provided, uses '[id]' for development
         */
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Secondary label text to display; if not provided, uses '[id]' for development
         */
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Tooltip text to display or tooltip object to pass to TooltipIcon
         */
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
        /**
         * Placeholder to display on empty component
         */
        placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
         * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
         */
        required: PropTypes.Requireable<boolean | any[]>;
        /**
         * If true, this field is required by schema
         */
        schemaRequired: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is readonly
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is disabled
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * If true, this field returns undefined when the user deletes the data/selection on the input
         */
        nullable: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is visible
         */
        visible: PropTypes.Requireable<boolean>;
        /**
         * Value to display in control
         */
        value: PropTypes.Requireable<any>;
        /**
         * Set the default field value on render if there is a default value; needs onValueChange to work
         */
        defaultValue: PropTypes.Requireable<any>;
        /**
         * If true, will automatically trim string values on change
         */
        autoTrim: PropTypes.Requireable<boolean>;
        /**
         * Callback when value is changed; receives new value and (model or path) for this component
         */
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
         */
        onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when blur event is fired
         */
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when focus event is fired
         */
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Passed as second argument to onValueChange
         */
        model: PropTypes.Requireable<object>;
        /**
         * Passed as second argument to onValueChange if model is not present
         */
        path: PropTypes.Requireable<string>;
        /**
         * Show errors for this field, works only when field is pristine
         */
        showErrors: PropTypes.Requireable<boolean>;
        /**
         * Show required indicator
         */
        showRequired: PropTypes.Requireable<boolean>;
        /**
         * Show optional indicator
         */
        showOptional: PropTypes.Requireable<boolean>;
        /**
         * Validation messages to show for this field; only rendered if 'showErrors' is true
         */
        validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
        /**
         * Layout to use with this field; default is more control and less label; other option is 'reversed'
         */
        layout: PropTypes.Requireable<string>;
        /**
         * Hides the label on any layout
         */
        hideLabel: PropTypes.Requireable<boolean>;
        /**
         * Additional style to apply to the component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the content container of the component
         */
        contentContainerClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the control of the component
         */
        controlClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label of the component
         */
        labelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the secondary label of the component
         */
        secondaryLabelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label container of the component
         */
        labelContainerClassName: PropTypes.Requireable<string>;
        /**
         * Used to display or not the validation icon
         */
        showValidationIcon: PropTypes.Requireable<boolean>;
        /**
         * The full path of view model
         */
        dataPath: PropTypes.Requireable<string>;
        /**
         * An object which should contain a regex pattern as string and a validation message as string
         */
        validator: PropTypes.Requireable<PropTypes.InferProps<{
            pattern: PropTypes.Validator<string>;
            message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Used to override the default required field message
         */
        requiredFieldValidationMessage: PropTypes.Requireable<string>;
        /**
         * Success message to apply to component if it is valid
         */
        successMessage: PropTypes.Requireable<string>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Required message
             */
            requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Allows to select label position
         */
        labelPosition: PropTypes.Requireable<string>;
        /**
         * Include any FieldComponent property to use at 'phone' breakpoint
         */
        phone: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
         */
        phoneWide: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
         */
        tablet: PropTypes.Requireable<object>;
        /**
         * Type attribute specifies the type of <input> element to display.
         */
        inputType: PropTypes.Requireable<string>;
        /**
         * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
         */
        testId: PropTypes.Requireable<string>;
        /**
         * Optional callback used by @jutro/validation package to register field validation to use validation hook.
         */
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Used by @jutro/validation package: Displays multiple field validation messages all at once.
         */
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    }, "id">> & Partial<PropTypes.InferPropsInner<Pick<{
        /**
         * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
         */
        id: PropTypes.Validator<string>;
        /**
         * Label text to display; if not provided, uses '[id]' for development
         */
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Secondary label text to display; if not provided, uses '[id]' for development
         */
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Tooltip text to display or tooltip object to pass to TooltipIcon
         */
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
        /**
         * Placeholder to display on empty component
         */
        placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
         * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
         */
        required: PropTypes.Requireable<boolean | any[]>;
        /**
         * If true, this field is required by schema
         */
        schemaRequired: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is readonly
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is disabled
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * If true, this field returns undefined when the user deletes the data/selection on the input
         */
        nullable: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is visible
         */
        visible: PropTypes.Requireable<boolean>;
        /**
         * Value to display in control
         */
        value: PropTypes.Requireable<any>;
        /**
         * Set the default field value on render if there is a default value; needs onValueChange to work
         */
        defaultValue: PropTypes.Requireable<any>;
        /**
         * If true, will automatically trim string values on change
         */
        autoTrim: PropTypes.Requireable<boolean>;
        /**
         * Callback when value is changed; receives new value and (model or path) for this component
         */
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
         */
        onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when blur event is fired
         */
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback when focus event is fired
         */
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Passed as second argument to onValueChange
         */
        model: PropTypes.Requireable<object>;
        /**
         * Passed as second argument to onValueChange if model is not present
         */
        path: PropTypes.Requireable<string>;
        /**
         * Show errors for this field, works only when field is pristine
         */
        showErrors: PropTypes.Requireable<boolean>;
        /**
         * Show required indicator
         */
        showRequired: PropTypes.Requireable<boolean>;
        /**
         * Show optional indicator
         */
        showOptional: PropTypes.Requireable<boolean>;
        /**
         * Validation messages to show for this field; only rendered if 'showErrors' is true
         */
        validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
        /**
         * Layout to use with this field; default is more control and less label; other option is 'reversed'
         */
        layout: PropTypes.Requireable<string>;
        /**
         * Hides the label on any layout
         */
        hideLabel: PropTypes.Requireable<boolean>;
        /**
         * Additional style to apply to the component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the content container of the component
         */
        contentContainerClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the control of the component
         */
        controlClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label of the component
         */
        labelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the secondary label of the component
         */
        secondaryLabelClassName: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label container of the component
         */
        labelContainerClassName: PropTypes.Requireable<string>;
        /**
         * Used to display or not the validation icon
         */
        showValidationIcon: PropTypes.Requireable<boolean>;
        /**
         * The full path of view model
         */
        dataPath: PropTypes.Requireable<string>;
        /**
         * An object which should contain a regex pattern as string and a validation message as string
         */
        validator: PropTypes.Requireable<PropTypes.InferProps<{
            pattern: PropTypes.Validator<string>;
            message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Used to override the default required field message
         */
        requiredFieldValidationMessage: PropTypes.Requireable<string>;
        /**
         * Success message to apply to component if it is valid
         */
        successMessage: PropTypes.Requireable<string>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Required message
             */
            requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Allows to select label position
         */
        labelPosition: PropTypes.Requireable<string>;
        /**
         * Include any FieldComponent property to use at 'phone' breakpoint
         */
        phone: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
         */
        phoneWide: PropTypes.Requireable<object>;
        /**
         * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
         */
        tablet: PropTypes.Requireable<object>;
        /**
         * Type attribute specifies the type of <input> element to display.
         */
        inputType: PropTypes.Requireable<string>;
        /**
         * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
         */
        testId: PropTypes.Requireable<string>;
        /**
         * Optional callback used by @jutro/validation package to register field validation to use validation hook.
         */
        registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Used by @jutro/validation package: Displays multiple field validation messages all at once.
         */
        enableMultipleValidation: PropTypes.Requireable<boolean>;
    }, "secondaryLabel" | "path" | "className" | "label" | "disabled" | "visible" | "value" | "onFocus" | "onBlur" | "messageProps" | "tooltip" | "phone" | "phoneWide" | "tablet" | "layout" | "defaultValue" | "placeholder" | "labelClassName" | "required" | "schemaRequired" | "readOnly" | "nullable" | "autoTrim" | "onValueChange" | "onValidationChange" | "model" | "showErrors" | "showRequired" | "showOptional" | "validationMessages" | "hideLabel" | "contentContainerClassName" | "controlClassName" | "secondaryLabelClassName" | "labelContainerClassName" | "showValidationIcon" | "dataPath" | "validator" | "requiredFieldValidationMessage" | "successMessage" | "labelPosition" | "inputType" | "testId" | "registerValidation" | "enableMultipleValidation">>> & P)["tooltip"] & object) | {
        text: (PropTypes.InferPropsInner<Pick<{
            /**
             * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
             */
            id: PropTypes.Validator<string>;
            /**
             * Label text to display; if not provided, uses '[id]' for development
             */
            label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Secondary label text to display; if not provided, uses '[id]' for development
             */
            secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Tooltip text to display or tooltip object to pass to TooltipIcon
             */
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
            /**
             * Placeholder to display on empty component
             */
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
             * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
             */
            required: PropTypes.Requireable<boolean | any[]>;
            /**
             * If true, this field is required by schema
             */
            schemaRequired: PropTypes.Requireable<boolean>;
            /**
             * If true, this field is readonly
             */
            readOnly: PropTypes.Requireable<boolean>;
            /**
             * If true, this field is disabled
             */
            disabled: PropTypes.Requireable<boolean>;
            /**
             * If true, this field returns undefined when the user deletes the data/selection on the input
             */
            nullable: PropTypes.Requireable<boolean>;
            /**
             * If true, this field is visible
             */
            visible: PropTypes.Requireable<boolean>;
            /**
             * Value to display in control
             */
            value: PropTypes.Requireable<any>;
            /**
             * Set the default field value on render if there is a default value; needs onValueChange to work
             */
            defaultValue: PropTypes.Requireable<any>;
            /**
             * If true, will automatically trim string values on change
             */
            autoTrim: PropTypes.Requireable<boolean>;
            /**
             * Callback when value is changed; receives new value and (model or path) for this component
             */
            onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
             */
            onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Callback when blur event is fired
             */
            onBlur: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Callback when focus event is fired
             */
            onFocus: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Passed as second argument to onValueChange
             */
            model: PropTypes.Requireable<object>;
            /**
             * Passed as second argument to onValueChange if model is not present
             */
            path: PropTypes.Requireable<string>;
            /**
             * Show errors for this field, works only when field is pristine
             */
            showErrors: PropTypes.Requireable<boolean>;
            /**
             * Show required indicator
             */
            showRequired: PropTypes.Requireable<boolean>;
            /**
             * Show optional indicator
             */
            showOptional: PropTypes.Requireable<boolean>;
            /**
             * Validation messages to show for this field; only rendered if 'showErrors' is true
             */
            validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
            /**
             * Layout to use with this field; default is more control and less label; other option is 'reversed'
             */
            layout: PropTypes.Requireable<string>;
            /**
             * Hides the label on any layout
             */
            hideLabel: PropTypes.Requireable<boolean>;
            /**
             * Additional style to apply to the component
             */
            className: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the content container of the component
             */
            contentContainerClassName: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the control of the component
             */
            controlClassName: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the label of the component
             */
            labelClassName: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the secondary label of the component
             */
            secondaryLabelClassName: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the label container of the component
             */
            labelContainerClassName: PropTypes.Requireable<string>;
            /**
             * Used to display or not the validation icon
             */
            showValidationIcon: PropTypes.Requireable<boolean>;
            /**
             * The full path of view model
             */
            dataPath: PropTypes.Requireable<string>;
            /**
             * An object which should contain a regex pattern as string and a validation message as string
             */
            validator: PropTypes.Requireable<PropTypes.InferProps<{
                pattern: PropTypes.Validator<string>;
                message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
            }>>;
            /**
             * Used to override the default required field message
             */
            requiredFieldValidationMessage: PropTypes.Requireable<string>;
            /**
             * Success message to apply to component if it is valid
             */
            successMessage: PropTypes.Requireable<string>;
            /**
             * Message props(error message/aria-label)
             */
            messageProps: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Required message
                 */
                requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            }>>;
            /**
             * Allows to select label position
             */
            labelPosition: PropTypes.Requireable<string>;
            /**
             * Include any FieldComponent property to use at 'phone' breakpoint
             */
            phone: PropTypes.Requireable<object>;
            /**
             * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
             */
            phoneWide: PropTypes.Requireable<object>;
            /**
             * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
             */
            tablet: PropTypes.Requireable<object>;
            /**
             * Type attribute specifies the type of <input> element to display.
             */
            inputType: PropTypes.Requireable<string>;
            /**
             * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
             */
            testId: PropTypes.Requireable<string>;
            /**
             * Optional callback used by @jutro/validation package to register field validation to use validation hook.
             */
            registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Used by @jutro/validation package: Displays multiple field validation messages all at once.
             */
            enableMultipleValidation: PropTypes.Requireable<boolean>;
        }, "id">> & Partial<PropTypes.InferPropsInner<Pick<{
            /**
             * Used to identify the component. fieldUniqueId is generated on id base and applied to control and referenced by label
             */
            id: PropTypes.Validator<string>;
            /**
             * Label text to display; if not provided, uses '[id]' for development
             */
            label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Secondary label text to display; if not provided, uses '[id]' for development
             */
            secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * Tooltip text to display or tooltip object to pass to TooltipIcon
             */
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
            /**
             * Placeholder to display on empty component
             */
            placeholder: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             * If true, this field is required. If being used with @jutro/validation this prop can also be used to set the custom message overwrite
             * This can be done by using a tuple with the first value as true and the second value as the custom message. Ex: required: [true, "a custom message"]
             */
            required: PropTypes.Requireable<boolean | any[]>;
            /**
             * If true, this field is required by schema
             */
            schemaRequired: PropTypes.Requireable<boolean>;
            /**
             * If true, this field is readonly
             */
            readOnly: PropTypes.Requireable<boolean>;
            /**
             * If true, this field is disabled
             */
            disabled: PropTypes.Requireable<boolean>;
            /**
             * If true, this field returns undefined when the user deletes the data/selection on the input
             */
            nullable: PropTypes.Requireable<boolean>;
            /**
             * If true, this field is visible
             */
            visible: PropTypes.Requireable<boolean>;
            /**
             * Value to display in control
             */
            value: PropTypes.Requireable<any>;
            /**
             * Set the default field value on render if there is a default value; needs onValueChange to work
             */
            defaultValue: PropTypes.Requireable<any>;
            /**
             * If true, will automatically trim string values on change
             */
            autoTrim: PropTypes.Requireable<boolean>;
            /**
             * Callback when value is changed; receives new value and (model or path) for this component
             */
            onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Callback when validation is changed; receives 'isValid', (model or path) and validation message for this component
             */
            onValidationChange: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Callback when blur event is fired
             */
            onBlur: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Callback when focus event is fired
             */
            onFocus: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Passed as second argument to onValueChange
             */
            model: PropTypes.Requireable<object>;
            /**
             * Passed as second argument to onValueChange if model is not present
             */
            path: PropTypes.Requireable<string>;
            /**
             * Show errors for this field, works only when field is pristine
             */
            showErrors: PropTypes.Requireable<boolean>;
            /**
             * Show required indicator
             */
            showRequired: PropTypes.Requireable<boolean>;
            /**
             * Show optional indicator
             */
            showOptional: PropTypes.Requireable<boolean>;
            /**
             * Validation messages to show for this field; only rendered if 'showErrors' is true
             */
            validationMessages: PropTypes.Requireable<(import("@jutro/prop-types").IntlMessageShape | null | undefined)[]>;
            /**
             * Layout to use with this field; default is more control and less label; other option is 'reversed'
             */
            layout: PropTypes.Requireable<string>;
            /**
             * Hides the label on any layout
             */
            hideLabel: PropTypes.Requireable<boolean>;
            /**
             * Additional style to apply to the component
             */
            className: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the content container of the component
             */
            contentContainerClassName: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the control of the component
             */
            controlClassName: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the label of the component
             */
            labelClassName: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the secondary label of the component
             */
            secondaryLabelClassName: PropTypes.Requireable<string>;
            /**
             * Additional style to apply to the label container of the component
             */
            labelContainerClassName: PropTypes.Requireable<string>;
            /**
             * Used to display or not the validation icon
             */
            showValidationIcon: PropTypes.Requireable<boolean>;
            /**
             * The full path of view model
             */
            dataPath: PropTypes.Requireable<string>;
            /**
             * An object which should contain a regex pattern as string and a validation message as string
             */
            validator: PropTypes.Requireable<PropTypes.InferProps<{
                pattern: PropTypes.Validator<string>;
                message: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
            }>>;
            /**
             * Used to override the default required field message
             */
            requiredFieldValidationMessage: PropTypes.Requireable<string>;
            /**
             * Success message to apply to component if it is valid
             */
            successMessage: PropTypes.Requireable<string>;
            /**
             * Message props(error message/aria-label)
             */
            messageProps: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Required message
                 */
                requiredField: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            }>>;
            /**
             * Allows to select label position
             */
            labelPosition: PropTypes.Requireable<string>;
            /**
             * Include any FieldComponent property to use at 'phone' breakpoint
             */
            phone: PropTypes.Requireable<object>;
            /**
             * Include any FieldComponent property to use 'phoneWide' and 'phone' breakpoint
             */
            phoneWide: PropTypes.Requireable<object>;
            /**
             * Include any FieldComponent property to use at 'tablet', 'phoneWide' and 'phone' breakpoint
             */
            tablet: PropTypes.Requireable<object>;
            /**
             * Type attribute specifies the type of <input> element to display.
             */
            inputType: PropTypes.Requireable<string>;
            /**
             * Data attribute that specifies the data-testid used in testing. If not provided data attribute set to id.
             */
            testId: PropTypes.Requireable<string>;
            /**
             * Optional callback used by @jutro/validation package to register field validation to use validation hook.
             */
            registerValidation: PropTypes.Requireable<(...args: any[]) => any>;
            /**
             * Used by @jutro/validation package: Displays multiple field validation messages all at once.
             */
            enableMultipleValidation: PropTypes.Requireable<boolean>;
        }, "secondaryLabel" | "path" | "className" | "label" | "disabled" | "visible" | "value" | "onFocus" | "onBlur" | "messageProps" | "tooltip" | "phone" | "phoneWide" | "tablet" | "layout" | "defaultValue" | "placeholder" | "labelClassName" | "required" | "schemaRequired" | "readOnly" | "nullable" | "autoTrim" | "onValueChange" | "onValidationChange" | "model" | "showErrors" | "showRequired" | "showOptional" | "validationMessages" | "hideLabel" | "contentContainerClassName" | "controlClassName" | "secondaryLabelClassName" | "labelContainerClassName" | "showValidationIcon" | "dataPath" | "validator" | "requiredFieldValidationMessage" | "successMessage" | "labelPosition" | "inputType" | "testId" | "registerValidation" | "enableMultipleValidation">>> & P)["tooltip"] | undefined;
    };
    /**
     * Determines whether tooltip icon should be rendered
     *
     * @param {string|object} [tooltip] - tooltip icon component
     * @param {string} [layout] - tooltip icon component
     * @returns {boolean} true/false value indicating whether tooltip icon should be rendered
     */
    shouldRenderTooltipIcon(): boolean;
    /**
     * Render label for this component. Apply 'required' styling as appropriate.
     *
     * @param {object} breakpointProps - object with props according to the breakpoint
     * @param {string} [className] - custom class applied to the label
     * @param {string} [secondaryClassName] - custom class applied to the secondary label
     * @returns {React.ReactElement} JSX for the label
     */
    renderLabel(breakpointProps: object, className?: string | undefined, secondaryClassName?: string | undefined): React.ReactElement;
    /**
     * Render readonly control for this component.
     *
     * @param {object} breakpointProps - breakpoint-specific props
     *
     * @returns {React.ReactElement} JSX for the control
     */
    renderControlReadOnly(breakpointProps: object): React.ReactElement;
    /**
     * Should display default readOnly char?
     *
     * @param {string} value
     *
     * @returns {boolean} true if value is empty
     */
    shouldDisplayDefaultROValue(value: string): boolean;
    /**
     * Render control for this component.
     *
     * @param {object} breakpointProps - breakpoint-specific props
     * @param {object} options - additional options
     *
     * @returns {React.ReactNode} JSX for the control
     */
    renderControl(breakpointProps: object, options: object): React.ReactNode;
    /**
     * generates the data-path attribute
     *
     * @returns {object} the data-path attribute when dataPath is provided via props
     */
    generateDataPathProperty(): object;
    /**
     * generates accessibility properties for the field component
     *
     * @returns {object} set of applicable wai-aria tags
     */
    generateAccessibilityProperties(): object;
    getMessages(...args: any[]): any;
    /**
     * Render messages for this component. Messages are expected to be translated before passing in.
     *
     * @param {Array<any>} validationMessages - error messages to render
     * @param {string} successMessage - info message to render
     * @param {boolean} isValid - indicates whether the component is valid or not
     * @returns {React.ReactElement}   JSX for the messages
     */
    renderMessages(...args: any[]): React.ReactElement;
    renderValidationIcon(showValidationIcon: any, readOnly: any, isValid: any): JSX.Element | null;
    isValid(...args: any[]): any;
    /**
     * Return translator from context or default translator if
     * the former is undefined
     *
     * @returns {Function}
     */
    get translator(): Function;
    renderFieldComponent: (breakpoint: any) => React.ReactElement<any, any> | null;
    getLayoutComponent: () => React.FC<PropTypes.InferProps<{
        labelContent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        controlContent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        messageContent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
    }>> | undefined;
}
import PropTypes from "prop-types";
import React from "react";
