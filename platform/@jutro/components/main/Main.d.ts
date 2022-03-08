import React from 'react';
declare type MainProps = {
    /**
     * Additional class names for component.
     */
    className?: string;
    /**
     * The container's content.
     */
    children: React.ReactNode;
    /**
     * Span the entire width.
     */
    fluid?: boolean;
    /**
     * Additional class names for content
     */
    contentClassName?: string;
};
/**
 * Main content of the page.
 */
export declare const Main: React.FC<MainProps>;
export {};
