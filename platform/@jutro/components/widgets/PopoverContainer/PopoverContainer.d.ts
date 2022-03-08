/**
 * PopoverContainer
 * @type {React.FC<PropTypes.InferProps<typeof popoverContainerPropTypes>>}
 */
export const PopoverContainer: React.FC<PropTypes.InferProps<typeof popoverContainerPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace popoverContainerPropTypes {
    export { intlMessageShape as title };
    export { linkShape as headerLink };
    export { linkShape as footerLink };
    export const className: PropTypes.Requireable<string>;
    export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    export const internalClassNames: PropTypes.Requireable<PropTypes.InferProps<{
        /**
         * CSS class name for popover header
         */
        header: PropTypes.Requireable<string>;
        /**
         * CSS class name for popover title
         */
        title: PropTypes.Requireable<string>;
        /**
         * CSS class name for popover header link
         */
        headerLink: PropTypes.Requireable<string>;
        /**
         * CSS class name for popover body
         */
        body: PropTypes.Requireable<string>;
        /**
         * CSS class name for popover footer
         */
        footer: PropTypes.Requireable<string>;
        /**
         * CSS class name for popover footer link
         */
        footerLink: PropTypes.Requireable<string>;
    }>>;
    export const hideHeader: PropTypes.Requireable<boolean>;
    export const hideFooter: PropTypes.Requireable<boolean>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import { linkShape } from "@jutro/prop-types/src/linkShape";
export {};
