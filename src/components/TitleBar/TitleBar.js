import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from '@jutro/components';
import { Flex, FlexItem } from '@jutro/layout';
import { ActionLayout } from '../layouts/ActionLayout';
import styles from './TitleBar.module.scss';

const titleBarPropTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    count: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};

// eslint-disable-next-line valid-jsdoc
/**
 * TitleBar
 *
 * @type {React.FC<PropTypes.InferProps<typeof editableDetailsPropTypes>>}
 */
export const TitleBar = ({
    id,
    title,
    subTitle,
    count,
    icon,
    iconColor,
    children,
    className,
}) => {
    const classes = cx(styles.titleBar, className);

    const fullTitle = count ? `${title} (${count})` : title;

    return (
        <Flex id={id} className={classes} alignItems="center">
            {icon && (
                <Icon
                    icon={icon}
                    isFixedWidth
                    className={styles.icon}
                    style={{ color: iconColor }}
                />
            )}
            <div>
                {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
                <div className={styles.title}>{fullTitle}</div>
            </div>
            {children && (
                <FlexItem grow="1">
                    <ActionLayout>{children}</ActionLayout>
                </FlexItem>
            )}
        </Flex>
    );
};

TitleBar.propTypes = titleBarPropTypes;
