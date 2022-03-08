/**
 * The `FooterNavBar` component is designed as a container for navigation links inside the `Footer` container.
 * It should be used along with `FooterNavLink` as children.
 *
 * @type {React.FC<PropTypes.InferProps<typeof footerNavBarPropTypes>>}
 *
 * @metadataType container
 */
export const FooterNavBar: React.FC<PropTypes.InferProps<typeof footerNavBarPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace footerNavBarPropTypes {
    const className: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<React.ReactElement<Record<string, unknown>, React.ComponentType<Record<string, unknown>>> | React.ReactElement<Record<string, unknown>, React.ComponentType<Record<string, unknown>>>[]>;
}
export {};
