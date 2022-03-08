import React from 'react';
import { SideContentShape } from '@jutro/prop-types';
import { SideId } from '../RightSideBarContext';
declare type IconsBarProps = {
    className?: string;
    sides: Array<SideContentShape>;
    activeSide?: SideId;
    onSelection: (siede: SideId) => void;
};
/**
 * The `IconsBar` component is designed as a container for Icon tabs
 *
 * @param {object} props properties for IconsBar component
 * @returns {React.ReactElement}
 *
 * @metadataType container
 */
export declare const IconsBar: React.FC<IconsBarProps>;
export {};
