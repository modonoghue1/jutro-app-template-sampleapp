import React from 'react';
import { ThemeChooser } from '@jutro/components';
import { ThemeConfigType, IntlMessageShape } from '@jutro/prop-types';
declare type ThemeChooserProps = React.ComponentProps<typeof ThemeChooser>;
declare const omittedThemeChooserProps: readonly ["storybookComponent", "skipPropagation", "availableThemes"];
declare type BlackListProps = typeof omittedThemeChooserProps[number];
export interface ThemeSettingsCardProps extends Omit<ThemeChooserProps, BlackListProps> {
    id: string;
    title?: IntlMessageShape;
    onSave?: (theme: ThemeConfigType) => void;
    availableThemes?: ThemeConfigType[];
}
/**
 * @metadataType container
 */
export declare const ThemeSettingsCard: React.FC<ThemeSettingsCardProps>;
export declare const themeSettingsCardPropTypes: React.WeakValidationMap<ThemeSettingsCardProps>;
export {};
