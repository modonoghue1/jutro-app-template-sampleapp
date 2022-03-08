/// <reference types="react" />
export declare type BusinessCardTypes = {
    maxWidth: number;
    children: JSX.Element;
    title: string;
    id: string;
};
export declare const BusinessCard: {
    ({ maxWidth, children, title, id, }: BusinessCardTypes): JSX.Element;
    displayName: string;
    defaultProps: {
        maxWidth: number;
    };
};
