/**
 * Displays a message within the body of the page. You show it on event, and the user can dismiss it.
 *
 * @typedef {typeof InlineNotification.propTypes} InlineNotificationPropTypes
 * @extends Component<PropTypes.InferProps<InlineNotificationPropTypes>>
 *
 * @metadataType element
 */
export class InlineNotification extends React.Component<PropTypes.InferProps<{
    /**
     * Component unique identifier
     */
    id: PropTypes.Validator<string>;
    /**
     * CSS class name for this component
     */
    className: PropTypes.Requireable<string>;
    /**
     * Text to display on notification
     */
    message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * Phrase allowing to set color and appearance of notification (success, warning, error, info)
     */
    type: PropTypes.Requireable<string>;
    /**
     *  Function called when the notification disappear
     */
    onClosed: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * If true, the dismiss button appears with this component
     */
    isDismissable: PropTypes.Requireable<boolean>;
    /**
     * If true, attributes 'aria-hidden' and 'role' will be added
     */
    isEmbeddedNotification: PropTypes.Requireable<boolean>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * prefix text for success type message
         */
        success: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         *  prefix text for warning type message
         */
        warning: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         *  prefix text for info type message
         */
        info: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         *  prefix text for error type message
         */
        error: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         *  dismiss button aria-label
         */
        dismissLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
}>, any, any> {
    static propTypes: {
        /**
         * Component unique identifier
         */
        id: PropTypes.Validator<string>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Text to display on notification
         */
        message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Phrase allowing to set color and appearance of notification (success, warning, error, info)
         */
        type: PropTypes.Requireable<string>;
        /**
         *  Function called when the notification disappear
         */
        onClosed: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * If true, the dismiss button appears with this component
         */
        isDismissable: PropTypes.Requireable<boolean>;
        /**
         * If true, attributes 'aria-hidden' and 'role' will be added
         */
        isEmbeddedNotification: PropTypes.Requireable<boolean>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * prefix text for success type message
             */
            success: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for warning type message
             */
            warning: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for info type message
             */
            info: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for error type message
             */
            error: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  dismiss button aria-label
             */
            dismissLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
    };
    static defaultProps: {
        isDismissable: boolean;
        type: string;
        isEmbeddedNotification: boolean;
    };
    constructor(props: PropTypes.InferProps<{
        /**
         * Component unique identifier
         */
        id: PropTypes.Validator<string>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Text to display on notification
         */
        message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Phrase allowing to set color and appearance of notification (success, warning, error, info)
         */
        type: PropTypes.Requireable<string>;
        /**
         *  Function called when the notification disappear
         */
        onClosed: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * If true, the dismiss button appears with this component
         */
        isDismissable: PropTypes.Requireable<boolean>;
        /**
         * If true, attributes 'aria-hidden' and 'role' will be added
         */
        isEmbeddedNotification: PropTypes.Requireable<boolean>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * prefix text for success type message
             */
            success: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for warning type message
             */
            warning: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for info type message
             */
            info: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for error type message
             */
            error: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  dismiss button aria-label
             */
            dismissLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
    }> | Readonly<PropTypes.InferProps<{
        /**
         * Component unique identifier
         */
        id: PropTypes.Validator<string>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Text to display on notification
         */
        message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Phrase allowing to set color and appearance of notification (success, warning, error, info)
         */
        type: PropTypes.Requireable<string>;
        /**
         *  Function called when the notification disappear
         */
        onClosed: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * If true, the dismiss button appears with this component
         */
        isDismissable: PropTypes.Requireable<boolean>;
        /**
         * If true, attributes 'aria-hidden' and 'role' will be added
         */
        isEmbeddedNotification: PropTypes.Requireable<boolean>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * prefix text for success type message
             */
            success: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for warning type message
             */
            warning: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for info type message
             */
            info: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for error type message
             */
            error: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  dismiss button aria-label
             */
            dismissLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
    }>>);
    constructor(props: PropTypes.InferProps<{
        /**
         * Component unique identifier
         */
        id: PropTypes.Validator<string>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
        /**
         * Text to display on notification
         */
        message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Phrase allowing to set color and appearance of notification (success, warning, error, info)
         */
        type: PropTypes.Requireable<string>;
        /**
         *  Function called when the notification disappear
         */
        onClosed: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * If true, the dismiss button appears with this component
         */
        isDismissable: PropTypes.Requireable<boolean>;
        /**
         * If true, attributes 'aria-hidden' and 'role' will be added
         */
        isEmbeddedNotification: PropTypes.Requireable<boolean>;
        /**
         * Message props(error message/aria-label)
         */
        messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * prefix text for success type message
             */
            success: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for warning type message
             */
            warning: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for info type message
             */
            info: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  prefix text for error type message
             */
            error: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
            /**
             *  dismiss button aria-label
             */
            dismissLabel: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
    }>, context: any);
    handleDismiss: () => void;
}
/**
 * Displays a message within the body of the page. You show it on event, and the user can dismiss it.
 */
export type InlineNotificationPropTypes = typeof InlineNotification.propTypes;
import PropTypes from "prop-types";
import React from "react";
