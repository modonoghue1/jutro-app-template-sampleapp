/**
 * Helper to make the content use Live Region. Used to alert the users using assistive technologies about the dynamic content
 * that gets updated automatically.
 *
 * @type {React.FC<PropTypes.InferProps<typeof liveRegionPropTypes>>}
 */
export const LiveRegion: React.FC<PropTypes.InferProps<typeof liveRegionPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace liveRegionPropTypes {
    const liveType: PropTypes.Requireable<string>;
    const context: PropTypes.Requireable<string>;
    const contextClass: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
}
export {};
