export function DropdownMenuAvatar({ username, icon, className, imageSource, messageProps, showImageBorder, useAuthInfo, id, isOpen: isOpenProp, dropUp, alignRight, title, subtitle, children, onBeforeLogout, headerClassName, authLinksClassName, separatorClassName, dropdownClassName, }: {
    username: any;
    icon: any;
    className: any;
    imageSource: any;
    messageProps: any;
    showImageBorder: any;
    useAuthInfo: any;
    id: any;
    isOpen: any;
    dropUp: any;
    alignRight: any;
    title: any;
    subtitle: any;
    children: any;
    onBeforeLogout: any;
    headerClassName: any;
    authLinksClassName: any;
    separatorClassName: any;
    dropdownClassName: any;
}): JSX.Element;
export namespace DropdownMenuAvatar {
    namespace propTypes {
        export { intlMessageShape as title };
        export { intlMessageShape as subtitle };
        export const username: PropTypes.Requireable<string>;
        export const icon: PropTypes.Requireable<string>;
        export const className: PropTypes.Requireable<string>;
        export const imageSource: PropTypes.Requireable<string>;
        export const messageProps: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * userAvatar message
             */
            userAvatar: React.Requireable<import("@jutro/prop-types").IntlMessageShape>;
        }>>;
        export const id: PropTypes.Validator<string>;
        export const isOpen: PropTypes.Requireable<boolean>;
        export const dropUp: PropTypes.Requireable<boolean>;
        export const alignRight: PropTypes.Requireable<boolean>;
        export const useAuthInfo: PropTypes.Requireable<boolean>;
        export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export const showImageBorder: PropTypes.Requireable<boolean>;
        export const headerClassName: PropTypes.Requireable<string>;
        export const authLinksClassName: PropTypes.Requireable<string>;
        export const separatorClassName: PropTypes.Requireable<string>;
        export const onBeforeLogout: PropTypes.Requireable<(...args: any[]) => any>;
        export const dropdownClassName: PropTypes.Requireable<string>;
    }
    namespace defaultAvatarProps {
        const alignRight_1: boolean;
        export { alignRight_1 as alignRight };
        const useAuthInfo_1: boolean;
        export { useAuthInfo_1 as useAuthInfo };
    }
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import PropTypes from "prop-types";
import React from "react";
