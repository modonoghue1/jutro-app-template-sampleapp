import React from 'react';
import { get } from 'lodash';
import { Icon } from '@jutro/components';
import { Flex, FlexItem } from '@jutro/layout';
import { DisplayColumn } from '@jutro/datatable';

export const WarningColumn = () => {
    return <React.Fragment />;
};

WarningColumn.defaultCell = (
    row,
    rowId,
    { id, path, warningPath, visible }
) => {
    if (visible === false) {
        return null;
    }

    const value = get(row, path);

    if (!value) {
        return DisplayColumn.defaultCell(row, rowId, { id, path });
    }

    const warning = get(row, warningPath);

    return (
        <Flex alignItems="center" gap="small">
            <FlexItem>{value}</FlexItem>
            {warning && <Icon id={`${id}_${rowId}_icon`} icon="mi-warning" />}
        </Flex>
    );
};

WarningColumn.displayName = 'WarningColumn';

WarningColumn.defaultProps = {
    ...DisplayColumn.defaultProps,
    renderCell: WarningColumn.defaultCell,
};
