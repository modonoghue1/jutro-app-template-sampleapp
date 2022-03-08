/**
 * Helper hook used to know when a key is active
 * @template T
 * @param {React.MutableRefObject<T>} ref ref to the node, which should serve as a scope for the event
 * @param {Array<string>} targetKeys
 */
export function useKeyActive<T>(ref: React.MutableRefObject<T>, targetKeys?: Array<string>): boolean;
import React from "react";
