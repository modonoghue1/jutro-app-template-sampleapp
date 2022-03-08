import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { intlMessageShape } from '@jutro/prop-types';
import { TranslatorContext } from '@jutro/locale';
import { Button } from '@jutro/components';
import { Flex, FlexItem, useBreakpoint } from '@jutro/layout';

import { ActionTitleBar } from './ActionTitleBar';
import { TitleElement } from './TitleElement';
import styles from './ActionTitleBar.module.scss';

const ViewModeAction = ({
    onEditClick,
    label,
    buttonClassName,
}) => {
    const translator = useContext(TranslatorContext);

    return (
        <Button className={buttonClassName} onClick={onEditClick}>
            {translator(label)}
        </Button>
    );
};

const EditModeAction = ({
    isSaveEnabled,
    labels,
    onSaveClick,
    onCancelClick,
    buttonClassName,
}) => {
    const translator = useContext(TranslatorContext);

    return (
        <Flex gap="small">
            <FlexItem grow="1">
                <Button
                    className={buttonClassName}
                    type="outlined"
                    onClick={onCancelClick}
                >
                    {translator(labels.cancel)}
                </Button>
            </FlexItem>
            <FlexItem grow="1">
                <Button
                    className={buttonClassName}
                    onClick={onSaveClick}
                    disabled={!isSaveEnabled}
                >
                    {translator(labels.save)}
                </Button>
            </FlexItem>
        </Flex>
    );
};

const EditCancelSaveActions: React.FC<EditCancelSaveActionsProps> = ({
    onEditClick,
    onSaveClick,
    onCancelClick,
    isEditMode,
    labels,
    isSaveEnabled,
    internalClassNames,
}) => {
    if (isEditMode) {
        return (
            <EditModeAction
                isSaveEnabled={isSaveEnabled}
                labels={labels}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
                buttonClassName={internalClassNames?.button}
            />
        );
    }

    return (
        <ViewModeAction
            onEditClick={onEditClick}
            label={labels.edit}
            buttonClassName={internalClassNames?.button}
        />
    );
};

/**
 * @metadataType container
 */
export const EditCancelSaveTitleBar: React.FC<EditCancelSaveTitleBarProps> = props => {
    const { breakpointProps } = useBreakpoint(props);
    const {
        title,
        readOnly = false,
        onEditClick,
        onSaveClick,
        onCancelClick,
        isEditMode,
        isSaveEnabled,
        labels,
        internalClassNames,
        ...rest
    } = breakpointProps;
    const translator = useContext(TranslatorContext);

    const actions = () => {
        if (readOnly) {
            return null;
        }

        return (
            <EditCancelSaveActions
                onEditClick={onEditClick}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
                isEditMode={isEditMode}
                labels={labels}
                isSaveEnabled={isSaveEnabled}
                internalClassNames={internalClassNames}
            />
        );
    };

    return (
        <ActionTitleBar {...rest}>
            <TitleElement>
                <h4 className={cx(styles.title, internalClassNames?.title)}>
                    {translator(title)}
                </h4>
            </TitleElement>
            {actions()}
        </ActionTitleBar>
    );
};

const editCancelSaveTitleBarBasePropTypes: WeakValidationMap<EditCancelSaveTitleBarBaseProps> = {
    /**
     * CSS class name for this component
     */
    className: PropTypes.string,
    /**
     * Title to render inside title bar
     */
    title: intlMessageShape,
    /**
     * If true action buttons are not rendered
     */
    readOnly: PropTypes.bool,
    /**
     * Callback invoked on edit button click, () => void
     */
    onEditClick: PropTypes.func.isRequired,
    /**
     * Callback invoked on save button click, () => void
     */
    onSaveClick: PropTypes.func.isRequired,
    /**
     * Callback invoked on cancel button click, () => void
     */
    onCancelClick: PropTypes.func.isRequired,
    /**
     * Labels for rendered buttons
     */
    labels: PropTypes.shape({
        edit: intlMessageShape.isRequired,
        save: intlMessageShape.isRequired,
        cancel: intlMessageShape.isRequired,
    }).isRequired,
    /**
     * If true save and cancel buttons will be rendered
     */
    isEditMode: PropTypes.bool,
    /**
     * Enables the save button
     */
    isSaveEnabled: PropTypes.bool,
    /**
     * ClassNames for internal components
     */
    internalClassNames: PropTypes.shape({
        button: PropTypes.string,
    }),
};

EditCancelSaveTitleBar.propTypes = {
    ...editCancelSaveTitleBarBasePropTypes,
    phone: PropTypes.shape(editCancelSaveTitleBarBasePropTypes),
    phoneWide: PropTypes.shape(editCancelSaveTitleBarBasePropTypes),
    tablet: PropTypes.shape(editCancelSaveTitleBarBasePropTypes),
};

EditCancelSaveTitleBar.displayName = 'EditCancelSaveTitleBar';
