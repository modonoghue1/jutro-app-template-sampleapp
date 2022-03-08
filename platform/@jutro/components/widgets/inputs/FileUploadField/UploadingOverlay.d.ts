import { IntlMessageObject } from '@jutro/prop-types';
import React from 'react';
declare type UploadingOverlayProps = {
    renderProgress: () => React.ReactElement;
    children: (props: Record<string, React.ReactNode>) => React.ReactElement;
    messageProps: Record<string, IntlMessageObject>;
};
export declare const UploadingOverlay: React.FC<UploadingOverlayProps>;
export {};
