/**
 * OutsideClickDetector
 * @type {React.FC<PropTypes.InferProps<typeof outsideClickDetectorPropTypes>>}
 */
export const OutsideClickDetector: React.FC<PropTypes.InferProps<typeof outsideClickDetectorPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace outsideClickDetectorPropTypes {
    const onClickOutside: PropTypes.Requireable<(...args: any[]) => any>;
    const onWindowBlur: PropTypes.Requireable<(...args: any[]) => any>;
}
export {};
