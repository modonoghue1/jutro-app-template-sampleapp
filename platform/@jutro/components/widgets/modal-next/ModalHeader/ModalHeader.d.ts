export namespace modalClassMap {
    namespace warning {
        const status: string;
        const icon: string;
    }
    namespace error {
        const status_1: string;
        export { status_1 as status };
        const icon_1: string;
        export { icon_1 as icon };
    }
    namespace info {
        const status_2: string;
        export { status_2 as status };
        const icon_2: string;
        export { icon_2 as icon };
    }
    namespace success {
        const status_3: string;
        export { status_3 as status };
        const icon_3: string;
        export { icon_3 as icon };
    }
}
/**
 * ModalHeader
 * @type {React.FC<PropTypes.InferProps<typeof modalHeaderPropTypes>>}
 */
export const ModalHeader: React.FC<PropTypes.InferProps<typeof modalHeaderPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace modalHeaderPropTypes {
    export const contentLayout: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Requireable<string>;
        repeat: PropTypes.Requireable<string | number>;
        gap: PropTypes.Requireable<string>;
        columns: PropTypes.Requireable<any[]>;
        colSpan: PropTypes.Requireable<string | number>;
        colStart: PropTypes.Requireable<string | number>;
    }> | PropTypes.InferProps<{
        component: PropTypes.Validator<string>;
        componentProps: PropTypes.Requireable<object>;
    }>>;
    export const titleLayout: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Requireable<string>;
        repeat: PropTypes.Requireable<string | number>;
        gap: PropTypes.Requireable<string>;
        columns: PropTypes.Requireable<any[]>;
        colSpan: PropTypes.Requireable<string | number>;
        colStart: PropTypes.Requireable<string | number>;
    }> | PropTypes.InferProps<{
        component: PropTypes.Validator<string>;
        componentProps: PropTypes.Requireable<object>;
    }>>;
    const status_4: PropTypes.Requireable<string>;
    export { status_4 as status };
    const icon_4: PropTypes.Requireable<string>;
    export { icon_4 as icon };
    export { intlMessageShape as title };
    export { intlMessageShape as subtitle };
    export const onClose: PropTypes.Requireable<(...args: any[]) => any>;
    export const titleId: PropTypes.Requireable<string>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
