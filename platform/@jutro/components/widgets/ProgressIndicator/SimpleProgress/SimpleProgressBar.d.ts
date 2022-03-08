/**
 * SimpleProgressBar
 * @type {React.FC<PropTypes.InferProps<typeof simpleProgressBarPropTypes>>}
 */
export const SimpleProgressBar: React.FC<PropTypes.InferProps<typeof simpleProgressBarPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace simpleProgressBarPropTypes {
    export const id: PropTypes.Validator<string>;
    export const completed: PropTypes.Validator<number>;
    export const total: PropTypes.Validator<number>;
    export const className: PropTypes.Requireable<string>;
    export const progressBarClassName: PropTypes.Requireable<string>;
    export const stepClassName: PropTypes.Requireable<string>;
    export { intlMessageShape as label };
    export const labelPosition: PropTypes.Requireable<string>;
    export const showProgressLabel: PropTypes.Requireable<boolean>;
    export const showPercentageProgress: PropTypes.Requireable<boolean>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
