// @ts-check
import React from 'react';
import { Card, InputField, DateField } from '@jutro/components';
import { Grid } from '@jutro/layout';

export const ClaimSummary = ({ id, title, data }) => {
    const fields = (
        <React.Fragment>
            <InputField
                autoComplete
                autoTrim={false}
                dataPath=""
                dataType="string"
                disabled={false}
                hideLabel={false}
                id="Flagged"
                label="Jurisdiction"
                labelPosition="top"
                maxLength={10}
                readOnly
                value={data.jurisdiction?.name}
            />
            <InputField
                autoComplete
                autoTrim={false}
                dataPath=""
                dataType="string"
                disabled={false}
                hideLabel={false}
                id="Flagged"
                label="Lob Code"
                labelPosition="top"
                maxLength={10}
                readOnly
                value={data.lobCode?.name}
            />
            <DateField
                autoComplete
                autoTrim={false}
                dataPath=""
                dataType="date-time"
                disabled={false}
                hideLabel={false}
                id="lossDate"
                label="Loss Date"
                labelPosition="top"
                maxLength={10}
                readOnly
                value={data.lossDate}
            />
            <InputField
                autoComplete
                autoTrim={false}
                dataPath=""
                dataType="string"
                disabled={false}
                hideLabel={false}
                id="lossType"
                label="Loss Type"
                labelPosition="top"
                maxLength={10}
                readOnly
                value={data.lossType?.name}
            />
            <InputField
                id="mainContact"
                label="Claimant"
                labelPosition="top"
                maxLength={10}
                readOnly
                value={data.mainContact?.displayName}
            />
            <DateField
                autoComplete
                autoTrim={false}
                dataPath=""
                dataType="string"
                disabled={false}
                hideLabel={false}
                id="Flagged"
                label="Report Date"
                labelPosition="top"
                maxLength={10}
                readOnly
                value={data.reportedDate}
            />
            <InputField
                autoComplete
                autoTrim={false}
                dataPath=""
                dataType="string"
                disabled={false}
                hideLabel={false}
                id="Flagged"
                label="Reporter Name"
                labelPosition="top"
                maxLength={10}
                readOnly
                value={data.reporter?.displayName}
            />
            <InputField
                autoComplete
                autoTrim={false}
                dataPath=""
                dataType="string"
                disabled={false}
                hideLabel={false}
                id="Flagged"
                label="State"
                labelPosition="top"
                maxLength={10}
                readOnly
                value={data.state?.name}
            />
        </React.Fragment>
    );

    return (
        <Card id={id} title={title}>
            <Grid columns={[1, 1, 1]} gap="large">
                {fields}
            </Grid>
        </Card>
    );
};
