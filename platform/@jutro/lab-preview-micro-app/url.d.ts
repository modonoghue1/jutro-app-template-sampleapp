import { FileLoadingType } from './types';
export declare const appendPath: (url: URL, path: string) => string;
export declare const prependAbsoluteUrls: (allFileContents: Array<FileLoadingType>, allFilePaths: Array<string>, remoteUrl: URL) => Array<FileLoadingType>;
