import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MetadataForm } from '@jutro/uiconfig';
import { set } from 'lodash';
import uiMetadata from './FloorPlanPage.metadata.json5';
import styles from './FloorPlanPage.module.scss';

export const FloorPlanPage = ({ title, onFloorplanPropsChange, floorPlan }) => {
    const [formData, setFormData] = useState({});
    const writeValue = (value, path) => {
        setFormData(prevState => {
            const newState = { ...prevState };
            set(newState, path, value);
            return newState;
        });
    };
    return (
        <div className={styles.floorPlanPage} title={title}>
            <MetadataForm
                classNameMap={styles}
                uiProps={uiMetadata['floorplan.props']}
                data={floorPlan}
                callbackMap={{
                    setFloorPlanProps: ({ prop }, value) => {
                        onFloorplanPropsChange(
                            `["floorplan.example"].${prop}`,
                            value
                        );
                    },
                }}
            />
            <MetadataForm
                uiProps={uiMetadata['floorplan.codelessForm']}
                data={formData}
                onDataChange={writeValue}
                showOptional
                classNameMap={styles}
            />
        </div>
    );
};

FloorPlanPage.propTypes = {
    title: PropTypes.string,
};

FloorPlanPage.defaultProps = {
    title: 'sample',
};
