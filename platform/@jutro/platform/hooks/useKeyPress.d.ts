/**
 * @typedef {Function} KeyPressHandler
 * @param {React.KeyboardEvent} event
 * @param {boolean} isKeyPressed
 */
/**
 * Helper hook to enable easier keyboard events handling
 * @template T
 * @param {React.MutableRefObject<T>} ref ref to the node, which should serve as a scope for the event
 * @param {Array<string>} targetKeys names of the keys, pressing of which should be tracked
 * @param {KeyPressHandler} callback callback to handle keydown/keyup events
 */
export function useKeyPress<T>(ref: React.MutableRefObject<T>, targetKeys: Array<string>, callback: KeyPressHandler): void;
export type KeyPressHandler = Function;
import React from "react";
