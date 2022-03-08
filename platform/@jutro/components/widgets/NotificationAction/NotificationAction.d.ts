/**
 * NotificationAction
 * @type {React.FC<PropTypes.InferProps<typeof notificationActionPropTypes>>}
 *
 * @metadataType action
 */
export const NotificationAction: React.FC<PropTypes.InferProps<typeof notificationActionPropTypes>>;
import React from "react";
import PropTypes from "prop-types";
declare namespace notificationActionPropTypes {
    export const id: PropTypes.Validator<string>;
    export { intlMessageShape as title };
    export { linkShape as headerLink };
    export { linkShape as footerLink };
    export const className: PropTypes.Requireable<string>;
    export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    export const renderTrigger: PropTypes.Validator<(...args: any[]) => any>;
    export const align: PropTypes.Requireable<string>;
    export const isFlipEnabled: PropTypes.Requireable<boolean>;
    export const onClosed: PropTypes.Requireable<(...args: any[]) => any>;
}
import { intlMessageShape } from "@jutro/prop-types/src/intlMessageShape";
import { linkShape } from "@jutro/prop-types/src/linkShape";
export {};
