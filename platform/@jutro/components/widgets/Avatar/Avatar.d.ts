/**
 * Displays a "user avatar" element with an image, icon, or initials.
 *
 * @type {React.ForwardRefExoticComponent<PropTypes.InferProps<typeof avatarPropTypes>>}
 *
 * @metadataType action
 */
export const Avatar: React.ForwardRefExoticComponent<PropTypes.InferProps<typeof avatarPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace avatarPropTypes {
    const username: PropTypes.Requireable<string>;
    const icon: PropTypes.Requireable<string>;
    const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    const className: PropTypes.Requireable<string>;
    const imageSource: PropTypes.Requireable<string>;
    const messageProps: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * userAvatar message
         */
        userAvatar: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
    }>>;
    const useAuthInfo: PropTypes.Requireable<boolean>;
    const showImageBorder: PropTypes.Requireable<boolean>;
}
export {};
