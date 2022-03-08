import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Flex, FlexItem, useBreakpoint } from '@jutro/layout';
import styles from './ActionTitleBar.module.scss';
import { TitleElement } from './TitleElement';

export const ActionTitleBar = props => {
    const { breakpointProps } = useBreakpoint(props);
    const { className } = breakpointProps;

    const childrenArray = React.Children.toArray(breakpointProps.children);

    const isTitleElement = (
        child
    ) => (child).type === TitleElement;

    const titleElements = childrenArray.filter(isTitleElement);
    const actions = childrenArray.filter(child => !isTitleElement(child));

    return (
        <Flex
            className={cx(
                styles.actionTitleBar,
                styles.actionTitleBarContainer,
                className
            )}
            alignItems="stretch"
        >
            <FlexItem grow="1">{titleElements}</FlexItem>
            <FlexItem textAlign="right">{actions}</FlexItem>
        </Flex>
    );
};

export const actionTitleBarBasePropTypes = {
    /**
     * CSS class name for this component
     */
    className: PropTypes.string,
    /**
     * Children to be rendered inside this component
     */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

ActionTitleBar.propTypes = {
    ...actionTitleBarBasePropTypes,
    phone: PropTypes.shape(actionTitleBarBasePropTypes),
    phoneWide: PropTypes.shape(actionTitleBarBasePropTypes),
    tablet: PropTypes.shape(actionTitleBarBasePropTypes),
};

ActionTitleBar.displayName = 'ActionTitleBar';
