/**
 * Component that allows the user to select the preferred application language and locale.
 *
 * @type {React.FC<PropTypes.InferProps<typeof globalizationChooserPropTypes>>}
 *
 * @metadataType element
 */
export const GlobalizationChooser: React.FC<PropTypes.InferProps<typeof globalizationChooserPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace globalizationChooserPropTypes {
    export const className: PropTypes.Requireable<string>;
    export const containerStyle: PropTypes.Requireable<string>;
    export const innerStyle: PropTypes.Requireable<string>;
    export const localeId: PropTypes.Requireable<string>;
    export const languageId: PropTypes.Requireable<string>;
    export const localeValue: PropTypes.Requireable<string>;
    export const languageValue: PropTypes.Requireable<string>;
    export { intlMessageShape as languageLabelText };
    export { intlMessageShape as localeLabelText };
    export const availableLanguageValues: PropTypes.Requireable<any[]>;
    export const availableLocaleValues: PropTypes.Requireable<any[]>;
    export const onLocaleValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    export const onLanguageValueChange: PropTypes.Requireable<(...args: any[]) => any>;
    export const renderLocaleLabel: PropTypes.Requireable<(...args: any[]) => any>;
    export const renderLanguageLabel: PropTypes.Requireable<(...args: any[]) => any>;
    export const showLocaleLabel: PropTypes.Requireable<boolean>;
    export const showLanguageLabel: PropTypes.Requireable<boolean>;
    export const showLocaleSelect: PropTypes.Requireable<boolean>;
    export const showLanguageSelect: PropTypes.Requireable<boolean>;
    export const style: PropTypes.Requireable<object>;
    export const storybookMode: PropTypes.Validator<any>;
    export const readOnly: PropTypes.Requireable<boolean>;
    export const skipPropagation: PropTypes.Requireable<boolean>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
export {};
