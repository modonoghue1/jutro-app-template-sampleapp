export function Basic({ uiProps, ...rest }: {
    [x: string]: any;
    uiProps: any;
}): JSX.Element;
export namespace Basic {
    namespace args {
        const text: string;
        const title: string;
    }
}
declare namespace _default {
    const title_1: string;
    export { title_1 as title };
    export const id: string;
    export { Card as component };
    export namespace argTypes {
        namespace maxWidth {
            namespace control {
                const type: string;
                const min: number;
                const max: number;
                const step: number;
            }
        }
        namespace uiProps {
            export namespace control_1 {
                const type_1: string;
                export { type_1 as type };
            }
            export { control_1 as control };
            export { defaultMetadata as defaultValue };
        }
    }
}
export default _default;
import { Card } from "./Card";
declare namespace defaultMetadata {
    const id_1: string;
    export { id_1 as id };
    const type_2: string;
    export { type_2 as type };
    export const content: {
        id: string;
        type: string;
        component: string;
        componentProps: {
            title: string;
        };
        content: string;
    }[];
}
