/**
 * Component for filters rendering, supplied through metadata
 *
 * @type {React.FC<PropTypes.InferProps<typeof filterBarPropTypes>>}
 *
 * @metadataType container
 */
export const FilterBar: React.FC<PropTypes.InferProps<typeof filterBarPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace filterBarPropTypes {
    const uiProps: PropTypes.Requireable<object>;
    const classNameMap: PropTypes.Requireable<object>;
    const componentMap: PropTypes.Requireable<object>;
    const callbackMap: PropTypes.Requireable<object>;
    const onFiltersChange: PropTypes.Validator<(...args: any[]) => any>;
    const initialFilters: PropTypes.Requireable<object>;
    const searchKey: PropTypes.Requireable<string>;
}
export {};
