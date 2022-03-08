import { Separator, AppSwitcherGroup, AppSwitcherApp } from '@jutro/prop-types';
export declare type SeparatorWithId = Separator & {
    id: string;
};
declare type GroupItemsWithId = AppSwitcherApp & {
    id: string;
};
export declare type GroupWithId = (Omit<AppSwitcherGroup, 'items'> & {
    items: GroupItemsWithId[];
}) & {
    id: string;
};
export declare type AppWithId = AppSwitcherApp & {
    id: string;
};
export declare type ItemWithId = GroupWithId | AppWithId | SeparatorWithId;
export declare type ItemOrSeparatorWithId = AppWithId | SeparatorWithId;
export {};
