export function ApplicationHeader(props: any): JSX.Element;
export namespace ApplicationHeader {
    export const displayName: string;
    export { applicationHeaderPropTypes as propTypes };
    export namespace defaultProps {
        const showNotifications: boolean;
        const showAvatar: boolean;
        const showAppSwitcher: boolean;
        const searchFieldPlaceholder: {
            id: string;
            defaultMessage: string;
        };
        const useAuthInfo: boolean;
        const logoUrl: string;
        const callbackMap: {};
    }
}
import { applicationHeaderPropTypes } from "@jutro/prop-types";
