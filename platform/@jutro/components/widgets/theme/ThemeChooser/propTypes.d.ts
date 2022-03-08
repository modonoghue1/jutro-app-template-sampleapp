/// <reference types="react" />
import PropTypes from 'prop-types';
import { ThemeConfigType } from '@jutro/prop-types';
import { DropdownSelectField } from '../../inputs/DropdownSelectField/DropdownSelectField';
export declare const omittedDropdownProps: readonly ["value", "defaultValue", "availableValues", "dataType", "autoTrim", "onValueChange", "model", "path", "validationMessages", "dataPath", "validator", "inputType"];
declare type OmittedDropdownPropsKeys = typeof omittedDropdownProps[number];
declare type InheritedDropdownPropTypes = Omit<PropTypes.InferProps<typeof DropdownSelectField.propTypes>, OmittedDropdownPropsKeys>;
declare type ThemeChooserOwnPropTypes = {
    availableThemes: ThemeConfigType[];
    onThemeChange?: (themeConfig: ThemeConfigType) => void;
    theme?: ThemeConfigType;
    defaultTheme?: ThemeConfigType;
    skipPropagation?: boolean;
};
export declare type ThemeChooserPropTypes = InheritedDropdownPropTypes & ThemeChooserOwnPropTypes;
export declare const themeChooserPropTypes: React.WeakValidationMap<ThemeChooserPropTypes>;
export declare const themeChooserDefaultProps: {
    availableThemes: never[];
    storybookMode: boolean;
    skipPropagation: boolean;
    label: string;
    id: string;
    availableValues?: never[] | undefined;
    placeholder?: {
        id: string;
        defaultMessage: string;
    } | undefined;
    dataType?: string | undefined;
    searchable?: boolean | undefined;
    autoTrim?: boolean | undefined;
    required?: boolean | undefined;
    schemaRequired?: boolean | undefined;
    readOnly?: boolean | undefined;
    disabled?: boolean | undefined;
    showErrors?: boolean | undefined;
    hideLabel?: boolean | undefined;
    showValidationIcon?: boolean | undefined;
    dataPath?: string | undefined;
    labelPosition?: string | undefined;
};
export declare const themeChooserStorybookPropNames: readonly ["id", "availableThemes", "onThemeChange", "className", "label", "theme", "skipPropagation"];
export declare type ThemeChooserStorybookPropsType = Pick<ThemeChooserPropTypes, typeof themeChooserStorybookPropNames[number]>;
export {};
