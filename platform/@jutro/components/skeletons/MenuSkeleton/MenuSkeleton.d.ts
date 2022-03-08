/**
 * MenuSkeleton
 * @type {React.FC<PropTypes.InferProps<typeof menuSkeletonPropTypes>>}
 */
export const MenuSkeleton: React.FC<PropTypes.InferProps<typeof menuSkeletonPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace menuSkeletonPropTypes {
    const links: PropTypes.Requireable<(PropTypes.InferProps<{
        width: PropTypes.Requireable<number>;
        showNotification: PropTypes.Requireable<boolean>;
    }> | null | undefined)[]>;
}
export {};
