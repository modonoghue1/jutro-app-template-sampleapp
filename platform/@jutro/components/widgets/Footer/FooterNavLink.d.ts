/**
 * The `FooterNavLink` component is designed as a simple component for presenting a navigation link inside the `FooterNavBar` container.
 *
 * @metadataType action
 *
 * @type {React.FC<PropTypes.InferProps<typeof footerNavLinkPropTypes>>}
 */
export const FooterNavLink: React.FC<PropTypes.InferProps<typeof footerNavLinkPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace footerNavLinkPropTypes {
    export const className: PropTypes.Requireable<string>;
    export const header: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    export { intlMessageShape as url };
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
