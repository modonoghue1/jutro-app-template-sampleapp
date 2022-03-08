import React, { ReactElement } from 'react';
import { ItemWithId } from './types';
declare type AppSwitcherContentProps = {
    /**
     * Array of Items to be displayed in the menu
     */
    items: ItemWithId[];
    /**
     * Should search be rendered
     */
    displaySearch?: boolean;
    /**
     * Function to render search
     */
    renderSearch?: () => ReactElement;
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
    /**
     * Are groups collapsible
     */
    isCollapsible?: boolean;
};
export declare const AppSwitcherContent: React.FC<AppSwitcherContentProps>;
export {};
