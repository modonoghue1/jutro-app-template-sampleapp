export function ToggleButton({ id, disabled, option, styleClasses, active, activeKeypress, value, handleButtonClick, onFocus, }: {
    id: any;
    disabled: any;
    option: any;
    styleClasses: any;
    active: any;
    activeKeypress: any;
    value: any;
    handleButtonClick: any;
    onFocus: any;
}): JSX.Element;
export namespace ToggleButton {
    export { toggleButtonPropTypes as propTypes };
}
declare namespace toggleButtonPropTypes {
    export const id: PropTypes.Requireable<string>;
    export const disabled: PropTypes.Requireable<boolean>;
    export const theme: PropTypes.Requireable<object>;
    export const option: PropTypes.Requireable<object>;
    export const styleClasses: PropTypes.Requireable<string>;
    export const active: PropTypes.Requireable<string>;
    export const activeKeypress: PropTypes.Requireable<string>;
    export const uniqueId: PropTypes.Requireable<string>;
    export { defaultAvailableValuePropType as value };
    export const handleButtonClick: PropTypes.Requireable<(...args: any[]) => any>;
    export const onFocus: PropTypes.Requireable<(...args: any[]) => any>;
}
import PropTypes from "prop-types";
import { defaultAvailableValuePropType } from "@jutro/prop-types";
export {};
