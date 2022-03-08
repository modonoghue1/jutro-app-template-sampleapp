/**
 * @template {object} A
 * @typedef {(...args: any[]) => A} ActionCreator
 */
/**
 * @template {object} A
 * @typedef {import('lodash').Dictionary<ActionCreator<A>>} ActionCreatorMap
 */
/**
 * @template {ActionCreatorMap<any>} M
 * @typedef {{ [K in keyof M]: (...args: Parameters<M[K]>) => void }} BoundActionCreatorMap
 */
/**
 * bindActionCreators
 * @template {ActionCreatorMap<any>} M
 * @param {React.DispatchWithoutAction} dispatch
 * @param {M} [actions]
 * @returns {object<M>}
 */
export function bindActionCreators<M extends import("lodash").Dictionary<ActionCreator<any>>>(dispatch: React.DispatchWithoutAction, actions?: M | undefined): object;
/**
 * useControlledReducer
 * @returns {useControlledReducer}
 */
export function useControlledReducer({ reducer, initialState, controlledState, onStateChange, updateInControlledMode, }: {
    reducer: any;
    initialState: any;
    controlledState: any;
    onStateChange: any;
    updateInControlledMode?: boolean | undefined;
}): typeof useControlledReducer;
export type ActionCreator<A extends unknown> = (...args: any[]) => A;
export type ActionCreatorMap<A extends unknown> = import('lodash').Dictionary<ActionCreator<A>>;
export type BoundActionCreatorMap<M extends import("lodash").Dictionary<ActionCreator<any>>> = { [K in keyof M]: (...args: Parameters<M[K]>) => void; };
import React from "react";
