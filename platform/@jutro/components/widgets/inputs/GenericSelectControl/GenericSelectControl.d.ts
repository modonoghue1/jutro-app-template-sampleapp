export { defaultComponents as GenericSelectComponents };
export const genericSelectInternalClassNamesShape: PropTypes.Requireable<PropTypes.InferProps<{
    /**
     * CSS class name for control
     */
    control: PropTypes.Requireable<string>;
    /**
     * CSS class name for focused control
     */
    controlFocused: PropTypes.Requireable<string>;
    /**
     * CSS class name for list of options
     */
    menuList: PropTypes.Requireable<string>;
    /**
     * CSS class name for option
     */
    option: PropTypes.Requireable<string>;
    /**
     * CSS class name for select icon
     */
    selectIcon: PropTypes.Requireable<string>;
}>>;
/**
 * Generic component for dropdowns.
 * You can make your custom dropdown component inherit from the generic field component.
 * That way, your component will have default FieldComponent props, such as ’required' and methods (e.g. validation)`.
 * @type {React.FC<PropTypes.InferProps<typeof genericSelectControlPropTypes>>}
 */
export const GenericSelectControl: React.FC<PropTypes.InferProps<typeof genericSelectControlPropTypes>>;
declare namespace defaultComponents {
    export { ClearIndicator };
    export { Control };
    export { DropdownIndicator };
    export { Input };
    export { LoadingIndicator };
    export { Menu };
    export { MenuList };
    export { MultiValue };
    export { Option };
    export { Placeholder };
    export { SingleValue };
    export { ValueContainer };
}
import PropTypes from "prop-types";
import React from "react";
declare namespace genericSelectControlPropTypes {
    export const availableValues: PropTypes.Requireable<any[]>;
    export const className: PropTypes.Requireable<string>;
    export const components: PropTypes.Requireable<PropTypes.InferProps<{
        ClearIndicator: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        Control: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        DropdownIndicator: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        IndicatorSeparator: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        Input: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        LoadingIndicator: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        Menu: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        MenuList: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        Option: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        Placeholder: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        Value: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        ValueContainer: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    }>>;
    export { genericSelectInternalClassNamesShape as internalClassNames };
    export { intlMessageShape as createNewMessage };
    export const defaultValue: PropTypes.Requireable<any>;
    export const disabled: PropTypes.Requireable<boolean>;
    export const filter: PropTypes.Requireable<(...args: any[]) => any>;
    export const getOptionLabel: PropTypes.Requireable<(...args: any[]) => any>;
    export const getOptionValue: PropTypes.Requireable<(...args: any[]) => any>;
    export const id: PropTypes.Requireable<string>;
    export const isClearable: PropTypes.Requireable<boolean>;
    export const allowNewValue: PropTypes.Requireable<(...args: any[]) => any>;
    export const labelId: PropTypes.Requireable<string>;
    export const loadValues: PropTypes.Requireable<(...args: any[]) => any>;
    export { intlMessageShape as noOptionsMessage };
    export const onBlur: PropTypes.Requireable<(...args: any[]) => any>;
    export const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    export const onCreateOption: PropTypes.Requireable<(...args: any[]) => any>;
    export const onFocus: PropTypes.Requireable<(...args: any[]) => any>;
    export const onInputChange: PropTypes.Requireable<(...args: any[]) => any>;
    export const onMenuClose: PropTypes.Requireable<(...args: any[]) => any>;
    export const onMenuOpen: PropTypes.Requireable<(...args: any[]) => any>;
    export const onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
    export const onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    export { intlMessageShape as placeholder };
    export const readOnly: PropTypes.Requireable<boolean>;
    export const readOnlySeparator: PropTypes.Requireable<string>;
    export const required: PropTypes.Requireable<boolean>;
    export const searchable: PropTypes.Requireable<boolean>;
    export const multiSelect: PropTypes.Requireable<boolean>;
    export const stickyIndicator: PropTypes.Requireable<boolean>;
    export const valid: PropTypes.Requireable<boolean>;
    export const value: PropTypes.Requireable<any>;
    export const usePortal: PropTypes.Requireable<boolean>;
    export const isInitiallyOpen: PropTypes.Requireable<boolean>;
    export const controlShouldRenderValue: PropTypes.Requireable<boolean>;
    export const backspaceRemovesValue: PropTypes.Requireable<boolean>;
    export const fieldUniqueId: PropTypes.Requireable<string>;
    export const testId: PropTypes.Requireable<string>;
}
import { GenericSelectControlClearIndicator as ClearIndicator } from "./components/GenericSelectControlClearIndicator";
import { GenericSelectControlControl as Control } from "./components/GenericSelectControlControl";
import { GenericSelectControlDropdownIndicator as DropdownIndicator } from "./components/GenericSelectControlDropdownIndicator";
import { GenericSelectControlInput as Input } from "./components/GenericSelectControlInput";
import { GenericSelectControlLoadingIndicator as LoadingIndicator } from "./components/GenericSelectControlLoadingIndicator";
import { GenericSelectControlMenu as Menu } from "./components/GenericSelectControlMenu";
import { GenericSelectControlMenuList as MenuList } from "./components/GenericSelectControlMenuList";
import { GenericSelectControlMultiValue as MultiValue } from "./components/GenericSelectControlMultiValue";
import { GenericSelectControlOption as Option } from "./components/GenericSelectControlOption";
import { GenericSelectControlPlaceholder as Placeholder } from "./components/GenericSelectControlPlaceholder";
import { GenericSelectControlSingleValue as SingleValue } from "./components/GenericSelectControlSingleValue";
import { GenericSelectControlValueContainer as ValueContainer } from "./components/GenericSelectControlValueContainer";
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
