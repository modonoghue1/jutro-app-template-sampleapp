// @ts - check
import React, { useCallback, useState } from 'react';
import { Button } from '@jutro/components';
import { Card } from '@business-patterns/components';
import { Table, TableColumn } from '@jutro/datatable';
import PropTypes from 'prop-types';
import { AddVehicleCard } from './AddVehicleCard';

const addVehiclePropTypes = {
    className: PropTypes.string,
    uiProps: PropTypes.object,
    vehicleList: PropTypes.arrayOf(PropTypes.object),
    onAddVehicleResolve: PropTypes.func,
};

export const AddVehicle = ({
    className,
    uiProps,
    vehicleList,
    onAddVehicleResolve,
}) => {
    const [formMode, setFormMode] = useState('list');

    const handleVehicle = useCallback(
        results => {
            setFormMode('list');
            onAddVehicleResolve(results);
        },
        [setFormMode, onAddVehicleResolve]
    );

    const addVehicle = useCallback(() => {
        setFormMode('vehicle');
    }, [setFormMode]);

    if (formMode === 'vehicle') {
        return (
            <div className={className}>
                <AddVehicleCard
                    id="inlineVehicle"
                    data={{ vin: '' }}
                    onResolve={handleVehicle}
                    uiProps={uiProps}
                />
            </div>
        );
    }
    return (
        <Card title="Vehicle List">
            <Table data={vehicleList}>
                <TableColumn
                    id="model"
                    textAlign="left"
                    header="Model"
                    cell={row => row.model}
                />
                <TableColumn
                    id="make"
                    textAlign="left"
                    header="Make"
                    cell={row => row.make}
                />
                <TableColumn
                    id="year"
                    textAlign="left"
                    header="Year"
                    cell={row => row.year}
                />
            </Table>
            <Button id="addvehicle" onClick={addVehicle}>
                Add Vehicle
            </Button>
        </Card>
    );
};

AddVehicle.propTypes = addVehiclePropTypes;
