import React from 'react';
import { History } from 'history';
import { MicroAppLocationState } from './MicroAppRouterBinding';
declare type ShellHistoryProviderProps = {
    shellHistory: History<MicroAppLocationState>;
};
export declare const ShellHistoryContext: React.Context<History<MicroAppLocationState> | undefined>;
export declare const ShellHistoryProvider: React.FC<ShellHistoryProviderProps>;
export {};
