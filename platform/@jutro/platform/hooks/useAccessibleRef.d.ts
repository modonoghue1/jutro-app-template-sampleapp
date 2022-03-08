/**
 * Helper hook to enable accessibility on DOM nodes. Includes handling native
 * focus and reacting to 'Enter' and 'Space' keyboard events in the same
 * way as to mouse clicks.
 * @template T
 * @param {boolean} [focused] - flag indicating if the element should be marked as document's active one
 * @returns {React.MutableRefObject<T>} React's ref that should be attached to the A11Y-enabled node
 */
export function useAccessibleRef<T>(focused?: boolean | undefined): React.MutableRefObject<T>;
import React from "react";
