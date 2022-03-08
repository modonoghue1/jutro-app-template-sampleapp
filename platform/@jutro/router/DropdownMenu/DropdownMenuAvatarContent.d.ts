export function DropdownMenuAvatarContent({ children, title, subtitle, useAuthInfo, username, icon, className, imageSource, messageProps, showImageBorder, headerClassName, authLinksClassName, separatorClassName, onBeforeLogout, }: {
    children: any;
    title: any;
    subtitle: any;
    useAuthInfo: any;
    username: any;
    icon: any;
    className: any;
    imageSource: any;
    messageProps: any;
    showImageBorder: any;
    headerClassName: any;
    authLinksClassName: any;
    separatorClassName: any;
    onBeforeLogout: any;
}): JSX.Element;
export namespace DropdownMenuAvatarContent {
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
            userAvatar: any;
        }>>;
        export const useAuthInfo: PropTypes.Requireable<boolean>;
        export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export const showImageBorder: PropTypes.Requireable<boolean>;
        export const headerClassName: PropTypes.Requireable<string>;
        export const authLinksClassName: PropTypes.Requireable<string>;
        export const separatorClassName: PropTypes.Requireable<string>;
        export const onBeforeLogout: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultAvatarProps {
        const useAuthInfo_1: boolean;
        export { useAuthInfo_1 as useAuthInfo };
    }
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import PropTypes from "prop-types";
