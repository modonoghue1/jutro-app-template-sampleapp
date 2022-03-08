import React from 'react';
import { EditCancelSaveTitleBar } from '../EditCancelSaveTitleBar';

describe('EditCancelSaveTitleBar', () => {
    const stringLabels = {
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel',
    };

    const stringTitle = 'Title';

    const translatableLabels = {
        edit: {
            id: 'edit-id',
            defaultMessage: 'Edit',
        },
        save: {
            id: 'save-id',
            defaultMessage: 'Save',
        },
        cancel: {
            id: 'cancel-id',
            defaultMessage: 'Cancel',
        },
    };

    const translatableTitle = {
        id: 'title-id',
        defaultMessage: 'Title',
    };

    const onEditClick = jest.fn();
    const onSaveClick = jest.fn();
    const onCancelClick = jest.fn();

    [
        { labels: stringLabels, title: stringTitle },
        { labels: translatableLabels, title: translatableTitle },
    ].forEach(({ labels, title }) => {
        it('[JUT-7130] should render EditCancelSaveTitleBar with passed button labels and title', () => {
            const viewModeWrapper = mount(
                <EditCancelSaveTitleBar
                    labels={labels}
                    onEditClick={onEditClick}
                    onSaveClick={onSaveClick}
                    onCancelClick={onCancelClick}
                    title={title}
                />
            );

            const editModeWrapper = mount(
                <EditCancelSaveTitleBar
                    labels={labels}
                    onEditClick={onEditClick}
                    onSaveClick={onSaveClick}
                    onCancelClick={onCancelClick}
                    isEditMode
                    title={title}
                />
            );

            expect(viewModeWrapper.find('button').first().text()).toBe('Edit');
            expect(viewModeWrapper.find('h4').first().text()).toBe('Title');

            expect(editModeWrapper.find('button').first().text()).toBe(
                'Cancel'
            );
            expect(editModeWrapper.find('button').at(1).text()).toBe('Save');
            expect(editModeWrapper.find('h4').first().text()).toBe('Title');
        });
    });

    it('[JUT-7134] should trigger onEditClick', () => {
        const wrapper = mount(
            <EditCancelSaveTitleBar
                labels={stringLabels}
                onEditClick={onEditClick}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
                title={stringTitle}
            />
        );

        wrapper.find('button').first().simulate('click');
        expect(onEditClick).toHaveBeenCalled();
    });

    it('[JUT-7131] should disable save button by default', () => {
        const wrapper = mount(
            <EditCancelSaveTitleBar
                labels={stringLabels}
                onEditClick={onEditClick}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
                title={stringTitle}
                isEditMode
            />
        );

        expect(wrapper.find('button').at(1)).toHaveProp('disabled', true);
    });

    it('[JUT-7133] should trigger onSaveClick and onCancelClick', () => {
        const wrapper = mount(
            <EditCancelSaveTitleBar
                labels={stringLabels}
                onEditClick={onEditClick}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
                title={stringTitle}
                isEditMode
                isSaveEnabled
            />
        );

        wrapper.find('button').first().simulate('click');
        wrapper.find('button').at(1).simulate('click');

        expect(onCancelClick).toHaveBeenCalled();
        expect(onSaveClick).toHaveBeenCalled();
    });

    it('[JUT-7137] should pass button class name', () => {
        const buttonClassName = 'button-class-name';

        const viewModeWrapper = mount(
            <EditCancelSaveTitleBar
                labels={stringLabels}
                onEditClick={onEditClick}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
                title={stringTitle}
                internalClassNames={{
                    button: buttonClassName,
                }}
            />
        );

        const editModeWrapper = mount(
            <EditCancelSaveTitleBar
                labels={stringLabels}
                onEditClick={onEditClick}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
                title={stringTitle}
                internalClassNames={{
                    button: buttonClassName,
                }}
                isEditMode
            />
        );

        expect(viewModeWrapper.find('button').first()).toHaveClassName(
            buttonClassName
        );

        expect(editModeWrapper.find('button').first()).toHaveClassName(
            buttonClassName
        );
        expect(editModeWrapper.find('button').at(1)).toHaveClassName(
            buttonClassName
        );
    });

    it('should not render buttons if readOnly', () => {
        const wrapper = mount(
            <EditCancelSaveTitleBar
                labels={stringLabels}
                onEditClick={onEditClick}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
                title={stringTitle}
                readOnly
            />
        );

        expect(wrapper.find('button')).toHaveLength(0);
    });
});
