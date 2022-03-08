/**
 * CardHeader
 * @type {React.FC<PropTypes.InferProps<typeof cardHeaderPropTypes>>}
 */
export const CardHeader: React.FC<PropTypes.InferProps<typeof cardHeaderPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace cardHeaderPropTypes {
    export const className: PropTypes.Requireable<string>;
    export { intlMessageShape as title };
    export { intlMessageShape as subTitle };
    export { nestedTooltipShape as tooltip };
    export const renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import { nestedTooltipShape } from "@jutro/prop-types/src/tooltipShape";
export {};
