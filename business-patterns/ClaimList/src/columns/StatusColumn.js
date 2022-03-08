import React from 'react';
import { get } from 'lodash';
import { InfoLabel } from '@jutro/components';
import { DisplayColumn } from '@jutro/datatable';

export const StatusColumn = () => {
    return <React.Fragment />;
};

StatusColumn.defaultCell = (row, rowId, { id, path, visible, statusMap }) => {
    if (visible === false) {
        return null;
    }

    const value = get(row, path);

    if (!value) {
        return DisplayColumn.defaultCell(row, rowId, { id, path });
    }

    const infoType = statusMap[value] ?? 'info';
    return (
        <div>
            <InfoLabel id={`${id}_${rowId}`} type={infoType}>
                {value}
            </InfoLabel>
        </div>
    );
};

StatusColumn.displayName = 'StatusColumn';

StatusColumn.defaultProps = {
    ...DisplayColumn.defaultProps,
    statusMap: {},
    renderCell: StatusColumn.defaultCell,
};
