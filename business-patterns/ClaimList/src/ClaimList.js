import React from 'react';
import { MetadataForm } from '@jutro/uiconfig';
import { Card } from '@business-patterns/components';
import { IconColumn, StatusColumn, WarningColumn } from './columns';
import uiMetadata from './ClaimList.metadata.json5';

const componentMap = {
    IconColumn: IconColumn,
    StatusColumn: StatusColumn,
    WarningColumn: WarningColumn,
};

const onSeeDetailsClick = row => {
    window.alert(`See details of: ${JSON.stringify(row)}`);
};

const onNewClaimClick = () => window.alert('New claim started');

export const ClaimList = ({ formData }) => {

    const callbackMap = {
        onSeeDetailsClick,
        onNewClaimClick
    };

    return (
        <Card maxWidth={1200}>
            <MetadataForm
                uiProps={uiMetadata['claimList.view']}
                data={{ claimList: formData.claims}}
                callbackMap={callbackMap}
                componentMap={componentMap}
            />
        </Card>
    );
};
