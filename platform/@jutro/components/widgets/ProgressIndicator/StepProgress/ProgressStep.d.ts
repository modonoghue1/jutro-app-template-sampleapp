import React from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
export declare type ProgressStepType = {
    /**
     * Text part for labeling the step
     */
    title: IntlMessageShape;
    /**
     * Indicates if step marker should be displayed as visited.
     */
    visited?: boolean;
    /**
     * Indicates if step marker should be displayed as currently active step.
     */
    active?: boolean;
    /**
     * Indicates if step marker should be displayed as disabled.
     */
    disabled?: boolean;
    /**
     * Handler for click event on progress marker.
     */
    onClick?: (e: React.SyntheticEvent) => void;
};
export declare type ProgressStepPropsTypes = {
    /**
     * Component's identifier. Should be unique on a per-page basis.
     */
    id: string;
    /**
     * The children elements to render inside
     */
    step: ProgressStepType;
    /**
     * Class to override progress step styles
     */
    className?: string;
    /**
     * If true component will be vertically oriented
     */
    isVertical?: boolean | null;
    /**
     * Step index
     */
    index: number;
};
export declare const ProgressStep: React.FC<ProgressStepPropsTypes & {
    children?: never;
}>;
