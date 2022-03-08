/**
 * PhaseProgressLabel
 * @type {React.FC<PropTypes.InferProps<typeof phaseProgressLabelPropTypes>>}
 */
export const PhaseProgressLabel: React.FC<PropTypes.InferProps<typeof phaseProgressLabelPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace phaseProgressLabelPropTypes {
    export { intlMessageShape as title };
    export { intlMessageShape as stepTitle };
    export const icon: PropTypes.Requireable<string>;
    export const complete: PropTypes.Requireable<boolean>;
    export const active: PropTypes.Requireable<boolean>;
    export const isError: PropTypes.Requireable<boolean>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
