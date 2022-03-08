import React, { ErrorInfo, ReactNode } from 'react';
import PropTypes from 'prop-types';
export declare type FallbackComponentProps = {
    error: Error;
};
export declare type ErrorBoundaryPropTypes = {
    onError?: (error: Error, errorInfo: ErrorInfo) => unknown;
    fallbackComponent: React.ComponentType<FallbackComponentProps>;
    children: ReactNode;
    [x: string]: unknown;
};
declare type ErrorBoundaryState = {
    error: Error | null;
};
/**
 * Introduces a customizable error boundary capable of reporting errors
 * to Jutro events and rendering acceptable UIs in production
 *
 * @metadataType container
 */
export declare class ErrorBoundary extends React.Component<ErrorBoundaryPropTypes, ErrorBoundaryState> {
    static propTypes: {
        /**
         * An optional action to be triggered when errors occur
         */
        onError: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * An optional custom component to replace the error UI while keeping the error reporting
         */
        fallbackComponent: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        /**
         * Children to be wrapped by the error boundary
         */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        onError: (error: Error, errorInfo: React.ErrorInfo) => void;
        fallbackComponent: React.FC<import("../ErrorNotice/ErrorNotice").ErrorNoticePropTypes>;
        children: null;
    };
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    state: ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): ReactNode;
}
export {};
