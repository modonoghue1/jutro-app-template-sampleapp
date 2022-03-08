import React from 'react';
import { IntlMessageShape } from '@jutro/prop-types';
import type { BreakpointConsumerProps } from '@jutro/layout';
declare type ActionsLabels = 'edit' | 'save' | 'cancel';
declare type InternalComponents = 'button' | 'title';
declare type InternalClassNames = Partial<Record<InternalComponents, string | null>>;
declare type EditCancelSaveActionsProps = {
    onSaveClick: () => void;
    onCancelClick: () => void;
    onEditClick: () => void;
    labels: Record<ActionsLabels, IntlMessageShape>;
    isEditMode?: boolean;
    isSaveEnabled?: boolean;
    internalClassNames?: InternalClassNames;
};
declare type EditCancelSaveTitleBarBaseProps = EditCancelSaveActionsProps & {
    title?: IntlMessageShape;
    readOnly?: boolean;
    className?: string;
};
export declare type EditCancelSaveTitleBarProps = BreakpointConsumerProps<EditCancelSaveTitleBarBaseProps>;
/**
 * @metadataType container
 */
export declare const EditCancelSaveTitleBar: React.FC<EditCancelSaveTitleBarProps>;
export {};
