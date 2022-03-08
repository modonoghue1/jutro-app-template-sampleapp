/**
 * Class renders label for `FieldComponent`.
 */
export class FieldLabel extends React.PureComponent<any, any, any> {
    static propTypes: {
        /**
         * Used to identify the component. Significant for components with more complex structures, where aria-labelledby property needs to be used
         */
        id: PropTypes.Requireable<string>;
        /**
         * Used to identify the component. Applied to control and referenced by label
         */
        htmlFor: PropTypes.Validator<string>;
        /**
         * Text to display; if not provided, uses the value of the '[id]' prop
         */
        label: PropTypes.Requireable<string | object>;
        /**
         * Text for secondary label
         */
        secondaryLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, this field is required
         */
        required: PropTypes.Requireable<boolean>;
        /**
         * If true, this field is readonly?
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * If true, the label is not visible
         */
        hideLabel: PropTypes.Requireable<boolean>;
        /**
         * CSS class, provides an additional style to apply to the component
         */
        className: PropTypes.Requireable<string>;
        /**
         * CSS class, provides an additional style to apply to primary label
         */
        labelClassName: PropTypes.Requireable<string>;
        /**
         * CSS class, provides an additional style to apply to secondary label
         */
        secondaryLabelClassName: PropTypes.Requireable<string>;
        /**
         * If true, displays the `Optional` span
         */
        showOptional: PropTypes.Requireable<boolean>;
        /**
         * If true, displays the required asterisc next to the label
         */
        showRequired: PropTypes.Requireable<boolean>;
        /**
         * The icon to use in the tooltip. Use Material icon keyword, like "calendar" without any prefix
         */
        tooltipIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * The function used to translate strings
         */
        translator: PropTypes.Validator<(...args: any[]) => any>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * Optional message
             */
            optional: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        /**
         * Allows to select label position
         */
        labelPosition: PropTypes.Requireable<string>;
        /**
         * Additional style to apply to the label container of the component
         */
        labelContainerClassName: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        labelPosition: string;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    createLabel(label: any, classes: any, translator: any): any;
    /**
     * Renders component
     *
     * @returns {React.ReactElement}
     */
    renderLabel(): React.ReactElement;
}
import React from "react";
import PropTypes from "prop-types";
