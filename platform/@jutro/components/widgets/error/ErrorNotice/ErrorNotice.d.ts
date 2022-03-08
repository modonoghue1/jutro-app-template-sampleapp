import React from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
export declare type RecoveryAction = {
    label: IntlMessageShape;
    callback: () => unknown;
};
export declare type ErrorNoticePropTypes = {
    icon?: string;
    mainMessage?: IntlMessageShape;
    detailedMessage?: IntlMessageShape;
    error?: Error;
    showErrorMessage?: boolean;
    actions?: RecoveryAction[];
    noticeStyle?: string;
};
export declare const errorNoticePropTypes: React.WeakValidationMap<ErrorNoticePropTypes>;
/**
 * A customizable presentational component capable of rendering acceptable error
 * UIs in production
 *
 * @metadataType element
 */
export declare const ErrorNotice: React.FC<ErrorNoticePropTypes>;
