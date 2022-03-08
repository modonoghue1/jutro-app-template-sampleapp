import React from 'react';
import PropTypes from 'prop-types';
declare const appFloorPlanLayoutPropTypes: {
    /**
     * The content of the right side panel
     */
    rightSide: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Additional class names for component.
     */
    className: PropTypes.Requireable<string>;
    /**
     * The content of the footer
     */
    footer: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * The content of the header
     */
    header: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * The content of the subheader
     */
    subHeader: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * The content of the navigation
     */
    leftSide: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Make content scrollable
     */
    scrollContent: PropTypes.Requireable<boolean>;
};
export declare type AppFloorPlanLayoutProps = PropTypes.InferProps<typeof appFloorPlanLayoutPropTypes>;
declare const AppFloorPlanLayout: React.FC<AppFloorPlanLayoutProps>;
export default AppFloorPlanLayout;
