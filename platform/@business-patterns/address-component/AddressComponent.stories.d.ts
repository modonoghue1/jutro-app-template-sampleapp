export function Basic(args: any): JSX.Element;
export namespace Basic {
    namespace args {
        export { defaultData as value };
    }
}
export function Argentina(args: any): JSX.Element;
export namespace Argentina {
    export namespace args_1 {
        export { argentinaData as value };
        export const showCountrySelection: string;
    }
    export { args_1 as args };
}
export function Malta(args: any): JSX.Element;
export namespace Malta {
    export namespace args_2 {
        export { maltaData as value };
        const showCountrySelection_1: string;
        export { showCountrySelection_1 as showCountrySelection };
    }
    export { args_2 as args };
}
export function Japan(args: any): JSX.Element;
export namespace Japan {
    export namespace args_3 {
        export { japanData as value };
    }
    export { args_3 as args };
}
export function Hungary(args: any): JSX.Element;
export namespace Hungary {
    export namespace args_4 {
        export { hungaryData as value };
    }
    export { args_4 as args };
}
export function India(args: any): JSX.Element;
export namespace India {
    export namespace args_5 {
        export { indiaData as value };
    }
    export { args_5 as args };
}
export function HongKong(args: any): JSX.Element;
export namespace HongKong {
    export namespace args_6 {
        export { hongKongData as value };
    }
    export { args_6 as args };
}
export function Indonesia(args: any): JSX.Element;
export namespace Indonesia {
    export namespace args_7 {
        export { indonesiaData as value };
    }
    export { args_7 as args };
}
export function CustomCountry(args: any): JSX.Element;
export namespace CustomCountry {
    export namespace args_8 {
        export { customCountryData as value };
    }
    export { args_8 as args };
}
export function UnknownCountry(args: any): JSX.Element;
export namespace UnknownCountry {
    export namespace args_9 {
        export { unknownCountry as value };
    }
    export { args_9 as args };
}
export function UnknownCountryWithoutCustomFields(args: any): JSX.Element;
export namespace UnknownCountryWithoutCustomFields {
    export namespace args_10 {
        export { unknownCountryWithoutCustomFields as value };
    }
    export { args_10 as args };
}
export function ReadOnlyOneLine(args: any): JSX.Element;
export namespace ReadOnlyOneLine {
    export namespace args_11 {
        const readOnly: boolean;
        const readOnlyFormat: string;
    }
    export { args_11 as args };
}
export function ReadOnlyEnvelopeBigToSmall(args: any): JSX.Element;
export namespace ReadOnlyEnvelopeBigToSmall {
    export namespace args_12 {
        const readOnly_1: boolean;
        export { readOnly_1 as readOnly };
        const readOnlyFormat_1: string;
        export { readOnlyFormat_1 as readOnlyFormat };
    }
    export { args_12 as args };
}
export function ReadOnlyEnvelopeSmallToBig(args: any): JSX.Element;
export namespace ReadOnlyEnvelopeSmallToBig {
    export namespace args_13 {
        const readOnly_2: boolean;
        export { readOnly_2 as readOnly };
        const readOnlyFormat_2: string;
        export { readOnlyFormat_2 as readOnlyFormat };
    }
    export { args_13 as args };
}
declare namespace _default {
    export const title: string;
    export const id: string;
    export { AddressComponent as component };
    export namespace argTypes {
        namespace value {
            export namespace control {
                const type: string;
            }
            export { defaultData as defaultValue };
        }
        namespace onValueChange {
            const action: string;
        }
        namespace countriesData {
            export namespace control_1 {
                const type_1: string;
                export { type_1 as type };
            }
            export { control_1 as control };
            export const defaultValue: {};
        }
    }
    export namespace parameters {
        const status: string;
        namespace jsx {
            const filterProps: string[];
        }
    }
    export const decorators: any[];
}
export default _default;
declare namespace defaultData {
    const addressLine1: string;
    const city: string;
    const country: string;
    const postalCode: string;
    namespace state {
        const code: string;
        const name: string;
    }
}
declare namespace argentinaData {
    const addressLine1_1: string;
    export { addressLine1_1 as addressLine1 };
    const city_1: string;
    export { city_1 as city };
    const country_1: string;
    export { country_1 as country };
    const postalCode_1: string;
    export { postalCode_1 as postalCode };
}
declare namespace maltaData {
    const addressLine1_2: string;
    export { addressLine1_2 as addressLine1 };
    const city_2: string;
    export { city_2 as city };
    const country_2: string;
    export { country_2 as country };
}
declare namespace japanData {
    const addressLine1_3: string;
    export { addressLine1_3 as addressLine1 };
    export const addressLine2: string;
    const city_3: string;
    export { city_3 as city };
    export const prefecture: string;
    const postalCode_2: string;
    export { postalCode_2 as postalCode };
    const country_3: string;
    export { country_3 as country };
}
declare namespace hungaryData {
    const addressLine1_4: string;
    export { addressLine1_4 as addressLine1 };
    const city_4: string;
    export { city_4 as city };
    const postalCode_3: string;
    export { postalCode_3 as postalCode };
    const country_4: string;
    export { country_4 as country };
}
declare namespace indiaData {
    const addressLine1_5: string;
    export { addressLine1_5 as addressLine1 };
    export const addressline2: string;
    export const addressLine3: string;
    const city_5: string;
    export { city_5 as city };
    const state_1: string;
    export { state_1 as state };
    const postalCode_4: string;
    export { postalCode_4 as postalCode };
    const country_5: string;
    export { country_5 as country };
}
declare namespace hongKongData {
    const addressLine1_6: string;
    export { addressLine1_6 as addressLine1 };
    const addressLine2_1: string;
    export { addressLine2_1 as addressLine2 };
    const city_6: string;
    export { city_6 as city };
    export const area: string;
    const country_6: string;
    export { country_6 as country };
}
declare namespace indonesiaData {
    const addressLine1_7: string;
    export { addressLine1_7 as addressLine1 };
    const addressLine2_2: string;
    export { addressLine2_2 as addressLine2 };
    const addressLine3_1: string;
    export { addressLine3_1 as addressLine3 };
    const city_7: string;
    export { city_7 as city };
    export const province: string;
    const postalCode_5: string;
    export { postalCode_5 as postalCode };
    const country_7: string;
    export { country_7 as country };
}
declare namespace customCountryData {
    const addressLine1_8: string;
    export { addressLine1_8 as addressLine1 };
    const postalCode_6: string;
    export { postalCode_6 as postalCode };
    const city_8: string;
    export { city_8 as city };
    const country_8: string;
    export { country_8 as country };
}
declare namespace unknownCountry {
    const addressLine1_9: string;
    export { addressLine1_9 as addressLine1 };
    const addressLine2_3: string;
    export { addressLine2_3 as addressLine2 };
    const addressLine3_2: string;
    export { addressLine3_2 as addressLine3 };
    const city_9: string;
    export { city_9 as city };
    const country_9: string;
    export { country_9 as country };
    const postalCode_7: string;
    export { postalCode_7 as postalCode };
    export namespace county {
        const code_1: string;
        export { code_1 as code };
        const name_1: string;
        export { name_1 as name };
    }
    export const someOtherNotMappedField: string;
}
declare namespace unknownCountryWithoutCustomFields {
    const addressLine1_10: string;
    export { addressLine1_10 as addressLine1 };
    const city_10: string;
    export { city_10 as city };
    const country_10: string;
    export { country_10 as country };
    const postalCode_8: string;
    export { postalCode_8 as postalCode };
}
import { AddressComponent } from "./AddressComponent";
