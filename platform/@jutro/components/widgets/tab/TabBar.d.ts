export function getTabHeadingId(id: any): Record<string, any>;
/**
 * TabBar
 * @type {React.FC<PropTypes.InferProps<typeof tabBarPropTypes>>}
 */
export const TabBar: React.FC<PropTypes.InferProps<typeof tabBarPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace tabBarPropTypes {
    const onHeadingClick: PropTypes.Requireable<(...args: any[]) => any>;
    const tabs: PropTypes.Validator<(PropTypes.InferProps<{
        id: PropTypes.Requireable<string>;
        heading: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        disabled: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        active: PropTypes.Requireable<boolean>;
    }> | null | undefined)[]>;
    const className: PropTypes.Requireable<string>;
    const ariaControls: PropTypes.Requireable<string>;
    const label: PropTypes.Requireable<string>;
}
export {};
