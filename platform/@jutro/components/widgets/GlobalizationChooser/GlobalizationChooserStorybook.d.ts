/**
 * GlobalizationChooserStorybook
 * @type {React.FC<PropTypes.InferProps<typeof globalizationChooserStorybookPropTypes>>}
 *
 * @metadataType element
 */
export const GlobalizationChooserStorybook: React.FC<PropTypes.InferProps<typeof globalizationChooserStorybookPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace globalizationChooserStorybookPropTypes {
    const className: PropTypes.Requireable<string>;
    const containerStyle: PropTypes.Requireable<string>;
    const innerStyle: PropTypes.Requireable<string>;
    const localeId: PropTypes.Requireable<string>;
    const languageId: PropTypes.Requireable<string>;
    const resolvedLocale: PropTypes.Requireable<string>;
    const resolvedLanguage: PropTypes.Requireable<string>;
    const languageLabel: PropTypes.Requireable<string>;
    const localeLabel: PropTypes.Requireable<string>;
    const availableLanguageOptions: PropTypes.Requireable<any[]>;
    const availableLocaleOptions: PropTypes.Requireable<any[]>;
    const onLocaleValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    const onLanguageValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    const showLocaleLabel: PropTypes.Requireable<boolean>;
    const showLanguageLabel: PropTypes.Requireable<boolean>;
    const showLocaleSelect: PropTypes.Requireable<boolean>;
    const showLanguageSelect: PropTypes.Requireable<boolean>;
    const style: PropTypes.Requireable<object>;
}
export {};
