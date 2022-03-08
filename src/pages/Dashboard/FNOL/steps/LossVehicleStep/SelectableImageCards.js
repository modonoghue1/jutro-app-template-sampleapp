import React, { useState, useCallback } from 'react';
import { omit } from 'lodash';
import { MetadataForm } from '@jutro/uiconfig';
import uiMetadata from './SelectableImageCards.metadata.json5';
import styles from './SelectableImageCards.module.scss';

export const SelectableImageCards = ({
    uiProps,
    availableValues,
    selected = [],
    onUpdateSelected,
}) => {
    const [data, setData] = useState({
        cards: availableValues.map(card => ({
            ...card,
            selected: selected.includes(card.code) ? undefined : false,
        })),
    });

    const onCardClick = useCallback(
        ({ code }) => {
            const isSelected = selected.includes(code);
            onUpdateSelected(
                isSelected
                    ? selected.filter(value => value !== code)
                    : [...selected, code]
            );
            setData(prevData => ({
                cards: prevData.cards.map(card =>
                    card.code === code
                        ? {
                              ...omit(card, 'selected'),
                              selected: isSelected ? false : undefined,
                          }
                        : card
                ),
            }));
        },
        [onUpdateSelected, selected]
    );

    const callbackMap = {
        onCardClick,
    };

    return (
        <MetadataForm
            uiProps={uiProps}
            data={data}
            callbackMap={callbackMap}
            classNameMap={styles}
        />
    );
};

SelectableImageCards.defaultProps = {
    uiProps: uiMetadata['selectable.image.cards'],
};
