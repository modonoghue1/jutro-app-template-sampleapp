import React, { ReactNode, WeakValidationMap } from 'react';
import type { BreakpointConsumerProps } from '@jutro/layout';
export declare type ActionTitleBarBaseProps = {
    className?: string;
    children: ReactNode | ReactNode[];
};
export declare type ActionTitleBarProps = BreakpointConsumerProps<ActionTitleBarBaseProps>;
/**
 * @metadataType container
 */
export declare const ActionTitleBar: React.FC<ActionTitleBarProps>;
export declare const actionTitleBarBasePropTypes: WeakValidationMap<ActionTitleBarBaseProps>;
