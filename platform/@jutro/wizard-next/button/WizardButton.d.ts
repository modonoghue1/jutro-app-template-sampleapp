export function WizardButton({ children, className, failTo, href, message, to, trigger, name, ...others }: {
    [x: string]: any;
    children: any;
    className: any;
    failTo: any;
    href: any;
    message: any;
    to: any;
    trigger: any;
    name: any;
}): JSX.Element;
export namespace WizardButton {
    namespace propTypes {
        export const name: PropTypes.Validator<string>;
        export const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        export const to: PropTypes.Requireable<string>;
        export const href: PropTypes.Requireable<string>;
        export const className: PropTypes.Requireable<string>;
        export const trigger: PropTypes.Requireable<(...args: any[]) => any>;
        export const failTo: PropTypes.Requireable<string>;
        export { intlMessageShape as message };
    }
}
import PropTypes from "prop-types";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
