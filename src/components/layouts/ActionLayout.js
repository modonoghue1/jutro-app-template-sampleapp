import React from 'react';
import { Flex } from '@jutro/layout';

export const ActionLayout = props => {
    const { children, ...gridProps } = props;
    return <Flex {...gridProps}>{children}</Flex>;
};

ActionLayout.propTypes = Flex.propTypes;

ActionLayout.defaultProps = {
    alignItems: 'middle',
    justifyContent: 'right',
    gap: 'medium',
    phone: {
        direction: 'column',
        alignItems: 'stretch',
        reverse: true,
    },
};
