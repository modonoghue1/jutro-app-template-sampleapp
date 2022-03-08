import { Requireable, WeakValidationMap } from 'react';
import { IntlMessageShape } from './intlMessageShape';
export declare type AvatarPropTypes = {
    /**
     * username used to render initials in Avatar
     */
    username?: string;
    /**
     * The main title to be displayed inside the Avatar MenuDropdown
     */
    title?: IntlMessageShape;
    /**
     * The main subtitle to be displayed inside the Avatar MenuDropdown
     */
    subtitle?: IntlMessageShape;
    /**
     * Image source for the Avatar button
     */
    imageSource?: string;
};
export declare const avatarPropTypes: WeakValidationMap<AvatarPropTypes>;
export declare const avatarShape: Requireable<AvatarPropTypes>;
