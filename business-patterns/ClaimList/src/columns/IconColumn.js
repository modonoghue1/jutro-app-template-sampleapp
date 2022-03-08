import React from 'react';
import { get } from 'lodash';
import { Icon } from '@jutro/components';
import { DisplayColumn } from '@jutro/datatable';
import { Flex, FlexItem } from '@jutro/layout';

export const IconColumn = () => {
    return <React.Fragment />;
};

IconColumn.defaultCell = (
    row,
    rowId,
    { id, path, visible, iconOnly, iconMap }
) => {
    if (visible === false) {
        return null;
    }

    const value = get(row, path);

    if (!value) {
        return DisplayColumn.defaultCell(row, rowId, { id, path });
    }

    const icon = (
        <Icon id={`${id}_${rowId}`} icon={iconMap[value] ?? 'mi-help'} />
    );

    return iconOnly ? (
        icon
    ) : (
        <Flex alignItems="center">
            <FlexItem>{icon}</FlexItem>
            <FlexItem>{value}</FlexItem>
        </Flex>
    );
};

IconColumn.displayName = 'IconColumn';

IconColumn.defaultProps = {
    ...DisplayColumn.defaultProps,
    iconMap: {},
    renderCell: IconColumn.defaultCell,
};
