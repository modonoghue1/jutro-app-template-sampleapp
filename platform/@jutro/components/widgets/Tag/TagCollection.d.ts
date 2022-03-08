/**
 * TagCollection
 * @type {React.FC<TagCollectionProps>}
 */
export const TagCollection: React.FC<TagCollectionProps>;
export type TagCollectionProps = {
    /**
     * Render expanded collection on initial component load
     */
    expanded?: boolean | undefined;
    /**
     * Default state for number of visible tags, additional items will be represented as single tag (like `+12`) at the begining
     */
    groupThreshold?: number | undefined;
    /**
     * Custom class name for tag collection
     */
    className?: string | undefined;
};
import React from "react";
