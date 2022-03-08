import { IntlMessageShape } from '@jutro/prop-types';
import React from 'react';
import { UploadState } from './useFileUpload';
declare type UploadingProgressProps = {
    id: string;
    filename: IntlMessageShape;
    messageProps: Record<string, IntlMessageShape>;
    errorMessage: IntlMessageShape;
    onActionClick: () => void;
    onActionKeyDown: () => void;
    state: UploadState;
    completed: number;
    total: number;
};
export declare const UploadingProgress: React.FC<UploadingProgressProps>;
export {};
