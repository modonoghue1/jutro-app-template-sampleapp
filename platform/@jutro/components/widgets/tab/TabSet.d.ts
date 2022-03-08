export function TabSet({ id, label, children, showFrame, className, onTabChange, defaultActiveTab, activeTab: propsActiveTab, }: {
    id: any;
    label: any;
    children: any;
    showFrame?: boolean | undefined;
    className: any;
    onTabChange: any;
    defaultActiveTab: any;
    activeTab: any;
}): JSX.Element;
export namespace TabSet {
    export { TabSetPropTypes as propTypes };
}
/**
 * Renders a container for a set of `Tab` components.  Extracts the `heading`
 * prop from each of its `Tab` children and uses them to render the tab navigation bar.
 */
export type TabSetPropTypes = typeof TabSet.propTypes;
declare namespace TabSetPropTypes {
    const id: PropTypes.Validator<string>;
    const activeTab: PropTypes.Requireable<string>;
    const onTabChange: PropTypes.Requireable<(...args: any[]) => any>;
    const className: PropTypes.Requireable<string>;
    const children: PropTypes.Requireable<React.ReactElement<Record<string, unknown>, React.ComponentType<Record<string, unknown>>> | React.ReactElement<Record<string, unknown>, React.ComponentType<Record<string, unknown>>>[]>;
    const showFrame: PropTypes.Requireable<boolean>;
    const defaultActiveTab: PropTypes.Requireable<string>;
    const label: PropTypes.Requireable<string>;
}
import PropTypes from "prop-types";
import React from "react";
export {};
