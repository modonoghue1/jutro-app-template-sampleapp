declare type DateFormat = 'vshort' | 'vshortWithTime' | 'short' | 'shortWithTime' | 'abbreviated' | 'abbreviatedWithTime' | 'long' | 'longWithTime' | 'full' | 'fullWithTime' | 'time';
declare type DateValues = Partial<Record<DateFormat, string>>;
declare type NumberFormat = 'general';
declare type NumberValues = Partial<Record<NumberFormat, string>>;
declare type CurrencyFormat = 'usd' | 'jpy' | 'aud';
declare type CurrencyValues = Partial<Record<CurrencyFormat, string>>;
declare type LocaleInputValues = {
    date: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
    };
    number: number;
    currency: number;
};
declare type LocaleOutputValues = {
    date: DateValues;
    number: NumberValues;
    currency: CurrencyValues;
};
declare type LocaleCategory = keyof LocaleOutputValues;
declare type LocalesData = Record<string, {
    [Category in LocaleCategory]: LocaleOutputValues[Category];
}>;
declare type FilteredLocalesData<Category extends LocaleCategory> = Record<string, LocaleOutputValues[Category]>;
declare type Options = {
    excludeValues?: string[];
};
export declare const getLocaleValues: <Category extends keyof LocaleOutputValues>(localesData: LocalesData, category: Category, options?: Options) => FilteredLocalesData<Category>;
/**
 * Returns locale data of given category for i18n tests for every supported locale
 * @param category one of "date", "number" or "currency"
 * @param options
 */
export declare const getLocaleTestData: <Category extends keyof LocaleOutputValues>(category: Category, options?: Options | undefined) => [LocaleInputValues[Category], FilteredLocalesData<Category>];
export {};
