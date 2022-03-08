/**
 * PhaseProgressBar
 * @type {React.FC<PropTypes.InferProps<typeof phaseProgressBarPropTypes>>}
 */
export const PhaseProgressBar: React.FC<PropTypes.InferProps<typeof phaseProgressBarPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace phaseProgressBarPropTypes {
    const phases: PropTypes.Validator<PropTypes.InferProps<{
        id: PropTypes.Validator<string>;
        steps: PropTypes.Validator<PropTypes.InferProps<{
            title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
            visited: PropTypes.Requireable<boolean>;
            active: PropTypes.Requireable<boolean>;
        }>[]>;
        title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        icon: PropTypes.Requireable<string>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        className: PropTypes.Requireable<string>;
        isError: PropTypes.Requireable<boolean>;
        showLabel: PropTypes.Requireable<boolean>;
    }>[]>;
    const className: PropTypes.Requireable<string>;
}
export {};
