export function promptComponentGeneration(providedQuestions: any, providedArguments: InitialArguments): Promise<ComponentArguments>;
export function promptConfirmation(warningMessage: string): Promise<void>;
export type InitialArguments = {
    name?: string | undefined;
    path?: string | undefined;
};
export type ComponentArguments = {
    name: string;
    path: string;
};
