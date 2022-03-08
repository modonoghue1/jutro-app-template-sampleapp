import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TranslatorContext } from '@jutro/locale';
import styles from './CollapsibleSide.module.scss';

export const CollapsibleSideBlock = ({ title, children }) => {
    const translator = useContext(TranslatorContext);
    return (
        <div className={styles.sideBlock}>
            <div className={styles.sideBlockTitle}>{translator(title)}</div>
            {children}
        </div>
    );
};

CollapsibleSideBlock.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};
