import React from 'react';
import { AppWithId } from './types';
declare type AppSwitcherElementProps = {
    /**
     * Item to be rendered
     */
    item: AppWithId;
    /**
     * Function to reset search phrase
     */
    resetSearch: () => void;
    /**
     * Callback invoked when any route is clicked
     */
    onRouteClick?: () => void;
    /**
     * Function to close popover if content is rendered in popover
     */
    closePopover?: () => void;
};
export declare const AppSwitcherElement: React.FC<AppSwitcherElementProps>;
export {};
