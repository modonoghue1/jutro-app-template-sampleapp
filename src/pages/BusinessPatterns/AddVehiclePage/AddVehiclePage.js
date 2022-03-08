import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TranslatorContext } from '@jutro/locale';

import styles from './AddVehiclePage.module.scss';
import messages from './AddVehiclePage.messages';

import { AddVehicle } from './AddVehicle';
import uiMetadata from './AddVehicle.metadata.json';

const initialVehicleList = [
    {
        id: '0',
        model: 'RAV4',
        make: 'Toyota',
        year: 2020,
    },
    {
        id: '1',
        model: 'Focus',
        make: 'Ford',
        year: 2019,
    },
    {
        id: '2',
        model: 'Golf',
        make: 'Volkswagen',
        year: 2018,
    },
];

export const AddVehiclePage = ({ title }) => {
    const translator = useContext(TranslatorContext);
    const [vehicleList, setVehicleList] = useState(initialVehicleList);

    const updateVehicleList = result => {
        if (result) {
            setVehicleList(currentList => [...currentList, result]);
        }
    };

    return (
        <div className={styles.addVehiclePage} title={title}>
            <div className={styles.addVehiclePageTitle}>
                <h2>{translator(messages.label)}</h2>
            </div>
            <AddVehicle
                uiProps={uiMetadata['add.vehicle.form']}
                vehicleList={vehicleList}
                onAddVehicleResolve={updateVehicleList}
            />
        </div>
    );
};

AddVehiclePage.propTypes = {
    title: PropTypes.string,
};

AddVehiclePage.defaultProps = {
    title: 'sample',
};
