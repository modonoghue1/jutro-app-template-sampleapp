declare namespace _default {
    export const title: string;
    export const id: string;
    export { Section as component };
}
export default _default;
export function Basic({ uiProps, ...rest }: {
    [x: string]: any;
    uiProps: any;
}): JSX.Element;
export namespace Basic {
    namespace args {
        export const children: string;
        const title_1: string;
        export { title_1 as title };
    }
    namespace argTypes {
        namespace uiProps {
            export namespace control {
                const type: string;
            }
            export { defaultMetadata as defaultValue };
        }
    }
}
export function SectionsStack(): JSX.Element;
export namespace SectionsStack {
    const storyName: string;
}
import { Section } from "./Section";
declare namespace defaultMetadata {
    const id_1: string;
    export { id_1 as id };
    const type_1: string;
    export { type_1 as type };
    export const content: {
        id: string;
        type: string;
        component: string;
        content: string;
    }[];
}
