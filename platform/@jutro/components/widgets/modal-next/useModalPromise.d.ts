export function useModalPromise(): [boolean, ShowFunction, ResolveFunction, RejectFunction];
export type ShowFunction = () => Promise<any>;
export type ResolveFunction = (value?: any) => void;
export type RejectFunction = (reason?: any) => void;
