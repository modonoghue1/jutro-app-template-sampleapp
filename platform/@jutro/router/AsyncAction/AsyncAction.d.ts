export namespace propTypes {
    export { intlToShape as failTo };
    export const failToMessage: PropTypes.Requireable<string>;
    export { intlMessageShape as message };
    export const replace: PropTypes.Requireable<boolean>;
    export { intlToShape as to };
    export const toMessage: PropTypes.Requireable<string>;
    export const onTrigger: PropTypes.Validator<(...args: any[]) => any>;
    export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    export const allowNoLeadingSlash: PropTypes.Requireable<boolean>;
}
export function withAsyncAction(WrappedComponent: any): React.ComponentClass<Pick<import("react-router").RouteComponentProps<any, import("react-router").StaticContext, unknown>, never>, any> & import("react-router").WithRouterStatics<React.ComponentType<import("react-router").RouteComponentProps<any, import("react-router").StaticContext, unknown>>>;
export type AsyncActionProps = {
    /**
     * The destination path when promise is rejected; can be an object like <Link to>
     */
    failTo?: IntlToShape | undefined;
    /**
     * The message shown when promise is rejected; shown if 'failTo' is not provided
     */
    failToMessage?: string | undefined;
    /**
     * The message shown when executing trigger/promise
     */
    message?: any;
    /**
     * The replace prop will replace the current entry in the history stack
     */
    replace?: boolean | undefined;
    /**
     * The destination path when promise is resolved; can be an object like <Link to>
     */
    to?: IntlToShape | undefined;
    /**
     * The message shown when promise is resolved; shown if 'to' is not provided
     */
    toMessage?: string | undefined;
    /**
     * The method used to trigger the promise
     */
    onTrigger: Function;
    /**
     * The method to be called before (instead in case of event.preventDefault been called) built-in onClick handler
     */
    onClick?: Function | undefined;
};
import { intlToShape } from "@jutro/prop-types/src/toShape";
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import React from "react";
import { IntlToShape } from "@jutro/prop-types/src/toShape";
