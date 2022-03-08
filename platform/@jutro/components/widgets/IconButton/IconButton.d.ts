export const availableIconColors: string[];
/**
 * @type {React.ForwardRefRenderFunction<PropTypes.InferProps<typeof iconButtonPropTypes>>}
 * @metadataType action
 */
export const IconButton: React.ForwardRefRenderFunction<PropTypes.InferProps<typeof iconButtonPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace iconButtonPropTypes {
    export const id: PropTypes.Requireable<string>;
    export const className: PropTypes.Requireable<string>;
    export const iconClassName: PropTypes.Requireable<string>;
    export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    export const onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
    export const onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
    export const onKeyPress: PropTypes.Requireable<(...args: any[]) => any>;
    export { intlMessageShape as ariaLabel };
    export const icon: PropTypes.Validator<string>;
    export const iconColor: PropTypes.Requireable<string>;
    export const disabled: PropTypes.Requireable<boolean>;
    export { tooltipShape as tooltip };
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import { tooltipShape } from "@jutro/prop-types/src/tooltipShape";
export {};
