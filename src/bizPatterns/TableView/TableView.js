// @ts-check
import React, { useMemo } from 'react';
import { DataTable } from '@jutro/datatable';
import { renderContentFromMetadata } from '@jutro/uiconfig';
import { TitleBar } from '../../components/TitleBar/TitleBar';
import { ActionLayout } from '../../components/layouts/ActionLayout';
import { MultiFilter } from '../../components/MultiFilter/MultiFilter';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

import styles from './TableView.module.scss';

export const TableView = ({
    id,
    loading,
    error,
    // titlebar props
    icon,
    iconColor,
    title,
    subtitle,
    actions,
    // datatable props
    columns: columnsProp,
    columnDefs: columnDefsProp,
    baseColumnDefs: baseColumnDefsProp,
    data,
    onRowClick,
    // filter props
    filters: filtersProp,
    onFilterChange,
    filtersClassName,
    titleBarClassName,
}) => {
    const uiColumns = useMemo(() => {
        if (!columnsProp) {
            return baseColumnDefsProp;
        }

        return columnsProp
            .map(column => {
                // find column def from base column metadata
                const columnDef = baseColumnDefsProp.find(
                    item => item.id === column
                );
                if (columnDef) {
                    const customColumnDef = columnDefsProp?.find(
                        item => item.id === column
                    );
                    if (customColumnDef) {
                        const {
                            datatype: columnDatatype,
                            label: columnLabel,
                            path: columnPath,
                        } = customColumnDef;

                        const customComponentProps = {
                            header: columnLabel,
                            fieldDatatype: columnDatatype || 'string',
                            path: columnPath || column,
                        };

                        return {
                            ...columnDef,
                            componentProps: {
                                ...columnDef.componentProps,
                                ...customComponentProps,
                            },
                        };
                    }

                    return columnDef;
                }

                // find column def from column def metadata
                const customColumnDef = columnDefsProp?.find(
                    item => item.id === column
                );
                if (customColumnDef) {
                    const {
                        id: columnId,
                        datatype: columnDatatype,
                        label: columnLabel,
                        path: columnPath,
                        component: columnComponent,
                        componentProps,
                        columnClassName,
                    } = customColumnDef;
                    return {
                        id: columnId || column,
                        type: 'element',
                        component: columnComponent || 'DisplayColumn',
                        componentProps: {
                            header: columnLabel,
                            fieldDatatype: columnDatatype || 'string',
                            path: columnPath || column,
                            columnClassName: columnClassName,
                            ...componentProps,
                        },
                    };
                }

                return null;
            })
            .filter(item => !!item);
    }, [columnsProp, columnDefsProp, baseColumnDefsProp]);

    const columns = renderContentFromMetadata(uiColumns);

    const filters = filtersProp && (
        <MultiFilter
            id="filters"
            filters={filtersProp}
            className={filtersClassName}
            onFilterChange={onFilterChange}
        />
    );

    const messageText =
        (loading && 'Loading...') ||
        (error && <ErrorMessage title="Warning" error={error} />);

    return (
        <div className={styles.claimsList}>
            <TitleBar
                title={title}
                subtitle={subtitle}
                icon={icon}
                iconColor={iconColor}
                className={titleBarClassName}
            >
                {filters}
            </TitleBar>
            <DataTable
                id={id}
                data={data}
                // ** table props **
                showSearch={false}
                onRowClick={onRowClick}
                noDataText={messageText}
                showPagination={false}
            >
                {columns}
            </DataTable>
            <ActionLayout className={styles.actionBar}>{actions}</ActionLayout>
        </div>
    );
};
