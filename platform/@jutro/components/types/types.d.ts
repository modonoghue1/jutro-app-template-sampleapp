export type intlMessageShape = {
    id: string;
    defaultMessage: string;
};
export type TranslatorFunction = (arg0: string | intlMessageShape) => string;
export type Intl = {
    formatNumber: (arg0: number) => string;
};
