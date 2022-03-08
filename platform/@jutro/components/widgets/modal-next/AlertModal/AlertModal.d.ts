/**
 * AlertModal
 * @type {React.FC<PropTypes.InferProps<typeof alertModalPropTypes>>}
 */
export const AlertModal: React.FC<PropTypes.InferProps<typeof alertModalPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace alertModalPropTypes {
    export const isOpen: PropTypes.Requireable<boolean>;
    export const onResolve: PropTypes.Validator<(...args: any[]) => any>;
    export const parentSelector: PropTypes.Requireable<(...args: any[]) => any>;
    export const icon: PropTypes.Requireable<string>;
    export const title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    export { intlMessageShape as message };
    export const status: PropTypes.Requireable<string>;
    export { intlMessageShape as confirmButtonText };
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
