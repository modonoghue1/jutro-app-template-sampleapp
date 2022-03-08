export namespace phaseProgressPropTypes {
    const id: PropTypes.Validator<string>;
    const steps: PropTypes.Validator<PropTypes.InferProps<{
        title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
        visited: PropTypes.Requireable<boolean>;
        active: PropTypes.Requireable<boolean>;
    }>[]>;
    const title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    const icon: PropTypes.Requireable<string>;
    const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    const className: PropTypes.Requireable<string>;
    const isError: PropTypes.Requireable<boolean>;
    const showLabel: PropTypes.Requireable<boolean>;
}
/**
 * PhaseProgress
 * @type {React.FC<PropTypes.InferProps<typeof phaseProgressPropTypes>>}
 */
export const PhaseProgress: React.FC<PropTypes.InferProps<typeof phaseProgressPropTypes>>;
import PropTypes from "prop-types";
import React from "react";
