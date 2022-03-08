// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { lowerCase, get } from 'lodash';
import { Grid } from '@jutro/layout';
import { Card, Icon, IconButton, InfoLabel } from '@jutro/components';
import { ActionLayout } from '../../components/layouts/ActionLayout';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import styles from './ListView.module.scss';

export const ListView = ({
    id,
    loading,
    error,
    title,
    count,
    total,
    columnSizes: columnsSizeProp,
    colHeaders,
    columns,
    columnDefs: columnDefsProp,
    data,
    actions,
}) => {
    const headerView = colHeaders?.map(colheader => {
        return (
            <div key={colheader} className={styles.listHeader}>
                {colheader}
            </div>
        );
    });
    const renderCustomColumn = (
        item,
        itemValue,
        columnType,
        columnSecondaryPath,
        columnMap,
        columnCallback
    ) => {
        switch (columnType) {
            case 'date':
                return <span>{new Date(itemValue).toDateString()}</span>;
            case 'status':
                if (itemValue.includes('-')) {
                    itemValue = itemValue.replace('-', '');
                }
                const dataVal =
                    columnSecondaryPath === undefined
                        ? itemValue
                        : get(item, columnSecondaryPath, '-');
                return (
                    <InfoLabel
                        iconPosition="left"
                        id="infoLabel"
                        type={
                            columnMap[itemValue] ??
                            columnMap[itemValue] ??
                            'neutral'
                        }
                    >
                        {dataVal}
                    </InfoLabel>
                );
            case 'icon':
                return <Icon icon={columnMap?.[itemValue] ?? 'mi-help'} />;
            case 'action':
                if (!itemValue) {
                    return null;
                }
                return (
                    <IconButton
                        icon={columnMap?.[itemValue] ?? 'mi-edit'}
                        onClick={() => columnCallback(item.id)}
                    />
                );
            default:
                return <span>{itemValue}</span>;
        }
    };

    const getColumnDefValues = colVal => {
        return columnDefsProp.find(colDef => colDef.id === colVal);
    };
    const getColumnSizes = () => {
        if (columnsSizeProp) return columnsSizeProp;
        return columns.map(() => 'auto');
    };
    const listViewContent = data?.length ? (
        <Grid columns={getColumnSizes()}>
            <React.Fragment>{headerView}</React.Fragment>
            {data?.map(item => {
                const mergedColumnsView = columns.map(col => {
                    if (Array.isArray(col)) {
                        return (
                            <React.Fragment key={col[0]}>
                                <div>
                                    {col.map(colItem => {
                                        const columnDef = getColumnDefValues(
                                            colItem
                                        );
                                        return (
                                            <p key={colItem}>
                                                {renderCustomColumn(
                                                    item,
                                                    get(
                                                        item,
                                                        columnDef.path,
                                                        '-'
                                                    ),
                                                    columnDef.type,
                                                    columnDef.secondaryPath,
                                                    columnDef.columnMap,
                                                    columnDef.columnCallback
                                                )}
                                            </p>
                                        );
                                    })}
                                </div>
                            </React.Fragment>
                        );
                    }
                    const columnDef = getColumnDefValues(col);
                    return (
                        <div key={col}>
                            {renderCustomColumn(
                                item,
                                get(item, columnDef.path, '-'),
                                columnDef.type,
                                columnDef.secondaryPath,
                                columnDef.columnMap,
                                columnDef.columnCallback
                            )}
                        </div>
                    );
                });
                return (
                    <React.Fragment key={item.id}>
                        {mergedColumnsView}
                    </React.Fragment>
                );
            })}
        </Grid>
    ) : (
        <div>No {lowerCase(title)} found</div>
    );

    let listTitle = title;
    if (count !== undefined && total !== undefined) {
        listTitle =
            count < total
                ? `${title} (${count} of ${total})`
                : `${title} (${total})`;
    }

    return (
        <Card id={id} title={listTitle} className={styles.claimActivitiesCard}>
            {loading && <div>Loading...</div>}
            {error && <ErrorMessage title="Warning" error={error} />}
            {!loading && !error && listViewContent}
            <ActionLayout className={styles.actionBar}>{actions}</ActionLayout>
        </Card>
    );
};

ListView.propTypes = {
    id: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
    count: PropTypes.number,
    total: PropTypes.number,
    columnSizes: PropTypes.array,
    colHeaders: PropTypes.array,
    columns: PropTypes.array,
    columnDefs: PropTypes.array,
    data: PropTypes.array,
};
