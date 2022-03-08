import React from 'react';
export declare const RightSideBarContext: React.Context<Partial<RightSideBarContextProps>>;
export declare type SideId = number | string;
export declare type CollapseStateProps = {
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
};
export declare type SidesStateProps = {
    activeSide: SideId;
    setActiveSide: (activeSide: SideId) => void;
};
export declare type RightSideBarContextProps = {
    collapse: CollapseStateProps;
    sides: SidesStateProps;
};
