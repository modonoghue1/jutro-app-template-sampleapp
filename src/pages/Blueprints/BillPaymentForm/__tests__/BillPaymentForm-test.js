import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { GlobalizationProvider } from '@jutro/locale';
import { validateMetadata } from '@jutro/uiconfig';
import { BillPaymentForm } from '../BillPaymentForm';
import metadata from '../BillPaymentForm.metadata.json5';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <GlobalizationProvider defaultLocale="en" onLanguageChange={jest.fn()}>
            <MemoryRouter>
                <BillPaymentForm />
            </MemoryRouter>
        </GlobalizationProvider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('metadata is valid', () => {
    const onError = jest.fn();
    validateMetadata(metadata, onError);

    expect(onError).not.toHaveBeenCalled();
});
