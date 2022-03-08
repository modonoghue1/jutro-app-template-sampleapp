/**
 * SubApplicationHeader is subheader for the default header for all Guidewire applications.
 * It contains navigation.
 *
 * @type {React.FC<PropTypes.InferProps<typeof subApplicationHeaderPropTypes>>}
 * @metadataType container
 * @param props
 */
export const SubApplicationHeader: React.FC<PropTypes.InferProps<typeof subApplicationHeaderPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace subApplicationHeaderPropTypes {
    export const className: PropTypes.Requireable<string>;
    export { routesShape as navigationRoutes };
    export { contextSwitcherShape as contextSwitcher };
}
import { routesShape } from "@jutro/prop-types";
import { contextSwitcherShape } from "@jutro/prop-types";
export {};
