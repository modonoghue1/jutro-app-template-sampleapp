/**
 * DesignGrid
 * @type {React.FC<PropTypes.InferProps<typeof designGridPropTypes>>}
 */
export const DesignGrid: React.FC<PropTypes.InferProps<typeof designGridPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare const designGridPropTypes: {
    /**
     * Content of the page
     */
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Number of times to repeat columns
     */
    repeat: PropTypes.Requireable<number>;
    /**
     * Columns for the design grid
     */
    columns: PropTypes.Requireable<any[]>;
    rows: PropTypes.Requireable<(string | number)[]>;
    autoRows: PropTypes.Requireable<any[]>;
    gap: PropTypes.Requireable<string>;
    hgap: PropTypes.Requireable<string>;
    vgap: PropTypes.Requireable<string>;
    valignContent: PropTypes.Requireable<string>;
    justifyContent: PropTypes.Requireable<string>;
    valignItems: PropTypes.Requireable<string>;
    justifyItems: PropTypes.Requireable<string>;
    tag: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    className: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    phone: PropTypes.Requireable<object>;
    phoneWide: PropTypes.Requireable<object>;
    tablet: PropTypes.Requireable<object>;
    blockPointerEvents: PropTypes.Requireable<boolean>;
};
export {};
