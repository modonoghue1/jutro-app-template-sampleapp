export const WizardPage: React.MemoExoticComponent<typeof WizardPageInternal>;
/**
 * WizardPage is an Jutro component.
 *
 * Use this component to render a wizard page. This component (or a parent) should be used in a step definition
 * passed to a `<Wizard>` component.
 *
 * @returns {React.ReactElement} - WizardPage component
 * @example
 * <WizardPage
 *     onNext={handleNextPage}
 *     onPrev={handlePreviousPage}
 *     renderActionBar={false}
 * >
 */
declare function WizardPageInternal({ buttonProps, children, className, headerClass, id, onLoad, onNext, onPageEventInfo, onPrevious, pageEventInfo, renderHeader, renderPanel, renderSubTitle, renderTitle, resolveCallbackMap, subTitle, title, panelClassName, }: {
    buttonProps: any;
    children: any;
    className: any;
    headerClass: any;
    id: any;
    onLoad: any;
    onNext: any;
    onPageEventInfo: any;
    onPrevious: any;
    pageEventInfo: any;
    renderHeader: any;
    renderPanel: any;
    renderSubTitle: any;
    renderTitle: any;
    resolveCallbackMap: any;
    subTitle: any;
    title: any;
    panelClassName: any;
}): React.ReactElement;
declare namespace WizardPageInternal {
    namespace defaultProps {
        const actionBarLayout: string;
        const buttonProps: {};
    }
    namespace propTypes {
        export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export const className: PropTypes.Requireable<string>;
        export const headerClass: PropTypes.Requireable<string>;
        export const id: PropTypes.Validator<string>;
        export const knockoutPath: PropTypes.Requireable<string>;
        export const location: PropTypes.Validator<object>;
        export { wizardCallbackProptype as onLoad };
        export { wizardCallbackProptype as onNext };
        export { wizardCallbackProptype as onPrevious };
        export const pageEventInfo: PropTypes.Requireable<object>;
        export const onPageEventInfo: PropTypes.Requireable<(...args: any[]) => any>;
        export const renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        export const renderPanel: PropTypes.Requireable<(...args: any[]) => any>;
        export const resolveCallbackMap: PropTypes.Requireable<object>;
        export const subTitle: PropTypes.Requireable<import("@jutro/prop-types").IntlMessageShape | ((...args: any[]) => any)>;
        export const renderSubTitle: PropTypes.Requireable<(...args: any[]) => any>;
        export const title: PropTypes.Requireable<import("@jutro/prop-types").IntlMessageShape | ((...args: any[]) => any)>;
        export const renderTitle: PropTypes.Requireable<(...args: any[]) => any>;
        const buttonProps_1: PropTypes.Requireable<object>;
        export { buttonProps_1 as buttonProps };
        export const panelClassName: PropTypes.Requireable<string>;
    }
    const displayName: string;
}
import React from "react";
import PropTypes from "prop-types";
import { wizardCallbackProptype } from "../wizard/WizardProptypes";
export {};
