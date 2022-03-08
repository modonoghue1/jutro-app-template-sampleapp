import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DeviceType, Breakpoints } from '../types';
import { extendWithBreakpointValues } from './breakpoint.utils';
interface BreakpointTrackerState {
    breakpoint?: DeviceType;
}
export declare const BreakpointTrackerContext: React.Context<DeviceType>;
export declare function withBreakpoint(ComponentToWrap: React.ComponentType): React.ComponentType;
export declare function renderWithBreakpoint(render: (breakpoint: DeviceType) => React.ReactNode): React.ReactNode;
export default class BreakpointTracker extends Component<PropTypes.InferProps<typeof BreakpointTracker.propTypes>, BreakpointTrackerState> {
    static propTypes: {
        delayMs: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        delayMs: number;
    };
    static applyBreakpointOverrides: typeof extendWithBreakpointValues;
    state: BreakpointTrackerState;
    breakpoints: Breakpoints;
    resizeTimer: number | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    /**
     * Gets devices breakpoints calculated in pixels.
     * If rootElement is not specified all relative units (em, %) rely on document.body.
     *
     * @param {object} [rootElement] - root DOM element for width calculation of relative units(em, %)
     * @returns {object}
     */
    static getBreakpoints: (rootElement?: Element | undefined) => Breakpoints;
    static getBreakpointPxValue: (device: DeviceType, rootElement?: Element | undefined) => number | false;
    getBreakpointFromWidth(width: number): DeviceType;
    throttleResize: () => void;
    handleResize: () => void;
    render(): JSX.Element | null;
}
export {};
