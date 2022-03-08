import React from 'react';
import { GlobalizationChooser } from '@jutro/components';
import { IntlMessageShape } from '@jutro/prop-types';
declare type GlobalizationChooserProps = React.ComponentProps<typeof GlobalizationChooser>;
declare const omittedGlobalizationChooserProps: readonly ["onLocaleValueChange", "onLanguageValueChange", "storybookMode", "style", "innerStyle"];
declare type BlackListProps = typeof omittedGlobalizationChooserProps[number];
declare const pickedValuesProps: readonly ["languageValue", "localeValue"];
declare type WhiteListValuesProps = typeof pickedValuesProps[number];
declare const pickedGlobalizationChooserProps: readonly ["languageValue", "localeValue", "availableLanguageValues", "availableLocaleValues"];
declare type WhiteListProps = typeof pickedGlobalizationChooserProps[number];
export declare type GlobalizationSettingsCardData = Pick<GlobalizationChooserProps, WhiteListValuesProps>;
export interface GlobalizationSettingsCardProps extends Omit<GlobalizationChooserProps, BlackListProps>, Pick<GlobalizationChooserProps, WhiteListProps> {
    id: string;
    title?: IntlMessageShape;
    onLocaleChange?: (locale: string) => void;
    onLanguageChange?: (locale: string) => void;
    onSave?: (data: GlobalizationSettingsCardData) => void;
    skipLocalStoragePersistence?: boolean;
}
/**
 * @metadataType container
 */
export declare const GlobalizationSettingsCard: React.FC<GlobalizationSettingsCardProps>;
export declare const globalizationSettingsProps: React.WeakValidationMap<GlobalizationSettingsCardProps>;
export {};
