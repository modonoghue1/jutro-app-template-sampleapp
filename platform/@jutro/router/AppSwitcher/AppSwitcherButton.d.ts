import React from 'react';
export declare const availableIconColors: readonly ["light", "neutral", "dark"];
declare type AppSwitcherButtonProps = {
    /**
     * Used to identify this component.
     */
    id: string;
    /**
     * Callback to toggle the popover
     */
    togglePopover?: () => void;
    /**
     * Flag states if the popover is currently opened
     */
    hasShownPopover?: boolean;
    /**
     * Flag states if the trigger icon should be focused
     */
    isFocused?: boolean;
    /**
     * The color of the icon
     */
    iconColor?: typeof availableIconColors[number];
    /**
     * CSS class name of the icon
     */
    iconClassName?: string;
    /**
     * Callback to set a new focused index
     */
    onIndexFocusChange?: (index: number) => void;
};
export declare const AppSwitcherButton: React.ForwardRefExoticComponent<AppSwitcherButtonProps & React.RefAttributes<HTMLElement>>;
export {};
