/**
 * @typedef {object} AsyncLinkProps
 * @prop {string} [className] CSS class name for this component
 */
/**
 * @type {React.ComponentType<import('../AsyncAction/AsyncAction').AsyncActionProps & AsyncLinkProps>}
 */
export const AsyncLink: React.ComponentType<import('../AsyncAction/AsyncAction').AsyncActionProps & AsyncLinkProps>;
export type AsyncLinkProps = {
    /**
     * CSS class name for this component
     */
    className?: string | undefined;
};
import React from "react";
