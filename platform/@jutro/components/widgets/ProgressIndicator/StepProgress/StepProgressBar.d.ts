import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { ProgressStepType } from './ProgressStep';
/**
 *progressStepPropType should be removed when we will get rid of PropTypes, use progressStepType from instead
 */
export declare const progressStepPropType: React.WeakValidationMap<ProgressStepType>;
export declare const stepProgressBarPropTypes: {
    /**
     * Steps data
     */
    steps: PropTypes.Validator<PropTypes.InferProps<React.WeakValidationMap<ProgressStepType>>[]>;
    /**
     * Class to override progress bar styles
     */
    className: PropTypes.Requireable<string>;
    /**
     * If true component will be vertically oriented
     */
    isVertical: PropTypes.Requireable<boolean>;
};
declare type ProgressStepsProps = InferProps<typeof stepProgressBarPropTypes>;
export declare const StepProgressBar: React.FC<ProgressStepsProps & {
    children?: never;
}>;
export {};
