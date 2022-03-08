export function DropdownMenuAvatarHeader({ title, subtitle, username, icon, useAuthInfo, className, imageSource, messageProps, showImageBorder, }: {
    title: any;
    subtitle: any;
    username: any;
    icon: any;
    useAuthInfo: any;
    className: any;
    imageSource: any;
    messageProps: any;
    showImageBorder: any;
}): JSX.Element;
export namespace DropdownMenuAvatarHeader {
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
        export const showImageBorder: PropTypes.Requireable<boolean>;
        export const headerClassName: PropTypes.Requireable<string>;
    }
    namespace defaultAvatarProps {
        const useAuthInfo_1: boolean;
        export { useAuthInfo_1 as useAuthInfo };
    }
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import PropTypes from "prop-types";
