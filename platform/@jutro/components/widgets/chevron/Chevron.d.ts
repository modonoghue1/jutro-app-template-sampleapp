export const Chevron: React.NamedExoticComponent<PropTypes.InferProps<{
    /**
     * CSS class name for this component
     */
    className: PropTypes.Requireable<string>;
    /**
     * The optional icon of this chevron
     */
    chevronIcon: PropTypes.Requireable<string>;
    /**
     * Optional flag indicating whether this chevron is open
     */
    isOpen: PropTypes.Requireable<boolean | object>;
    /**
     * Message props(error message/aria-label)
     */
    messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * accordion icon aria-label
         */
        label: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
}>>;
import PropTypes from "prop-types";
import React from "react";
