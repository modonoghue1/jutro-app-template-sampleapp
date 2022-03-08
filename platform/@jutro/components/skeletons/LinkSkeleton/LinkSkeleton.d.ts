/**
 * LinkSkeleton
 * @type {React.FC<PropTypes.InferProps<typeof linkSkeletonPropTypes>>}
 */
export const LinkSkeleton: React.FC<PropTypes.InferProps<typeof linkSkeletonPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace linkSkeletonPropTypes {
    const width: PropTypes.Requireable<number>;
    const showNotification: PropTypes.Requireable<boolean>;
}
export {};
