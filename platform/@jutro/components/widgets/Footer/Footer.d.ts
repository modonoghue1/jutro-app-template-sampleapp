/**
 * The `Footer` component is designed as the container for a set of components that should be displayed on the footer of
 * application using `Jutro`. Dedicated components that should be used as children are `FooterNavBar` along with
 * `FooterNavLink`s, `FooterText` and `FooterCopyright`.
 *
 * @type {React.FC<PropTypes.InferProps<typeof footerPropTypes>>}
 *
 * @metadataType container
 */
export const Footer: React.FC<PropTypes.InferProps<typeof footerPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace footerPropTypes {
    const className: PropTypes.Requireable<string>;
    const children: (props: any, propName: any, componentName: any) => void;
    const fluid: PropTypes.Requireable<boolean>;
}
export {};
