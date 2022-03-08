/**
 * ButtonLink is an Jutro component,
 *
 * @extends React.Component<{}>
 *
 * @metadataType action
 */
export class ButtonLinkInternal extends React.Component<{}, any, any> {
    static propTypes: {
        /**
         * The replace prop will replace the current entry in the history stack
         */
        replace: PropTypes.Requireable<boolean>;
        /**
         * The destination path when promise is resolved; can be an object like <Link to>.
         * Use this for paths internal to the application.
         */
        to: React.Requireable<import("@jutro/prop-types").IntlToShape>;
        /**
         * The destination path when promise is resolved;
         * Use this for paths external to the application.
         */
        href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        /**
         * Get ref to the inner rendered <a> or <button>
         */
        innerRef: PropTypes.Requireable<string | ((...args: any[]) => any) | PropTypes.InferProps<{
            current: PropTypes.Requireable<Element>;
        }>>;
        /**
         * The child element wrapped in the component
         */
        children: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        /**
         * Callback when button is clicked
         */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * CSS class name for this component
         */
        className: PropTypes.Requireable<string>;
        allowNoLeadingSlash: PropTypes.Requireable<boolean>;
    };
    static displayName: string;
    static defaultProps: any;
    static contextType: React.Context<import("@jutro/locale").Translator>;
    constructor(props: {} | Readonly<{}>);
    constructor(props: {}, context: any);
    translator: any;
    urlTranslatorAndSanitizer: import("@jutro/locale/src/helpers/useSafeTranslatedUrls").UrlTranslatorAndSanitizer;
    /**
     * 'onClick' callback to invoke callback and continue navigation
     *
     * @param {Event} event - event object
     */
    handleClick: (event: Event) => void;
}
/** @type {React.ComponentType<ButtonLinkInternal.PropTypes>} */
export const ButtonLink: React.ComponentType<any>;
import React from "react";
import PropTypes from "prop-types";
