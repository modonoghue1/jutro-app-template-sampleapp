import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { intlMessageShape } from '@jutro/prop-types';
import { TranslatorContext } from '@jutro/locale';
import styles from './PanelsHeader.module.scss';

export const PanelsHeader = ({ id, title }) => {
    const translator = useContext(TranslatorContext);
    return (
        <div id={id} className={styles.panelHeader}>
            <span
                id={`${id}_title`}
                className={styles.panelTitle}
                role="heading"
                aria-level="1"
            >
                {translator(title)}
            </span>
        </div>
    );
};

PanelsHeader.propTypes = {
    id: PropTypes.string,
    title: intlMessageShape,
};
