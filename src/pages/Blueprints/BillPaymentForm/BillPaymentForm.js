import React, { useEffect } from 'react';
import { MetadataForm, validateMetadata } from '@jutro/uiconfig';
import uiMetadata from './BillPaymentForm.metadata.json5';
import messages from './BillPaymentForm.messages';
import { PageWrapper } from '../../../components/Blueprints/PageWrapper';
import { PanelsHeader } from '../../../components/Blueprints/PanelsHeader';
import { BillPaymentBlueprintLayout } from '../../../components/Blueprints/BillPaymentBlueprintLayout';

const sampleData = {
    billHistory: [
        {
            id: 'test',
            billNumber: 12345,
            dueDate: '24 November 2020',
            paymentDate: '24 November 2020',
            amount: 1234,
            paymentMethod: 'Card',
        },
    ],
    upcomingBills: [
        {
            id: 'test',
            billNumber: 12346,
            dueDate: '24 November 2021',
            paymentDate: '24 November 2021',
            amount: 200,
            paymentMethod: 'Card',
        },
    ],
};

export const BillPaymentForm = () => {
    useEffect(() => {
        validateMetadata(uiMetadata);
    }, []);
    return (
        <PageWrapper title={messages.title}>
            <MetadataForm
                uiProps={uiMetadata['page.bill.payment.form']}
                data={sampleData}
                callbackMap={{
                    renderPanelHeader: PanelsHeader,
                    downloadItem: row =>
                        // eslint-disable-next-line no-alert
                        alert(`Downloading bill ${row.billNumber}`),
                    // eslint-disable-next-line no-alert
                    payNow: () => alert(`Pay now`),
                }}
            />
        </PageWrapper>
    );
};

export const BillPaymentFormPanel = () => (
    <BillPaymentBlueprintLayout>
        <BillPaymentForm />
    </BillPaymentBlueprintLayout>
);
