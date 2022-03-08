import React from 'react';
import { get } from 'lodash';
import { IconButton } from '@jutro/components';
import { DisplayColumn } from '@jutro/datatable';
import { appendSimpleNamedComponentMap } from '@jutro/uiconfig';

const iconMap = {
    assignClaim: 'mi-account-circle',
    cancel: 'mi-cancel',
    closeClaim: 'mi-stars',
    patchClaim: 'mi-edit',
    submitClaim: 'mi-send',
    validate: 'mi-check-circle',
};

const excludeMap = {
    patchClaim: true,
    createAssign: true,
    assignClaim: true,
};

export const ClaimActionColumn = () => {
    return <React.Fragment />;
};

ClaimActionColumn.defaultCell = (
    row,
    index,
    { path, visible, actionCallback }
) => {
    if (visible === false) {
        return null;
    }
    const value = get(row, path);
    const values = value
        .map(item => {
            if (excludeMap[item]) {
                return null;
            }
            const icon = iconMap[item];
            return (
                <IconButton
                    id={item}
                    key={item}
                    icon={icon}
                    tooltip={{ text: item }}
                    onClick={
                        actionCallback && (() => actionCallback(row.id, item))
                    }
                />
            );
        })
        .filter(a => a);
    return <div>{values}</div>;
};

ClaimActionColumn.displayName = 'ClaimActionColumn';

ClaimActionColumn.defaultProps = {
    ...DisplayColumn.defaultProps,
    cell: ClaimActionColumn.defaultCell,
};

appendSimpleNamedComponentMap({
    ClaimActionColumn: { component: ClaimActionColumn },
});
