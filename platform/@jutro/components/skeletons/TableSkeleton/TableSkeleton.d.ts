/**
 * TableSkeleton
 * @type {React.FC<PropTypes.InferProps<typeof tableSkeletonPropTypes>>}
 */
export const TableSkeleton: React.FC<PropTypes.InferProps<typeof tableSkeletonPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace tableSkeletonPropTypes {
    const columns: PropTypes.Requireable<string | number>;
    const rows: PropTypes.Requireable<number>;
}
export {};
