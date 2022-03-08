/**
 * FormSkeleton
 * @type {React.FC<PropTypes.InferProps<typeof formSkeletonPropTypes>>}
 */
export const FormSkeleton: React.FC<PropTypes.InferProps<typeof formSkeletonPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace formSkeletonPropTypes {
    const fieldTypes: PropTypes.Requireable<(string | null | undefined)[]>;
}
export {};
