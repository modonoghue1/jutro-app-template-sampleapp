import React from 'react';
import { ReactComponentLike } from 'prop-types';
import { SideContentShape } from '@jutro/prop-types';
declare type RightSideBarProps = {
    className?: string;
    collapsible?: boolean;
    isInitiallyCollapsed?: boolean;
    sides: Array<SideContentShape>;
    componentMap?: Record<string, ReactComponentLike>;
    expandOverContent?: boolean;
};
/**
 * The `RightSideBar` component is designed as a container for 'IconsBar' and "SideBody"
 *
 * @metadataType container
 */
export declare const RightSideBar: React.FC<RightSideBarProps>;
export {};
