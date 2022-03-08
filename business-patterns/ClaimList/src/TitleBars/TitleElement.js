import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Flex } from '@jutro/layout';
import styles from './ActionTitleBar.module.scss';

export const TitleElement = ({
    children,
    className,
}) => (
    <Flex className={cx(styles.titleElement, className)} alignItems="stretch">
        {children}
    </Flex>
);

TitleElement.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
};

TitleElement.displayName = 'TitleElement';
