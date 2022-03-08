import PropTypes from 'prop-types';
import { WeakValidationMap } from 'react';
export declare type ThemeConfigType = {
    name: string;
    prefix?: string;
    rootStyle?: {
        [key: string]: string;
    };
    dropTarget?: string;
};
export declare const themeConfigPropTypes: WeakValidationMap<ThemeConfigType>;
export declare const themeConfigShape: PropTypes.Requireable<PropTypes.InferProps<WeakValidationMap<ThemeConfigType>>>;
