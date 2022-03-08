// @ts-check
import React, { useCallback, useState } from 'react';
import { Button } from '@jutro/components';
import { useAPI } from '../../helpers/useAPI';
import { useAsync } from '../../helpers/useAsync';
import { ClaimNoteForm } from '../ClaimNoteForm/ClaimNoteForm';
import { ListView } from '../../bizPatterns/ListView/ListView';

export const ClaimNotes = ({ id, title, claimId }) => {
    const claimApi = useAPI();

    const {
        execute: loadNotesData,
        value: notesData,
        pending: notesPending,
        error: notesError,
    } = useAsync(
        () => claimApi.getClaimNotes(claimId),
        [claimApi, claimId],
        true
    );

    const [selectedNote, setSelectedNote] = useState();

    const handleNewNote = useCallback(() => {
        setSelectedNote('new');
    }, [setSelectedNote]);

    const handleEditNote = useCallback(
        async noteId => {
            const noteData = await claimApi.getNote(noteId);
            setSelectedNote(noteData);
        },
        [setSelectedNote, claimApi]
    );

    const handleClose = useCallback(
        note => {
            if (note) {
                loadNotesData();
            }
            setSelectedNote();
        },
        [loadNotesData, setSelectedNote]
    );

    if (selectedNote) {
        return (
            <ClaimNoteForm
                id={`${id}Form`}
                title="New Note"
                claimId={claimId}
                data={selectedNote === 'new' ? undefined : selectedNote}
                onClose={handleClose}
            />
        );
    }

    return (
        <ListView
            id={id}
            title={title}
            loading={notesPending}
            error={notesError}
            data={notesData}
            columnSizes={['auto', 'auto', 'auto', 'auto', 'auto']}
            columns={[
                'body',
                'subject',
                'topic',
                ['createdDate', 'updateTime'],
                'action',
            ]}
            columnDefs={[
                { id: 'body', path: 'bodySummary' },
                { id: 'subject', path: 'subject' },
                { id: 'topic', path: 'topic.name' },
                { id: 'createdDate', path: 'createdDate', type: 'date' },
                { id: 'updateTime', path: 'updateTime', type: 'date' },
                {
                    id: 'action',
                    path: '_actions.0',
                    type: 'action',
                    columnCallback: handleEditNote,
                },
            ]}
            actions={[
                <Button key="newNote" id="newNote" onClick={handleNewNote}>
                    New Note
                </Button>,
            ]}
        />
    );
};
