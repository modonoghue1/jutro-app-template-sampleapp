export namespace questionsForAppConfig {
    export { projectNameQuestions };
    export { projectPathQuestions };
    export { oktaQuestions };
    export { routerQuestions };
    export { mixPanelQuestions };
    export { googleAnalyticsQuestions };
    export { dataDogQuestions };
}
declare function projectNameQuestions(presetValue: any): {
    type: string;
    name: string;
    message: string;
    validate: (value: any) => true | "Invalid project name (only alphanumeric and '-', '_', '@' characters allowed)";
    initial: string | (() => any);
}[];
declare function projectPathQuestions(defaultApplicationDirectory: any): {
    type: string;
    name: string;
    message: string;
    validate: (value: any) => true | "Invalid project name (only alphanumeric and '-', '_', '@', '.', '/', '\\' characters allowed)";
    initial: any;
}[];
declare const oktaQuestions: ({
    type: string;
    name: string;
    message: string;
    initial: string;
    validate?: undefined;
    format?: undefined;
} | {
    type: (prev: any, values: any) => "text" | null;
    name: string;
    message: string;
    initial: string;
    validate: (value: any) => boolean;
    format: (value: any) => any;
} | {
    type: (prev: any, values: any) => "text" | null;
    name: string;
    message: string;
    validate: (value: any) => boolean;
    initial: string;
    format?: undefined;
} | {
    type: (prev: any, values: any) => "text" | null;
    name: string;
    message: string;
    initial: string;
    validate?: undefined;
    format?: undefined;
})[];
declare const routerQuestions: {
    type: string;
    name: string;
    message: string;
    initial: string;
    validate: (value: any) => boolean;
}[];
declare const mixPanelQuestions: ({
    type: string;
    name: string;
    message: string;
    initial: string;
    validate?: undefined;
} | {
    type: (prev: any) => "text" | null;
    name: string;
    message: string;
    validate: (value: any) => boolean;
    initial: string;
})[];
declare const googleAnalyticsQuestions: ({
    type: string;
    name: string;
    message: string;
    initial: string;
    validate?: undefined;
} | {
    type: (prev: any) => "text" | null;
    name: string;
    message: string;
    validate: (value: any) => boolean;
    initial: string;
})[];
declare const dataDogQuestions: ({
    type: string;
    name: string;
    message: string;
    initial: string;
    validate?: undefined;
} | {
    type: (prev: any, values: any) => "text" | null;
    name: string;
    message: string;
    validate: (value: any) => boolean;
    initial: string;
})[];
export {};
