import { IntlMessageShape } from '@jutro/prop-types';
declare type UseFileUploadParams = {
    onCancel: () => void;
    onValueClear: () => void;
};
declare type UseFileUploadResult = {
    file?: File;
    progress: (completed: number) => void;
    cancel: () => void;
    error: (message: IntlMessageShape) => void;
    props: FileUploadFieldProps;
};
declare type FileUploadFieldProps = {
    onUpload: (file: File) => void;
    onCancel: () => void;
    onValueClear: () => void;
    total: number;
    completed: number;
    uploadState: UploadState;
    progressErrorMessage?: IntlMessageShape;
};
export declare const uploadStates: readonly ["selection", "progress", "completed", "cancelled", "failed"];
export declare type UploadState = typeof uploadStates[number];
export declare const useFileUpload: ({ onCancel, onValueClear, }: UseFileUploadParams) => UseFileUploadResult;
export {};
