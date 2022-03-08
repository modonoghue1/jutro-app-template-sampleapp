/**
 * TabbedContainer
 * @type {React.FC<PropTypes.InferProps<typeof tabbedContainerPropTypes>>}
 */
export const TabbedContainer: React.FC<PropTypes.InferProps<typeof tabbedContainerPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace tabbedContainerPropTypes {
    const id: PropTypes.Validator<string>;
    const className: PropTypes.Requireable<string>;
    const tabs: PropTypes.Validator<(PropTypes.InferProps<{
        id?: React.Validator<string> | undefined;
        disabled?: React.Validator<boolean | null | undefined> | undefined;
        visible?: React.Validator<boolean | null | undefined> | undefined;
        className?: React.Validator<string | null | undefined> | undefined;
        heading?: React.Validator<string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | import("@jutro/prop-types").IntlMessageObject | null | undefined> | undefined;
        children?: React.Validator<React.ReactNode> | undefined;
    }> | null | undefined)[]>;
    const defaultActiveTabId: PropTypes.Validator<string>;
}
export {};
