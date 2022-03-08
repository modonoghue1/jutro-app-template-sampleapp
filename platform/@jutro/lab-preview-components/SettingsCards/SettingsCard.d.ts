import React from 'react';
import PropTypes from 'prop-types';
import { IntlMessageShape } from '@jutro/prop-types';
import { MetadataForm } from '@jutro/uiconfig';
export interface SettingsCardProps {
    id: string;
    className?: string;
    title: IntlMessageShape;
    isValid?: boolean;
    onSaveClick?: (formData: any) => void;
    onCancelClick?: (formData: any) => void;
    readOnly?: boolean;
    formProps: PropTypes.InferProps<typeof MetadataForm.propTypes>;
}
/**
 * @metadataType container
 */
export declare const SettingsCard: React.FC<SettingsCardProps>;
export declare const settingsCardPropTypes: React.WeakValidationMap<SettingsCardProps>;
