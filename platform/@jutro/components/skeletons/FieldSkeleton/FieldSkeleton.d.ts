/**
 * FieldSkeleton
 * @type {React.FC<PropTypes.InferProps<typeof fieldSkeletonPropTypes>>}
 */
export const FieldSkeleton: React.FC<PropTypes.InferProps<typeof fieldSkeletonPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace fieldSkeletonPropTypes {
    const fieldType: PropTypes.Requireable<string>;
}
export {};
