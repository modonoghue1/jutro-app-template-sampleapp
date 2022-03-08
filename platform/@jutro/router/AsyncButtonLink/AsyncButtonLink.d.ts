/**
 * @typedef {object} AsyncButtonLinkProps
 * @prop {Function} [onClick] The method to be called before (instead in case of event.preventDefault been called) built-in onClick handler
 * @prop {string} [className] CSS class name for this component
 * @prop {string|Function} [innerRef] Get ref to the inner rendered <a> or <button>
 */
/**
 * @type {React.ComponentType<import('../AsyncAction/AsyncAction').AsyncActionProps & AsyncButtonLinkProps & import('@jutro/components/widgets/button/Button').ButtonProps>}
 */
export const AsyncButtonLink: React.ComponentType<import('../AsyncAction/AsyncAction').AsyncActionProps & AsyncButtonLinkProps & any>;
export type AsyncButtonLinkProps = {
    /**
     * The method to be called before (instead in case of event.preventDefault been called) built-in onClick handler
     */
    onClick?: Function | undefined;
    /**
     * CSS class name for this component
     */
    className?: string | undefined;
    /**
     * Get ref to the inner rendered <a> or <button>
     */
    innerRef?: string | Function | undefined;
};
import React from "react";
