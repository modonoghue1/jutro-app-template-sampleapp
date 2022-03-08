/**
 * Renders a card with a header and a body.
 *
 * @type {React.FC<PropTypes.InferProps<typeof cardPropTypes>>}
 *
 * @metadataType container
 */
export const Card: React.FC<PropTypes.InferProps<typeof cardPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace cardPropTypes {
    export const id: PropTypes.Validator<string>;
    export { intlMessageShape as title };
    export { intlMessageShape as subTitle };
    export const renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
    export const headerClass: PropTypes.Requireable<string>;
    export const className: PropTypes.Requireable<string>;
    export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    export { nestedTooltipShape as tooltip };
    export const isPanel: PropTypes.Requireable<boolean>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import { nestedTooltipShape } from "@jutro/prop-types/src/tooltipShape";
export {};
