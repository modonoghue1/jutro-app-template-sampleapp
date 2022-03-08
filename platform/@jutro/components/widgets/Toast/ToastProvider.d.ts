/** @typedef {typeof ToastProvider.propTypes} ToastProviderPropTypes
 * @extends Component<PropTypes.InferProps<ToastProviderPropTypes>> */
export class ToastProvider extends React.Component<PropTypes.InferProps<{
    /**
     * number in ms until toast closes or boolean for autoclose. If boolean and true, the toast would be closed automatically after 5s
     * If false, focus will be drawn to the dismiss button
     */
    autoClose: PropTypes.Requireable<number | boolean>;
    /**
     * Phrase allowing to set color and appearance of toast (success, warning, error, info)
     */
    type: PropTypes.Requireable<string>;
    /**
     * Text to display on notification
     */
    message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    /**
     * If true, focus will be drawn to the dismiss button on opening even if autoClose={true}
     */
    autoFocus: PropTypes.Requireable<boolean>;
    /**
     * Function called when the notification disappear
     */
    onClosed: PropTypes.Requireable<(...args: any[]) => any>;
}>, any, any> {
    static propTypes: {
        /**
         * number in ms until toast closes or boolean for autoclose. If boolean and true, the toast would be closed automatically after 5s
         * If false, focus will be drawn to the dismiss button
         */
        autoClose: PropTypes.Requireable<number | boolean>;
        /**
         * Phrase allowing to set color and appearance of toast (success, warning, error, info)
         */
        type: PropTypes.Requireable<string>;
        /**
         * Text to display on notification
         */
        message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, focus will be drawn to the dismiss button on opening even if autoClose={true}
         */
        autoFocus: PropTypes.Requireable<boolean>;
        /**
         * Function called when the notification disappear
         */
        onClosed: PropTypes.Requireable<(...args: any[]) => any>;
    };
    /**
     * Static helper for triggering toasts directly from the ToastProvider
     *
     * @typedef {object} IntlMessageObject
     * @prop {string} [id]
     * @prop {string} [defaultMessage]
     * @prop {Record<string, string>} [args]
     *
     * @typedef {string | IntlMessageObject} IntlMessageShape
     *
     * @typedef {object} ToastProps
     * @prop {IntlMessageShape} message The message to be displayed in the toast container
     * @prop {string} type The toast container type
     * @prop {boolean | number} [autoClose] Whether to automatically close the toast container after 5s if boolean and time until close if number
     * @prop {boolean} [autoFocus] Whether to automatically focus on the toast container after it is shown
     * @prop {function} [onClosed] An optional callback to trigger
     * @param {ToastProps} props
     * @returns {void} nothing
     */
    static toast({ message, type, autoClose, autoFocus, onClosed }: {
        /**
         * The message to be displayed in the toast container
         */
        message: string | {
            id?: string | undefined;
            defaultMessage?: string | undefined;
            args?: Record<string, string> | undefined;
        };
        /**
         * The toast container type
         */
        type: string;
        /**
         * Whether to automatically close the toast container after 5s if boolean and time until close if number
         */
        autoClose?: number | boolean | undefined;
        /**
         * Whether to automatically focus on the toast container after it is shown
         */
        autoFocus?: boolean | undefined;
        /**
         * An optional callback to trigger
         */
        onClosed?: Function | undefined;
    }): void;
    constructor(props: PropTypes.InferProps<{
        /**
         * number in ms until toast closes or boolean for autoclose. If boolean and true, the toast would be closed automatically after 5s
         * If false, focus will be drawn to the dismiss button
         */
        autoClose: PropTypes.Requireable<number | boolean>;
        /**
         * Phrase allowing to set color and appearance of toast (success, warning, error, info)
         */
        type: PropTypes.Requireable<string>;
        /**
         * Text to display on notification
         */
        message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, focus will be drawn to the dismiss button on opening even if autoClose={true}
         */
        autoFocus: PropTypes.Requireable<boolean>;
        /**
         * Function called when the notification disappear
         */
        onClosed: PropTypes.Requireable<(...args: any[]) => any>;
    }> | Readonly<PropTypes.InferProps<{
        /**
         * number in ms until toast closes or boolean for autoclose. If boolean and true, the toast would be closed automatically after 5s
         * If false, focus will be drawn to the dismiss button
         */
        autoClose: PropTypes.Requireable<number | boolean>;
        /**
         * Phrase allowing to set color and appearance of toast (success, warning, error, info)
         */
        type: PropTypes.Requireable<string>;
        /**
         * Text to display on notification
         */
        message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, focus will be drawn to the dismiss button on opening even if autoClose={true}
         */
        autoFocus: PropTypes.Requireable<boolean>;
        /**
         * Function called when the notification disappear
         */
        onClosed: PropTypes.Requireable<(...args: any[]) => any>;
    }>>);
    constructor(props: PropTypes.InferProps<{
        /**
         * number in ms until toast closes or boolean for autoclose. If boolean and true, the toast would be closed automatically after 5s
         * If false, focus will be drawn to the dismiss button
         */
        autoClose: PropTypes.Requireable<number | boolean>;
        /**
         * Phrase allowing to set color and appearance of toast (success, warning, error, info)
         */
        type: PropTypes.Requireable<string>;
        /**
         * Text to display on notification
         */
        message: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * If true, focus will be drawn to the dismiss button on opening even if autoClose={true}
         */
        autoFocus: PropTypes.Requireable<boolean>;
        /**
         * Function called when the notification disappear
         */
        onClosed: PropTypes.Requireable<(...args: any[]) => any>;
    }>, context: any);
}
export type ToastProviderPropTypes = typeof ToastProvider.propTypes;
import PropTypes from "prop-types";
import React from "react";
