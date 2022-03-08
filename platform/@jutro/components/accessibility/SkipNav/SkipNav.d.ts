/**
 * Component providing a link to skip the navigation menu when focused.
 * Assumes that the application uses jutro header/main/footer layout.
 *
 * @type {React.FC<PropTypes.InferProps<typeof skipNavPropTypes>>}
 */
export const SkipNav: React.FC<PropTypes.InferProps<typeof skipNavPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace skipNavPropTypes {
    const messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        skipNavMessage: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
}
export {};
