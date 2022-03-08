/**
 * The `PageLoader` component renders an animated loading image that is shown when the `<html>` element is decorated
 * with the `app-loading` class.  Provides two static methods, `startPageLoading()` and `stopPageLoading()` that can
 * be used to activate the showing of the image as well as hiding any elements which are decorated with the
 * `hidden-when-loading` class.
 *
 * @type {React.FC<PropTypes.InferProps<typeof pageLoaderPropTypes>>}
 */
export const PageLoader: React.FC<PropTypes.InferProps<typeof pageLoaderPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace pageLoaderPropTypes {
    const className: PropTypes.Requireable<string>;
    const renderLoader: PropTypes.Requireable<(...args: any[]) => any>;
}
export {};
