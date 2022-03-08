import React from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
export declare type NotificationType = 'warning' | 'error' | 'info' | 'success';
declare type messagePropsType = {
    success?: IntlMessageShape;
    warning?: IntlMessageShape;
    info?: IntlMessageShape;
    error?: IntlMessageShape;
    dismissLabel?: IntlMessageShape;
};
declare type InlineNotificationContentProps = {
    type: NotificationType;
    messageProps?: messagePropsType;
    message: IntlMessageShape;
    isEmbeddedNotification?: boolean;
    isDismissable?: boolean;
    handleDismiss?: () => unknown;
};
export declare const InlineNotificationContent: ({ type, messageProps, message, isEmbeddedNotification, isDismissable, handleDismiss, }: InlineNotificationContentProps) => React.ReactElement;
export {};
