import React from 'react';
declare type AppContextShape = {
    appName?: string;
    appMode?: string;
};
export declare const AppContext: React.Context<AppContextShape>;
export declare const AppContextProvider: React.FC<AppContextShape>;
export {};
