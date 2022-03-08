import React from 'react';
declare type Props = {
    /**
     * Id of the icon
     */
    id?: string;
    /**
     * CSS class name for this component
     */
    className?: string | null;
    /**
     * Icon name (gw-*) to be used
     */
    icon: string;
    /**
     * Icon color to be used
     */
    color?: string | null;
    /**
     * Set of custom props for the svg
     */
    svgProps?: React.SVGProps<SVGSVGElement>;
};
export declare const IconSVG: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>>;
export {};
