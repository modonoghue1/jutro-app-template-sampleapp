export function HelpPopover({ id, title, footerLink, renderTrigger, ...popoverProps }: {
    [x: string]: any;
    id: any;
    title: any;
    footerLink: any;
    renderTrigger: any;
}): JSX.Element;
export namespace HelpPopover {
    export { helpPopoverPropTypes as propTypes };
    export const defaultProps: {
        title: {
            id: string;
            defaultMessage: string;
        };
        id?: string | undefined;
        renderTrigger?: ((...args: any[]) => any) | undefined;
        children?: string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray | null | undefined;
        className?: string | null | undefined;
        onClosed?: ((...args: any[]) => any) | null | undefined;
        align?: string | null | undefined;
        isFlipEnabled?: boolean | null | undefined;
    };
}
declare namespace helpPopoverPropTypes {
    export const id: PropTypes.Validator<string>;
    export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    export { intlMessageShape as title };
    export const footerLink: PropTypes.Requireable<import("@jutro/prop-types").IntlMessageShape | import("@jutro/prop-types").LinkPropTypes>;
    export const renderTrigger: PropTypes.Validator<(...args: any[]) => any>;
}
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
