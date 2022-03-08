/**
 * Displays a "breadcrumb" of links to previous pages with anchor tags or Link components
 *
 * @metadataType action
 *
 * @type {React.FC<PropTypes.InferProps<typeof breadcrumbPropTypes>>}
 */
export const Breadcrumb: React.FC<PropTypes.InferProps<typeof breadcrumbPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace breadcrumbPropTypes {
    const className: PropTypes.Requireable<string>;
    const links: PropTypes.Requireable<(PropTypes.InferProps<{
        text: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        href: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        to: React.Requireable<import("@jutro/prop-types").IntlToShape>;
        className: PropTypes.Requireable<string>;
        history: PropTypes.Requireable<object>;
    }> | null | undefined)[]>;
    const theme: PropTypes.Requireable<object>;
    const renderLinkTrigger: PropTypes.Requireable<(...args: any[]) => any>;
    const lastItemClickable: PropTypes.Requireable<boolean>;
    const backLinkWithoutText: PropTypes.Requireable<boolean>;
}
export {};
