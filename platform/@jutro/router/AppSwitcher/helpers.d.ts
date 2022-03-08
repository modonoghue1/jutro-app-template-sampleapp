import { AppSwitcherItem as Item, AppSwitcherApp as App, AppSwitcherGroup as Group, Separator } from '@jutro/prop-types';
import { ItemWithId, SeparatorWithId, GroupWithId, AppWithId } from './types';
export declare const isSeparator: (item: Item | ItemWithId) => item is Separator | SeparatorWithId;
export declare const isGroup: (item: Item | ItemWithId) => item is Group | GroupWithId;
export declare const isApp: (item: Item | ItemWithId) => item is App | AppWithId;
