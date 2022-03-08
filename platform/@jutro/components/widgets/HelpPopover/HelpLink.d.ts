/**
 * The `HelpLink` component is designed as a simple component presenting link inside the Help dropdown on Application Header.
 *
 * @type {React.FC<PropTypes.InferProps<typeof helpLinkPropTypes>>}
 *
 * @metadataType element
 */
export const HelpLink: React.FC<PropTypes.InferProps<typeof helpLinkPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace helpLinkPropTypes {
    export const className: PropTypes.Requireable<string>;
    export const content: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    export { intlMessageShape as href };
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
