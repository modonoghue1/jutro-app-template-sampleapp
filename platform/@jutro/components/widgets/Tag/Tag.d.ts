/**
 * Tag
 * @type {React.FC<PropTypes.InferProps<typeof tagPropTypes>>}
 *
 * @metadataType element
 */
export const Tag: React.FC<PropTypes.InferProps<typeof tagPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace tagPropTypes {
    export const id: PropTypes.Requireable<string>;
    export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    export const icon: PropTypes.Requireable<string>;
    export const renderIcon: PropTypes.Requireable<(...args: any[]) => any>;
    export { intlMessageShape as label };
    export const disabled: PropTypes.Requireable<boolean>;
    export const className: PropTypes.Requireable<string>;
    export const labelClassName: PropTypes.Requireable<string>;
    export const iconWrapperClassName: PropTypes.Requireable<string>;
    export const iconClassName: PropTypes.Requireable<string>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
