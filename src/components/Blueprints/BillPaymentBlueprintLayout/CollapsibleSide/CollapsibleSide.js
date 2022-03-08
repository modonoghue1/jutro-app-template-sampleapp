import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Button, Chevron } from '@jutro/components';

import styles from './CollapsibleSide.module.scss';

export const CollapsibleSide = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const classNames = cx(styles.sideColumn, {
        [styles.expandedSideColumn]: isExpanded,
    });
    return (
        <div className={classNames}>
            <Button
                type="text"
                className={styles.expanderButton}
                onClick={() => setIsExpanded(state => !state)}
            >
                <Chevron className={styles.expanderIcon} isOpen={isExpanded} />
            </Button>
            {isExpanded && children}
        </div>
    );
};

CollapsibleSide.propTypes = {
    children: PropTypes.node,
};
