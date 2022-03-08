import React from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
export declare type InfoLabelType = 'success' | 'error' | 'warning' | 'info' | 'neutral';
declare type InfoLabelProps = {
    /**
     * The children elements to render inside of the InfoLabel
     */
    children?: React.ReactNode | IntlMessageShape;
    /**
     * CSS class name for this component
     */
    className?: string;
    /**
     * The short-name of the optional Material icons
     */
    icon?: string;
    /**
     * Where the icon is placed relative to the text
     */
    iconPosition?: 'left' | 'right';
    /**
     * Component unique identifier
     */
    id: string;
    /**
     * Label message that is either a string or an object representing internationalized message ({id: `key`, defaultMessage: `default text`})
     * will be shown when children is not provided
     */
    message?: IntlMessageShape;
    /**
     * Phrase allowing to set custom flavor (success, info, neutral, etc.)
     */
    type?: InfoLabelType;
};
export declare const availableInfoLabelTypes: InfoLabelType[];
/**
 * Displays an "InfoLabel" element with child components, such as text or images.
 *
 * @metadataType element
 */
export declare const InfoLabel: React.FC<InfoLabelProps>;
export {};
