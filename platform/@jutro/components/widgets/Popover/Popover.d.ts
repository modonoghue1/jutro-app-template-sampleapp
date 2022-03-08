export const availableAlignments: string[];
/**
 * Popover
 * @type {React.FC<PropTypes.InferProps<typeof popoverPropTypes>>}
 */
export const Popover: React.FC<PropTypes.InferProps<typeof popoverPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace popoverPropTypes {
    const id: PropTypes.Validator<string>;
    const className: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    const renderTrigger: PropTypes.Validator<(...args: any[]) => any>;
    const align: PropTypes.Requireable<string>;
    const isFlipEnabled: PropTypes.Requireable<boolean>;
    const onClosed: PropTypes.Requireable<(...args: any[]) => any>;
}
export {};
