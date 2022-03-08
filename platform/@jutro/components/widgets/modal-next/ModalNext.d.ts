/**
 * ModalNext
 * @type {React.FC<PropTypes.InferProps<typeof modalNextPropTypes>>}
 */
export const ModalNext: React.FC<PropTypes.InferProps<typeof modalNextPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace modalNextPropTypes {
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
    export const isOpen: PropTypes.Requireable<boolean>;
    export const onAfterOpen: PropTypes.Requireable<(...args: any[]) => any>;
    export const onAfterClose: PropTypes.Requireable<(...args: any[]) => any>;
    export const onRequestClose: PropTypes.Requireable<(...args: any[]) => any>;
    export const closeTimeoutMS: PropTypes.Requireable<number>;
    export { intlMessageShape as contentLabel };
    export const overlayClassName: PropTypes.Requireable<string>;
    export const className: PropTypes.Requireable<string>;
    export const shouldFocusAfterRender: PropTypes.Requireable<boolean>;
    export const shouldCloseOnOverlayClick: PropTypes.Requireable<boolean>;
    export const shouldCloseOnEsc: PropTypes.Requireable<boolean>;
    export const shouldReturnFocusAfterClose: PropTypes.Requireable<boolean>;
    export const parentSelector: PropTypes.Requireable<(...args: any[]) => any>;
    export const ariaLabelledby: PropTypes.Requireable<string>;
    export const ariaDescribedby: PropTypes.Requireable<string>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
