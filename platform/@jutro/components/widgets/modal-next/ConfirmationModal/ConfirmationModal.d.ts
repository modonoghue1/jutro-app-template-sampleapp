/**
 * ConfirmationModal
 * @type {React.FC<PropTypes.InferProps<typeof confirmationModalPropTypes>>}
 */
export const ConfirmationModal: React.FC<PropTypes.InferProps<typeof confirmationModalPropTypes>>;
export namespace confirmationResult {
    const CONFIRM: string;
    const CANCEL: string;
    const CLOSE: string;
}
import React from "react";
import PropTypes from "prop-types";
declare namespace confirmationModalPropTypes {
    export const isOpen: PropTypes.Requireable<boolean>;
    export const onResolve: PropTypes.Validator<(...args: any[]) => any>;
    export const parentSelector: PropTypes.Requireable<(...args: any[]) => any>;
    export const icon: PropTypes.Requireable<string>;
    export const title: PropTypes.Validator<import("@jutro/prop-types").IntlMessageShape>;
    export { intlMessageShape as message };
    export const status: PropTypes.Requireable<string>;
    export { intlMessageShape as confirmButtonText };
    export { intlMessageShape as cancelButtonText };
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
