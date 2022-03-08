import React, { CSSProperties } from 'react';
import { Renderers, TooltipHandler, EncodeEntryName } from 'vega';
import { ViewListener, PlainObject, VisualizationSpec } from 'react-vega';
declare type ErrorHandler = (error: Error) => unknown;
declare type TooltipType = TooltipHandler | boolean;
declare type VegaProps = {
    data?: PlainObject;
    className?: string;
    spec: VisualizationSpec;
    style?: CSSProperties;
    onNewView?: ViewListener;
    onError?: ErrorHandler;
    logLevel?: number;
    renderer?: Renderers;
    onTooltip?: TooltipType;
    width?: number;
    height?: number;
    padding?: number | {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    };
    hover?: boolean | {
        hoverSet?: EncodeEntryName;
        updateSet?: EncodeEntryName;
    };
};
/**
 * Jutro wrapper for Vega visualization component. Detailed props descriptions can be found here -
 * https://github.com/vega/react-vega/tree/master/packages/react-vega#props, specification -
 * https://vega.github.io/vega/docs/specification/.
 *
 * @metadataType element
 */
export declare const Vega: React.FC<VegaProps>;
export {};
