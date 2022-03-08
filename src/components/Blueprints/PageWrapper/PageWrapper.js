import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { intlMessageShape } from '@jutro/prop-types';
import { TranslatorContext } from '@jutro/locale';
import styles from './PageWrapper.module.scss';

export const PageWrapper = ({ children, title }) => {
    const translator = useContext(TranslatorContext);
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <h1>{translator(title)}</h1>
            </div>
            <div className={styles.main}>{children}</div>
        </div>
    );
};

PageWrapper.propTypes = {
    children: PropTypes.node,
    title: intlMessageShape,
};

PageWrapper.defaultProps = {
    children: null,
};
