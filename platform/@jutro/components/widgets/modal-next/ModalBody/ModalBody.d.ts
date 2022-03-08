/**
 * ModalBody
 * @type {React.FC<PropTypes.InferProps<typeof modalBodyPropTypes>>}
 */
export const ModalBody: React.FC<PropTypes.InferProps<typeof modalBodyPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace modalBodyPropTypes {
    const id: PropTypes.Requireable<string>;
    const autoFocus: PropTypes.Requireable<boolean>;
    const contentLayout: PropTypes.Requireable<PropTypes.InferProps<{
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
    const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
}
export {};
