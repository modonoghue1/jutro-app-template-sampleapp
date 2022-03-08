import React, { ReactElement } from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
declare type ResolveFunc = () => void;
declare type AppSwitcherModalPropTypes = {
    /**
     * Boolean denoting if the modal is open
     */
    isOpen?: boolean;
    /**
     * Callback function called when the modal is closed
     */
    onResolve?: ResolveFunc;
    /**
     * Title displayed in modal header
     */
    title?: IntlMessageShape;
    /**
     * Function which takes 'onRouteClick' callback and returns AppSwitcher
     */
    renderAppSwitcher?: (onResolve?: ResolveFunc) => ReactElement;
};
/**
 * Modal wrapper for AppSwitcher
 */
export declare const AppSwitcherModal: React.FC<AppSwitcherModalPropTypes>;
export {};
