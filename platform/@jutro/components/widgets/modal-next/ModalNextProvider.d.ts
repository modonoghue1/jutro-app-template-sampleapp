declare const ModalNextEmitter_base: import("eventemitter3").EventEmitterStatic;
/** @type {ModalFunctions} */
export class ModalNextEmitter extends ModalNextEmitter_base {
    constructor();
}
/** @typedef {string | import('../../types/types').intlMessageShape} IntlMessageShape */
/** @callback ShowAlert
 * @param {{
 * status?: string,
 * icon?: string,
 * title?: IntlMessageShape,
 * message: IntlMessageShape,
 * confirmButtonText?: IntlMessageShape
 * }} props
 * @returns Promise
 */
/** @callback ShowConfirm
 * @param {{
 * status?: string,
 * icon?: string,
 * title?: string | IntlMessageShape,
 * message: string | IntlMessageShape,
 * confirmButtonText?: string | IntlMessageShape,
 * cancelButtonText?: string | IntlMessageShape
 * }} props
 * @returns Promise
 */
/** @callback ShowModal
 * @param {React.ReactElement} component
 * @returns Promise
 */
/** @typedef {{ showAlert: ShowAlert, showConfirm: ShowConfirm, showModal: ShowModal }} ModalFunctions */
/**
 * @type {React.Context<ModalFunctions>}
 */
export const ModalNextContext: React.Context<ModalFunctions>;
export function withModalContext(Component: any): React.ComponentType<{}>;
/** @typedef {{ emitter?: ModalNextEmitter, appElementId?: string }} ModalNextProviderProps */
/** @type {React.FC<ModalNextProviderProps> & ModalFunctions} */
export const ModalNextProvider: React.FC<ModalNextProviderProps> & ModalFunctions;
export type IntlMessageShape = string | import('../../types/types').intlMessageShape;
export type ShowAlert = (props: {
    status?: string;
    icon?: string;
    title?: IntlMessageShape;
    message: IntlMessageShape;
    confirmButtonText?: IntlMessageShape;
}) => any;
export type ShowConfirm = (props: {
    status?: string;
    icon?: string;
    title?: string | IntlMessageShape;
    message: string | IntlMessageShape;
    confirmButtonText?: string | IntlMessageShape;
    cancelButtonText?: string | IntlMessageShape;
}) => any;
export type ShowModal = (component: React.ReactElement) => any;
export type ModalFunctions = {
    showAlert: ShowAlert;
    showConfirm: ShowConfirm;
    showModal: ShowModal;
};
export type ModalNextProviderProps = {
    emitter?: ModalNextEmitter;
    appElementId?: string;
};
import React from "react";
export {};
