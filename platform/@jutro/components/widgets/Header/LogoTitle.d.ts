export function translateTitle(title: any, translator: any): any;
/**
 * LogoTitle
 * @type {React.FC<PropTypes.InferProps<typeof logoTitlePropTypes>>}
 *
 * @metadataType element
 */
export const LogoTitle: React.FC<PropTypes.InferProps<typeof logoTitlePropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace logoTitlePropTypes {
    const src: PropTypes.Requireable<string>;
    const alt: PropTypes.Requireable<string>;
    const title: PropTypes.Requireable<import("@jutro/prop-types").IntlMessageShape | ((...args: any[]) => any)>;
    const renderTitle: PropTypes.Requireable<(...args: any[]) => any>;
    const className: PropTypes.Requireable<string>;
    const logoClassName: PropTypes.Requireable<string>;
    const titleClassName: PropTypes.Requireable<string>;
}
export {};
