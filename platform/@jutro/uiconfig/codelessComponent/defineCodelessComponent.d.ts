/**
 * Takes codeless component definition from the UI Metadata file and converts it into
 * the actual React component, which can be added to the components map and rendered
 *
 * @param {object} componentDefinition - json object serving as a template for the custom component
 * @param {object} [propTypesMap] - optional map containing more complex prop types definitions (e.g. custom shapes)
 *
 * @returns {React.FC<any>} - Metadata-aware react component, configured based on the given codeless component definition
 */
export function defineCodelessComponent(componentDefinition: object, propTypesMap?: object): React.FC<any>;
export const DATA_CONTAINER_PROP_TYPE: PropTypes.Requireable<string | boolean | object>;
import React from "react";
import PropTypes from "prop-types";
